const validator = require('validator');
const validateSignUpData = (req)=>{
    const{firstName, lastName, email, password,photoURL} = req.body;
    if(firstName && firstName.length < 3){
        throw new Error("First name must be at least 3 characters long");
    }
    else if(lastName && lastName.length < 3){
        throw new Error("Last name must be at least 3 characters long");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");
    }   
}
const validateProfileEditData = (data)=>{
    const allowedEditFields = ["firstName","lastName","age","photoURL","gender","about","skills"];
    const isEditAllowed = Object.keys(data).every((k)=>allowedEditFields.includes(k));
    return isEditAllowed;
}
module.exports = {
    validateSignUpData,
    validateProfileEditData
};