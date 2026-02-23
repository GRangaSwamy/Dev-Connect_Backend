const express = require('express');
const ConnectionRequestModel = require('../models/connectionRequest')
const{userAuth} = require('../../middlewares/userauth')
const requestRouter = express.Router();
requestRouter.post('/request/send/:status/:toUserId',userAuth,async(req,res)=>{
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    const ConnectionRequest = new  ConnectionRequestModel({
      fromUserId,toUserId,status
    })
    const data = await ConnectionRequest.save();
    res.json({
      message : "Connection Request send successfully",
      data
    });
  }catch(err){
    res.status(400).send('ERROR : '+err.message)
  }
});
module.exports = requestRouter;