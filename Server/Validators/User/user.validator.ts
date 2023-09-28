import Joi from "joi"




export const ValidateUser = Joi.object({
    email: Joi.string().email().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    profile: Joi.string().alphanum().required(), // Assuming profile is a string
    password: Joi.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).required(), // Requires at least Minimum length of 8 characters, one uppercaseletter, one lowercase letter, one digit, and one special character.
    wallet: Joi.string().alphanum().required(), // Assuming wallet is a string
    virtualaccounts: Joi.array().items(Joi.string()), // Assuming virtualaccounts is an array of strings
    role: Joi.string().alphanum().required(), // Assuming role is a string
    phoneNumber: Joi.string().regex(/^\d{10}$/), // 10-digit phone number
    tag: Joi.string().default(''),
    pin: Joi.string().min(4), // PIN must be at least 4 characters
    bvn: Joi.string().alphanum().optional(), // Optional BVN validation
    isVerified: Joi.boolean().default(false),
    verificationCode: Joi.string().optional(),
    isBlocked: Joi.boolean().default(false),
    isActive: Joi.boolean().default(true),
    timestamp: Joi.date().default(Date.now()),
    blockedUntil: Joi.date().default(Date.now()),
    refreshToken: Joi.string().optional(),
    refreshTokenExpires: Joi.date().optional(),
    referralCode: Joi.string().optional(),
  });
  


  export const LoginValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  