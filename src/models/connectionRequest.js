const mongoose = require('mongoose');
const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:String,
        required : true
    },
    toUserId:{
        type:String,
        required : true
    },
    status :{
        type : String,
        enum : {
            values:["ignore","rejected","accepted","interested"],
            message : `${'VALUE'} is incorrect status type`
        },
    }
},
{ timestamps: true });
const ConnectionRequestModel = new mongoose.model('ConnectionRequest',connectionRequestSchema)
module.exports = ConnectionRequestModel;