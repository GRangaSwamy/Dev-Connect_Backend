const validator = require('validator');
const validateSignUpData = (req)=>{
    const{firstName, lastName, email, password} = req.body;
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
module.exports = {
    validateSignUpData
};