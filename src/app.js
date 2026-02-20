require('../src/config/database');
const express = require('express');
const User = require('../src/models/user');

const app = express();

app.use(express.json());  // Middleware to parse JSON request bodies
app.post('/signup', async (req, res) => {
  console.log(req.body);
  // const userObj = {
  //   firstName: "Virat",
  //   lastName: "Kohli",
  //   email: "123@gmail.com",
  //   password: "Esala Cup Namdu",
  //   age: 34,
  //   gender: "Male"
  // };

  const user = new User(req.body);
  try{
    user.save();
    res.status(201).send("User created successfully");
  }catch(err){
    res.status(400).send("Error creating user: " + err.message);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

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