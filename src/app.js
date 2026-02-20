// require('../src/config/database');
const express = require('express');
const User = require('../src/models/user');
const connectDB = require('./config/database');
const app = express();

app.use(express.json());  // Middleware to parse JSON request bodies
app.post('/signup', async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try{
    user.save();
    res.status(201).send("User created successfully");
  }catch(err){
    res.status(400).send("Error creating user: " + err.message);
  }
});

// Get user by firstName
app.get('/user',async (req,res)=>{
  const fs = req.body.firstName;
  try{
    const users = await User.find({firstName: fs});
    res.send(users);
  }catch(err){
    res.status(500).send("Error fetching users: " + err.message);
  }
});

// Get one user only by firstName
app.get('/user/one',async (req,res)=>{
  const {firstName} = req.query;
  try{
    const user = await User.findOne({firstName})
    res.send(user);
  }catch(err){
    res.status(500).send("Error fetching user: " + err.message);
  }
});

// Feed API - GET / feed -get all users from the database

app.get("/feed",async (req,res)=>{
  try{
    const users = await User.find({});
    res.send(users);
  }catch(err){
    res.status(500).send("Error fetching users: " + err.message);
  }
})

connectDB().then(()=>{
    console.log("Database connected successfully"); 
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    });
}).catch((err)=>{
    console.error("Database connection failed: ", err);
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