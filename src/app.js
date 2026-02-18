const express = require('express');
const app = express();

app.use('/greet',(req,res)=>{
    res.send("Hello World, Greetings from DevConnect Backend!");
})
app.use('/',(req,res)=>{
    res.send("Welcome to the Dashboard of DevConnect Backend! Append /greet to welcome You");
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});