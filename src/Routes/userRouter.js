const express = require('express');
const { userAuth } = require('../../middlewares/userauth');
const ConnectionRequest = require('../models/connectionRequest')
const User = require('../models/user')
const userRoute = express.Router();

const USER_SAFE_DATA = "firstName lastName photoURL age gender about skills"
// Get all the pending connection request for the loggedIn User
userRoute.get("/user/requests/received",userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested"
        }).populate("fromUserId",USER_SAFE_DATA) // we are using the referenced , check connectionReq Schema

        res.json({message:"Data fecthed successfully",
             data : connectionRequests})
    }catch(err){
        return req.status(400).send("ERROR :- "+err.message);
    }
})

// To get all connections
userRoute.get('/user/connections',userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                { toUserId:loggedInUser._id , status :"accepted"},
                { fromUserId:loggedInUser._id, status : "accepted"}
            ]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
        const data = connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId;
        })
        res.json({data:data});
    }catch(err){
        res.send("ERROR :- "+err.message)
    }
})

// FEED API

userRoute.get('/user/feed',userAuth, async(req,res)=>{
    try{
        // We do not show :- own card to him, who he ignored, who he accepted and already sent to connection request
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        limit = limit > 50 ? 50 : limit
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                { fromUserId : loggedInUser._id },
                { toUserId : loggedInUser._id}
            ]
        }).select("fromUserId toUserId");
        const hideUsersFromFeed = new Set();
        connectionRequest.forEach(req=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })
        console.log(hideUsersFromFeed)
        const user = await User.find({
            $and : [
                { _id:{$nin:Array.from(hideUsersFromFeed)} },
                { _id : {$ne : loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)
        res.send(user)
    }catch(err){

        res.status(400).json({message:err.message})
    }
})
module.exports = userRoute;