const jwt = require('jsonwebtoken')
const User = require('../src/models/user')
const userAuth = async (req,res,next)=>{

    //  Read the token from req cookie
    try{
        const {token} = req.cookies;
        if(!token) throw new Error("Token is not Valid");
        const decodedData = await jwt.verify(token,"dev@2004")
        // validate the token
        const {_id} = decodedData;
        const user = await User.findById(_id);
        if(!user) throw new Error("User Not Found")
        req.user = user;
        next();
    }catch(err){
        res.status(400).send("Invalid Token, Please Login:- "+err.message)
    }
};
module.exports = {
    userAuth
}