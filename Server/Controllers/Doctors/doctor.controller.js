const express = require("express");

const router = express.Router()

const mongoose = require("mongoose")

const JWT = require("jsonwebtoken")

const { LoginValidator, RegisterValidator } = require("../../Validators/validators");

const Doctors = require("../Models/Doctors")

const Users = require("../Models/Users")

const Complaints = require("../Models/Complaints")



// // Login A User

 async function LoginADoctor (req, res) {
    const {errors, isValid} = LoginValidator(req.body);
    if (!isValid) {
        res.json({success: false, errors});
    } else {
        Users.findOne({email: req.body.email}).then(user => {
            if (!user) {
                res.json({message: "Email not found", success: false})
            } else {
                bcrypt.compare(req.body.password, user.password).then(success => {
                    if (!success) {
                        res.json({message: "Invalid Password", success: false})
                    } else {
                        const payload = {
                            id: user._id,
                            name: user.firstName
                        }
                        jwt.sign(
                            payload,
                            process.env.APP_SECRET, {expiresIn: 2155926},
                            (err, token) => {
                                res.json({
                                    user,
                                    token: `Bearer Token: ` + token,
                                    success: true
                                })
                            }
                        )
                    }
                })
            }
        })
    }
}




// Create A User 

async function RegisterDoctor (req, res) {
    console.log(req.body)
    const {errors, isValid} = RegisterValidator(req.body);
    if (!isValid) {
        res.json({success: false, errors});
    } else {
        const {firstName, lastName, email, password, qualifications, education, location, speciality, availabilty, experience, gender, age, contact, affiliation, languageSpoken, image} = req.body;
        const newDoctor = new Doctors({
            firstName, 
            lastName,
            email,
            password,
            qualifications,
            education,
            location,
            speciality,
            availabilty,
            experience,
            gender,
            age,
            contact,
            languageSpoken,
            affiliation,
            createdAt: new Date()
        });
        await bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (hashErr, hash) => {
                if (err || hashErr) {
                    res.json({"message": "Error Ocurred While Hashing", success: false});
                    return;
                }

                newDoctor.password = hash;
                newDoctor.save().then(() => {
                    res.json({message: "Doctor Created Successfully", "success": true});
                })
            })
        })
    }
}




// Get A Doctor By Id

async function GetADoctorByID (req, res) {
    await Doctors.findOne({_id: req.params.id}).then(doctor => {
        res.json({doctor, success: true}).catch(er => {
            res.json({success: false, message: er.message})
        })
    })
}




// Delete A Doctor
async function DeleteADoctorByID (req, res) {
    await Doctors.findOneAndDelete({_id: req.params.id}).then(doctor => {
        res.json({message: "Doctor deleted successfully", success: true}).catch(er => {
            res.json({success: false, message: "Can't Delete Doctor"})
        })
    })
}


// Delete A Doctor By Email

async function DeleteADoctorByEmail (req, res) {
    const { email } = req.body
    const doctor = await Doctors.findOneAndDelete({email})
}




module.exports = { RegisterDoctor, LoginADoctor, GetADoctorByID, DeleteADoctorByEmail, DeleteADoctorByID}

 