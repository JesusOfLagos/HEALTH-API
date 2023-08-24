
const express = require("express");
const doctorRouter = express.Router()
const Doctor = require("../../Controllers/Doctors/doctor.controller")



doctorRouter.post('/register', Doctor.RegisterDoctor)
doctorRouter.post('/login', Doctor.LoginDoctor)
doctorRouter.post('/logout', Doctor.LogoutDoctor)
doctorRouter.post('/renew-token', Doctor.RenewToken)
doctorRouter.post('/delete-account', Doctor.DeleteAccount)
