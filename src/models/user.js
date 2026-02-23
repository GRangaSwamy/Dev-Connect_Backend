const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
    },
    lastName : {
        type : String,
        trim : true
    },
    email : {
        lowercase : true,
        type : String,
        required : true,
        unique : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough");
            }
        }
    },
    age : {
        type : Number,
        trim : true,
        min : 18,
        max : 99
    },
    gender : {
        type : String,
        validate(value){
            if(!["male","female","other"].includes(value.toLowerCase())){
                throw new Error("Gender must be either male, female or other");
            } 
        }
    },
    photoURL :{
        type : String
    },
    about : {
        type : String,
        default : "Happy to be part of Dev Connect"
    },
    skills :{
        type : [String]
    }
},{
    timeStamps : true
}
);
userSchema.methods.getJWT = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id},"dev@2004",{expiresIn : "1d"});
    return token;
}
userSchema.methods.validatePassword = async function(pwdByUser){
    const user = this;
    const pwdHash = this.password;
    const isPwdValid = await bcrypt.compare(pwdByUser,pwdHash);
    return isPwdValid;
}
const User =  mongoose.model("User",userSchema);

module.exports = User;