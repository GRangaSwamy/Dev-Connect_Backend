const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
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
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    age : {
        type : Number,
        required : true,
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
})
const User =  mongoose.model("User",userSchema);

module.exports = User;