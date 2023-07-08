

let isEmpty = require("is-empty");
let validator = require("validator");


module.exports.LoginValidator = (data) => {
    const errors = {};

    data.email = !(isEmpty(data.email)) ? data.email : "";
    data.password = !(isEmpty(data.password)) ? data.password : "";

    let emailError = validator.isEmpty(data.email) ? "Email is required!" : (!validator.isEmail(data.email) ? "Please provide a valid email!": "");
    let passwordError = validator.isEmpty(data.password) ? "Passord is required": "";


    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return{
        errors,
        isValid: isEmpty(errors)
    }
}


module.exports.RegisterValidator = (data) => {
    const errors = {}

    
    

    data.email = !(isEmpty(data.email)) ? data.email : "";
    data.password = !(isEmpty(data.password)) ? data.password : "";
    data.firstName = !(isEmpty(data.firstName)) ? data.firstName : "";
    data.lastName = !(isEmpty(data.lastName)) ? data.lastName : "";
    data.qualifications = ""
    data.education = ""
    data.location = ""
    data.speciality = ""
    data.experience = ""
    data.availability = ""
    data.gender = ""
    data.age = !(isEmpty(data.age)) ? data.age : "";
    data.contact = ""
    data.affiliation = ""
    data.languageSpoken = ""
    data.image = ""

    let emailError = validator.isEmpty(data.email) ? "Email is required!" : (!validator.isEmail(data.email) ? "Please provide a valid email!": "");
    let passwordError = validator.isEmpty(data.password) ? "Passord is required": "";
    let firstNameError = validator.isEmpty(data.firstName) ? "First Name is required": "";
    let lastNameError = validator.isEmpty(data.lastName) ? "Last Name is required": "";
    let qualificationsError = validator.isEmpty(data.lastName) ? "Last Name is required": "";
    let educationError = validator.isEmpty(data.lastName) ? "Last Name is required": "";
    let locationError = validator.isEmpty(data.lastName) ? "Last Name is required": "";
    let specialityError = validator.isEmpty(data.lastName) ? "Last Name is required": "";
    let experienceError = validator.isEmpty(data.lastName) ? "Last Name is required": "";
    let availabilityError = validator.isEmpty(data.lastName) ? "Last Name is required": "";
    let genderError = validator.isEmpty(data.lastName) ? "Last Name is required": "";
    let ageError = validator.isEmpty(data.lastName) ? "Last Name is required": "";
    let contactError = validator.isEmpty(data.lastName) ? "Last Name is required": "";
    let affiliationError = validator.isEmpty(data.lastName) ? "Last Name is required": "";
    let languageSpokenError = validator.isEmpty(data.lastName) ? "Last Name is required": "";
    let imageError = validator.isEmpty(data.image) ? "Last Name is required": "";


    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    if (firstNameError || lastNameError) errors.firstName = "Full name is required";
    if (qualificationsError) errors.password = passwordError;
    if (educationError) errors.password = passwordError;
    if (locationError) errors.password = passwordError;
    if (specialityError) errors.password = passwordError;
    if (experienceError) errors.password = passwordError;
    if (availabilityError) errors.password = passwordError;
    if (genderError) errors.password = passwordError;
    if (ageError) errors.password = passwordError;
    if (contactError) errors.password = passwordError;
    if (affiliationError) errors.password = passwordError;
    if (languageSpokenError) errors.password = passwordError;
    if (imageError) errors.password = passwordError;


    return{
        errors,
        isValid: isEmpty(errors)
    }
}



