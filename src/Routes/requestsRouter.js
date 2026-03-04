const express = require('express');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const { userAuth } = require('../../middlewares/userauth');
const { connection } = require('mongoose');

const requestRouter = express.Router();
// Sending Connection request
requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignore", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).send("Invalid status :- " + status);
    }

    const isUserExist = await User.findById(toUserId);
    if (!isUserExist) {
      return res.status(400).json({ message: "Invalid connection request. User not found" });
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ]
    });

    if (existingConnectionRequest) {
      return res.status(400).send("Connection request already exist!!");
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    });

    const data = await connectionRequest.save();

    res.json({
      message: req.user.firstName + " is " + status + " " + isUserExist.firstName,
      data
    });

  } catch (err) {
    res.status(400).send('ERROR : ' + err.message);
  }
});

requestRouter.post('/request/review/:status/:requestId',userAuth,async (req,res)=>{
    try{
      const loggedInUser = req.user;
      const {status,requestId} = req.params;
      const allowedStatus = ["accepted","rejected"]
      if(!allowedStatus.includes(status)){
        return res.status(400).json({message:"Status not allowed"})
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        toUserId : loggedInUser._id,
        status : "interested"
      })
      if(!connectionRequest){
        return res.status(404).json({message : "Connection request Not found"})
      };
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({message : "Connection Request "+status,data});
      // validate status

      // A --> B
      // loggedInUser --> toUserId
      // status --> Interested
      //  Request Id should be valid
    } catch(err){
      res.status(400).send("ERROR : "+err.message);
    }

})
module.exports = requestRouter;