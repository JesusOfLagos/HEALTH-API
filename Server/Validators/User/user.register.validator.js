

let isEmpty = require("is-empty");
let validator = require("validator");


module.exports.RegisterValidator = (data) => {
    const errors = {}

    
    

    data.email = !(isEmpty(data.email)) ? data.email : "";
    data.password = !(isEmpty(data.password)) ? data.password : "";
    data.firstName = !(isEmpty(data.firstName)) ? data.firstName : "";
    data.lastName = !(isEmpty(data.lastName)) ? data.lastName : "";
    data.qualifications = !(isEmpty(data.qualifications)) ? data.qualifications : "";
    data.education = !(isEmpty(data.education)) ? data.education : "";
    data.location = !(isEmpty(data.location)) ? data.location : "";
    data.speciality = !(isEmpty(data.speciality)) ? data.speciality : "";
    data.experience = !(isEmpty(data.experience)) ? data.experience : "";
    data.availability = !(isEmpty(data.availabilty)) ? data.availabilty : "";
    data.gender = !(isEmpty(data.gender)) ? data.gender : "";
    data.age = !(isEmpty(data.age)) ? data.age : "";
    data.contact = !(isEmpty(data.contact)) ? data.contact : "";
    data.affiliation = !(isEmpty(data.affiliation)) ? data.affiliation : "";
    data.languageSpoken = !(isEmpty(data.languageSpoken)) ? data.languageSpoken : "";
    data.image = !(isEmpty(data.image)) ? data.image : "";

    let emailError = validator.isEmpty(data.email) ? "Email is required!" : (!validator.isEmail(data.email) ? "Please provide a valid email!": "");
    let passwordError = validator.isEmpty(data.password) ? "Passord is required": "";
    let firstNameError = validator.isEmpty(data.firstName) ? "First Name is required": "";
    let lastNameError = validator.isEmpty(data.lastName) ? "Last Name is required": "";
    let qualificationsError = validator.isEmpty(data.qualifications) ? "Last Name is required": "";
    let educationError = validator.isEmpty(data.education) ? "Last Name is required": "";
    let locationError = validator.isEmpty(data.location) ? "Last Name is required": "";
    let specialityError = validator.isEmpty(data.speciality) ? "Last Name is required": "";
    let experienceError = validator.isEmpty(data.experience) ? "Last Name is required": "";
    let availabilityError = validator.isEmpty(data.availability) ? "Last Name is required": "";
    let genderError = validator.isEmpty(data.gender) ? "Last Name is required": "";
    let ageError = validator.isEmpty(data.age) ? "Last Name is required": "";
    let contactError = validator.isEmpty(data.contact) ? "Last Name is required": "";
    let affiliationError = validator.isEmpty(data.affiliation) ? "Last Name is required": "";
    let languageSpokenError = validator.isEmpty(data.languageSpoken) ? "Last Name is required": "";
    let imageError = validator.isEmpty(data.image) ? "Last Name is required": "";


    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    if (firstNameError || lastNameError) errors.firstName = "Full name is required";
    if (qualificationsError) errors.qualifications = qualificationsError;
    if (educationError) errors.education = educationError;
    if (locationError) errors.location = locationError;
    if (specialityError) errors.speciality = specialityError;
    if (experienceError) errors.experience = experienceError;
    if (availabilityError) errors.availability = availabilityError;
    if (genderError) errors.gender = genderError;
    if (ageError) errors.age = ageError;
    if (contactError) errors.contact = contactError;
    if (affiliationError) errors.affiliation = affiliationError;
    if (languageSpokenError) errors.languageSpoken= languageSpokenError;
    if (imageError) errors.image = imageError;


    return{
        errors,
        isValid: isEmpty(errors)
    }
}



