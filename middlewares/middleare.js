const express = require('express');
const userAuth = express();
userAuth.use('/admin',(req,res,next)=>{
    const token = "ranga123";
    const isAdmin = token === "ranga123";    
    if(!isAdmin){
        return res.status(401).send("Unauthorized");
    }
   next();
});
module.exports = {userAuth};