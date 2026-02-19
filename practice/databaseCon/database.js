const mongoose = require('mongoose');
const connectDB =async ()=>{
   await mongoose.connect('mongodb+srv://rangaswamygolla06_db_user:qC3bEXPOjAaskekF@test.hwlry9l.mongodb.net/PracticeDB'); 
} 
connectDB().then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.error("Database connection failed",err);
})