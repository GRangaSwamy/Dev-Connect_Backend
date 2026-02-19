const mongoose = require('mongoose');
const connectDB =async ()=>{
   await mongoose.connect('mongodb+srv://ranga*********:q*******@test.hwlry9l.mongodb.net/PracticeDB'); 
} 
connectDB().then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.error("Database connection failed",err);
})
