// require('../src/config/database');
const express = require('express');
const User = require('../src/models/user');
const connectDB = require('./config/database');

const app = express();
app.use(express.json());

// Signup
app.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get users by firstname
app.get('/user', async (req, res) => {
  const { firstName } = req.query;
  try {
    const users = await User.find({ firstName });
    res.send(users);
  } catch (err) {
    res.status(500).send("Error fetching users: " + err.message);
  }
});

// Get user by id
app.get('/findbyid', async (req, res) => {
  const { _id } = req.query;
  try {
    const user = await User.findById(_id);
    res.send(user);
  } catch (err) {
    res.status(500).send("Error fetching user: " + err.message);
  }
});

// Get one user only
app.get('/user/one', async (req, res) => {
  const { firstName } = req.query;
  try {
    const user = await User.findOne({ firstName });
    res.send(user);
  } catch (err) {
    res.status(500).send("Error fetching user: " + err.message);
  }
});

// Feed API
app.get('/feed', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send("Error fetching users: " + err.message);
  }
});

// Delete user by id
app.delete('/user',async (req,res)=>{
  const id = req.body;
  try{
    const user = await User.findByIdAndDelete(id);
    res.send("User deleted successfully: " + user);
  }catch(err){
    res.status(500).send("Error deleting user: " + err.message);  
  }
})

// Patch data user
app.patch('/user',async(req,res)=>{
  const {_id} = req.body;
  const data = req.body;
  try{
    const allowesUpdates = ["firstName","lastName","password","age","gender","photoURL","about","skills"];
    const updates = Object.keys(data);
    const isValidOperation = updates.every((update)=> allowesUpdates.includes(update));
    const skills = data?.skills;
    if(skills && skills.length > 5){
      throw new Error("Skills cannot be more than 5");
    }
    if(!isValidOperation){
      return res.status(400).send("Invalid updates!");
    }
    await User.findByIdAndUpdate(_id, req.body);
    res.send("User updated successfully");
  }catch(err){
    res.status(500).send("Error updating user: " + err.message);
  }
})

// Delete One User by Name
app.delete('/user/one', async (req,res)=>{
      try{
        const {lastName} = req.body;
        await User.deleteOne({lastName});
        res.send("User deleted successfully");
      }catch(err){
        res.status(500).send("Error deleting user: " + err.message);  
      }
})
// Connect DB & Start Server (ONLY ONCE)
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

// app.use('/greet',(req,res)=>{
//     res.send("Hello World, Greetings from DevConnect Backend!");
// })

// app.use((req,res)=>{
//     res.send("Welcome to the Dashboard of DevConnect Backend! Append /greet to welcome You");
// })

// *** Listen to the server in database connection file after successful connection ***
// app.listen(3000,()=>{
//     console.log("Server is running on port 3000");
// });