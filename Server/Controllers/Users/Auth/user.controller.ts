import { Request, Response } from 'express';
import axios from 'axios';
import Blacklist from '../../../Models/utils/Blacklist.model'; // Import your Blacklist model
import User from '../../../Models/User/user.model';
import { generateOTP, generateRandomUsername } from '../../../Auth/User/token.auth';
import Wallet from '../../../Models/Payment/Finance/wallet.model';
import { sendMailToUser, sendMailToUserForSuccessfulregistration } from '../../../Services/Mail/mailing.services';
import { LoginValidate, ValidateUser } from './../../../Validators/User/user.validator';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken'
import { postCustomerData } from '../../../Services/Finance/utils/account.controller';
import { createBankAccount } from '../../../Services/Finance/utils/account.functions';


export async function GetAllUsers (req: any, res: any) {
  try {
      const user = await User.find({})
      return res.status(200).json({ message: 'Users fetched successfully', user })
  } catch (error) {
      return res.status(500).json({ message: "Cannot fetch users at the moment", error })
  }
}

export async function DeleteAllUsers (req: any, res: any) {
  try {
      const user = await User.deleteMany({})
      return res.status(200).json({ message: 'Users deleted successfully', user })
  } catch (error) {
      return res.status(500).json({ message: "Cannot delete users at the moment", error })
  }
}



export async function CreateNewUser (req: Request, res: Response) {
  try {
 // Handle validation error here
    const ValidatedUser = await ValidateUser.validate(req.body).value;
    if (ValidatedUser.error) {
      console.error(ValidatedUser.error.details[0].message);
      return res.status(400).json(ValidatedUser.error.details[0].message);
}
// Check if the user already exists

        const email = ValidatedUser.email;
        const password = ValidatedUser.password;
        const OTP = await generateOTP()
        const Username = await generateRandomUsername()
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
        }
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ 
      firstname: ValidatedUser.firstname,
      lastname: ValidatedUser.lastname,
      email: ValidatedUser.email,
      password: hashedPassword,
      otp: OTP,
      profile: new ObjectId(),
      username: Username,
      wallet: new ObjectId(),
    });
    const newWallet = await Wallet.create({
      user: newUser._id,
    })

    const response = await postCustomerData(newUser.email, newUser.firstname, newUser.lastname)

    console.log(newUser)

    newUser.customerId = response.data.id;
    newUser.otp = OTP;
    newUser.wallet = newWallet
    newUser.otpExpiration = new Date(Date.now() + 10 * 60 * 1000);
    await sendMailToUser( newUser.email, 'OTP For Verification', `
    <p>This is you OTP sent from FeedXPay to verify your account.</p>
    <p>Your OTP is: <strong>${OTP}</strong></p>
    <p>This OTP will expire in 5 minutes.</p>
  `);
    const savedUser = await newUser.save()
    const Id = savedUser._id

    // Check if the user was successfully saved
    if (savedUser) {
      return res.status(201).json({
        message: 'User created successfully',
        Id, response
      });
    } else {
      // Handle the case where the user wasn't saved
      return res.status(500).json({
        message: 'Error creating user: User not saved', response
      });
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error creating user:', error);

    // Return an error response with a status code
    return res.status(500).json({
      message: 'Internal server error', error
    });
  }
}



  
export async function LoginUser (req: Request, res: Response) {
  console.log(req.body)
  const ValidatedUser = LoginValidate.validate(req.body).value;

  if (!ValidatedUser) {
    return res.status(400).json(ValidatedUser.error.details[0].message);
  } else {
    User.findOne({ email: ValidatedUser.email }).then((user) => {
      if (!user) {
        res.json({ message: 'Email not found', success: false });
      } else {
        // Check if the user is temporarily blocked due to too many login attempts
        const blockedUntil = user.blockedUntil || new Date();

        if (blockedUntil > new Date()) {
          // User is temporarily blocked
          // Rename the variable to something else, e.g., currentDate
          var currentDate = new Date()
          const remainingBlockedTime = blockedUntil.getTime() - currentDate.getTime(); // Convert to milliseconds
          return res.status(429).json({
            message: 'Account temporarily blocked. Please try again later.',
            blockedUntil: remainingBlockedTime,
            success: false,
          });
        }

        bcrypt.compare(ValidatedUser.password, user.password).then((success) => {
          if (!success) {
            // Update login attempts and last login attempt timestamp
            user.loginAttempts = (user.loginAttempts || 0) + 1;
            user.lastLoginAttemptAt = new Date();

            // Check if the user has exceeded the maximum login attempts
            if (user.loginAttempts >= 6) {
              // Block the user for 5 minutes after 6 failed attempts
              user.blockedUntil = new Date(Date.now() + 300 * 1000); // 5 minutes from now
            } else if (user.loginAttempts >= 3) {
              // Block the user for 1 minute after 3 failed attempts
              user.blockedUntil = new Date(Date.now() + 60 * 1000); // 1 minute from now
            }

            user.save();

            res.json({ message: 'Invalid Password', success: false });
          } else {
            // Reset login attempts and last login attempt timestamp on successful login
            user.loginAttempts = 0;
            user.lastLoginAttemptAt = null;
            user.blockedUntil = null;

            const payload = {
              id: user._id,
              name: user.firstname,
            };

            JWT.sign(
              payload,
              process.env.APP_SECRET || 'AppSecret',
              { expiresIn: 2155926 },
              (err: any, token: any) => {
                user.accessToken = token;
                user.save();
                sendMailToUser(user.email, 'Login Notification', `You just logged into your account on FeedXPay. If you did not initiate this change, please contact us immediately.`)

                res.json({
                  user,
                  token: `Bearer Token: ` + token,
                  success: true,
                });
              }
            );
          }
        });
      }
    });
  }
}



