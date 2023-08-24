
const express = require("express");
const userRouter = express.Router()
const User = require("../../Controllers/Users/user.controller")



userRouter.post('/register', User.RegisterUser)
userRouter.post('/login', User.LoginUser)
userRouter.post('/logout', Users.LogoutUser)
userRouter.post('/renew-token', User.RenewToken)
userRouter.post('/delete-account', User.DeleteAccount)
