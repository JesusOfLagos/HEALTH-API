import joi from "joi"

export const doctorValidator = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phone: joi.string().required(),
    address: joi.string().required(),
    specialization: joi.string().required(),
    experience: joi.string().required(),
    fee: joi.string().required(),
})