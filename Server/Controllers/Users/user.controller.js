

import User from "../../Models/User/user.model"
import cloudinary from "../../Services/Storage/cloudinary"
import RegisterValidator from "../../Validators/User/user.register.validator"
import LoginValidator from "../../Validators/User/user.login.validator"
import ObjectId from "mongoose"
import CreateWallet from "../Payment/Finance/wallet.controller"
import { generateRandomUsername } from "../../Auth/token.auth"




export async function RegisterUser (req, res) {
    try {
        const defaultProfile = new ObjectId
        const { email, password } = req.body
        await RegisterValidator(req.body)
       const newUser = new User({
        email,
        password,
        username: new generateRandomUsername(),
        wallet: defaultProfile,
        profile: defaultProfile
       }) 

       const newWallet  = CreateWallet(userId)
       user.wallet = newWallet
       await newUser.save()
       res.json({
        message: "User Created Successfully.",
        user: newUser._id
       })
    } catch (error) {
        res.json({
            message: "Error Creating User.",
            error
        })
    }
}






export async function LoginUser (req, res) {
    try {
        const { email, password } = req.body
        await LoginValidator(req.body)
        const user = await User.findOne({ email })

    } catch (error) {
        res.json({
            message: "Error Login In User!"
        })
    }
}


export async function LogoutUser (req, res) {
    try {
        const userId = req.user._id
        
    } catch (error) {
        
    }
}