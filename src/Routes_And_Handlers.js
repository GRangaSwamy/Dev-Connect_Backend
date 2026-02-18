const{userAuth} = require('../middlewares/middleare');
const express = require("express");
const app = express();

// app.get('/user',(req, res,next) => {
//     console.log("First callback function");
//     next();
// },(req,res,next)=>{  // middleware function
//     console.log("This is the second callback function");
//     next();
// },(req,res,next)=>{ // middleware function
//     console.log("This is the third callback function");
//     next();
// },(req,res,next)=>{
//     console.log("This is the fourth callback function");
//     res.send("This is the fourth callback function");
// });


// change the order of the below 2 callback functions and see the output

// app.get('/user',(req,res,next)=>{
//     console.log("This is the second callback function");
//     res.send("This is the second callback function");
// });

// app.get('/user',(req, res,next) => {
//     console.log("First callback function");
//     next();
// });

//  usage of middleware function
// app.use('/admin',(req,res,next)=>{
//     const token = "ranga123";
//     const isAdmin = token === "ranga13";
//     if(!isAdmin){
//         res.status(401).send("Unauthorized");
//     }
//     else {
//         next();
//     }
// })

// usage of middleware function in route handler
// app.get('/admin',userAuth,(req,res)=>{
//     res.send("Welcome to the admin panel");
// });

// Error handling 

app.get('/user',(req,res)=>{
    res.send("This is the user route");
})

app.use('/',(err,req,res,next)=>{
    res.status(500).send("Internal Server Error :" + err.message);
})
app.listen(3000, () => {
  console.log("Server running on port 3000");
});