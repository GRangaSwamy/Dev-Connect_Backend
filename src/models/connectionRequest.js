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
connectionRequestSchema.pre("save", async function () {
  const connectionRequest = this;

  if (connectionRequest.fromUserId === connectionRequest.toUserId) {
    throw new Error("Can't send request to yourself");
  }
});
const ConnectionRequest = new mongoose.model('ConnectionRequest',connectionRequestSchema)
module.exports = ConnectionRequest;