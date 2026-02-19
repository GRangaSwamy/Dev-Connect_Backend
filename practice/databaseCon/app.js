const express = require('express');
const User = require('../../src/models/user');
require('./database');
const { createSearchIndex } = require('../../src/models/user');
const app = express();
app.post('/signup', async (req,res)=>{
    const userObj = {
        firstName : "Pandu",
        lastName : 'Gopini',
        email : "pandugopini@example.com",
        password    : "Pandu@123",
        age : 18,   
        gender : 'Female'
    }
    const user = new User(userObj);
    await user.save();
    res.send("User signed up successfully");
})
// app.use('/',(req,res)=>{
//     res.send("Hello World, Greetings from DevConnect Backend!");
// });
app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})