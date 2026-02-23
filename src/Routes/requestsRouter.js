const express = require('express');
const{userAuth} = require('../../middlewares/userauth')
const requestRouter = express.Router();
requestRouter.post('/sendConnect',userAuth,async(req,res)=>{
  // sending a connection request
  const user = req.user;
  console.log("Sending connection Request");
  res.send(user.firstName + " sent you a connection request");
});
module.exports = requestRouter;