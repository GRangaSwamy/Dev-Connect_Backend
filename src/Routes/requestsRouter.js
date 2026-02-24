const express = require('express');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const { userAuth } = require('../../middlewares/userauth');

const requestRouter = express.Router();

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

module.exports = requestRouter;