export async function LogoutUser (req: Request, res: Response) {
  const token: string = req.header('Authorization') as string;

  if (!token) {
    return res.status(400).json({ message: 'Token is missing' });
  }
  try {
    // Add the token to the blacklist
    await Blacklist.findOneAndUpdate({}, { $addToSet: { tokens: token } }, { upsert: true });

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error while logging out', error });
  }
}


  
export async function setTagAndPin(req: Request, res: Response) {
    try {
      const { userId, tag, pin } = req.body;
  
      // Check if the tag already exists
      const isExisting = await User.findOne({ tag });
  
      if (isExisting) {
        return res.status(400).json({ message: 'Tag already exists' });
      }
  
      // Find the user by userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Set the tag and pin for the user
      user.tag = tag;
      user.pin = pin;
      await sendMailToUser(user.email, 'Account Creation Notification', `You just created an account on FeedXPay. If you did not initiate this change, please contact us immediately.`)
      await sendMailToUser(user.email, 'Tag and Pin Notification', `You just set your tag and pin on FeedXPay. If you did not initiate this change, please contact us immediately.`)
      // Save the user with updated tag and pin
      await user.save();
  
      return res.status(200).json({ message: 'Tag and Pin set successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error setting tag and pin' });
    }
  }

  

  

export async function createBankAccountForUser (req: Request, res: Response) {
    try {
      const userId = req.body.userId
      const user = await User.findOne({ _id: userId })
  
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      } else if (user.tier > 0) {
        const customerId = user.customerId
        const account = await createBankAccount(customerId)
        console.log(account)
        console.log(account.data.account_number)
        console.log(account.data.account_name)
        console.log(account.data.bank_name)
        if (account) {
          user.accountNumber = account.data.account_number
          user.accountName = account.data.account_name
          user.bankName = account.data.bank_name
          await user.save()
          sendMailToUser(user.email, 'Account Number Generation Notification', `You just generated an account number ${account.data.account_number} on FeedXPay. If you did not initiate this change, please contact us immediately.`)
          return res.status(200).json({ message: "Account created successfully" })
        }
        }
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error, cannot create account for User" })
    }
  }
  
  
  
  
  
  
  
  
  // Generate and send a new OTP to the user
  export async function requestNewOTP(userId: any): Promise<void> {

    try {
      const otp = await generateOTP();
      console.log(otp)
      const expirationTimestamp = Date.now() + 10 * 60 * 1000; // 10 minutes
      console.log(expirationTimestamp)
      const user = await User.findById(userId);
      console.log(user)
      if (user) {
        user.otp = otp;
        user.otpExpiration = new Date(expirationTimestamp);
        await user.save();
      }
    } catch (error) {
      return
    }
  }


  
  
  export async function forgotPassword (req: Request, res: Response) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const otp: any = await generateOTP();
        await sendMailToUser(user.email, 'OTP For Verification', `
        <p>This is you OTP sent from FeedXPay to verify your account.</p>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
      `)
        const expirationTimestamp = Date.now() + 10 * 60 * 1000; // 10 minutes
        user.otp = otp;
        user.isVerified = false;    
        user.otpExpiration = new Date(expirationTimestamp);
        await user.save();
        return res.status(200).json({ message: 'OTP sent successfully', otp });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error sending OTP' });
    }
  }
  
  
  
  
  export async function resetPassword (req: Request, res: Response) {
    try {
      const { enteredOTP, newPassword } = req.body;
      const user: any = await User.findOne({ otp: enteredOTP });
      if (user.isVerified === false) {
        return res.status(400).json({ message: 'Please verify your OTP' });
      }
      console.log(user)
      if (user) {
        const currentTimestamp = Date.now();
        if (user.otpExpiration && user.otpExpiration.getTime() > currentTimestamp) {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
          console.log(hashedPassword)
          user.password = hashedPassword;
          user.otp = 0;
          user.otpExpiration = 0;
          await user.save();
          console.log(user)
          await sendMailToUser(user.email, 'Password Reset Notification', `You just reset your password on FeedXPay. If you did not initiate this change, please contact us immediately.`)
          return res.status(200).json({ message: 'Password reset successful' });
        } else {
          return res.status(400).json({ message: 'OTP expired' });
        }
      } else if(!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error resetting password' });
    }
  }
  
  
  
  export async function changePassword (req: Request, res: Response)  {
    try {
      const { oldPassword, newPassword, userId } = req.body
      const user: any = await User.findOne({_id: userId})
      console.log(user)
      bcrypt.compare(oldPassword, user.password).then(async (success) => {
        console.log(success)
        let saltRounds = 10
        let newHashedPassword = await bcrypt.hash(newPassword, saltRounds)
        if (!success) {
          return res.status(400).json({ message: "Invalid Password" })
        } else {
          console.log(newHashedPassword)
          console.log(user.password)
          user.password = newHashedPassword
          user.save()
          await sendMailToUser(user.email, 'Password Change Notification', `You just changed your password on FeedXPay. If you did not initiate this change, please contact us immediately.`)
          res.json(user)
        }
        // res.json("cannot find user with the Id")
      })
    } catch (error) {
      return res.json({ message: "Internal Server Error"})
    }
  }
  
  
  
  export async function changeTag (req: Request, res: Response) {
    try {
      const {newTag, userId} = req.body
      const user = await User.findById(userId)
      if (!user) {
        return res.status(400).json({ message: "User not found"})
      }
      user.tag = newTag
      await user.save()
      await sendMailToUser(user.email, 'Tag Change Notification', `You just changed your tag on FeedXPay. If you did not initiate this change, please contact us immediately.`)
      return res.status(200).json({ message: "User tag changed successfully"})
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error, cannot change user tag"})
    }
  }
  
  
  
  
  
  
  
