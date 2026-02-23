const express = require('express');
const{userAuth} = require('../../middlewares/userauth')
const profileRouter = express.Router();
profileRouter.get('/profile',userAuth,async (req,res)=>{
  try{
    const user = req.user;
    res.send(user);
}catch(err){
  res.send("Something went wrong")
}
})

module.exports = profileRouter;