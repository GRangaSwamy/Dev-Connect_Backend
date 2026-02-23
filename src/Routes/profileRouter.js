const express = require('express');
const {validateProfileEditData} = require('../utils/validation')
const{userAuth} = require('../../middlewares/userauth')
const profileRouter = express.Router();
// profileRouter.use(express.json());
profileRouter.get('/profile/view',userAuth, async (req,res)=>{
  try{
    const user = req.user;
    res.send(user);
}catch(err){
  res.send("Something went wrong")
}
})
profileRouter.patch('/profile/edit',userAuth,async(req,res)=>{
    try{
        if(!validateProfileEditData(req.body)){
            throw new Error("Invalid edit request");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(key=>loggedInUser[key] = req.body[key]);
        await loggedInUser.save();
        res.send(loggedInUser.firstName + ", your data updated successfully");
    }catch(err){
        res.status(400).send("ERROR :- "+err.message);
    }
})
module.exports = profileRouter;