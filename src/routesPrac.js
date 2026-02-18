const express  = require('express');
const app = express();
// app.use('/',(req,res)=>{
//     res.send('Hello World, this is my first route. In order to excute other routes comment this code in routesPrac file. Beacudse this route will catch all requests to the root path and the other routes will never be reached. So make sure to place the more specific routes before the more general ones.');
// })
app.use('/about',(req,res)=>{
    res.send('This is the about page');
})
// Attention Here: The order of the routes matters. If you place the contact route before the about route, it will catch all requests to /contact and /about, and the about route will never be reached. So make sure to place the more specific routes before the more general ones.
app.use('/about/user1',(req,res)=>{
    res.send('This is the user page under about');
})
app.use('/contact',(req,res)=>{
    res.send('This is the contact page');
})

// Now let's add some more routes to demonstrate different HTTP methods Order of code Matters . If you add use methd for user route before the get and post methods, it will catch all requests to /user and the get and post methods will never be reached. So make sure to place the more specific routes before the more general ones.

// app.use('/user',(req,res)=>{
//     res.send('This is the user page. It handles all HTTP methods for the /user route Comment this code in routesPrac file to test the GET and POST methods for /user route  ');
// });
app.get('/user',(req,res)=>{
    res.send({'First Name':'Ranga Swmay','Last Name':'Golla'});
    console.log("GET request received at /user route");
});
app.post('/user',(req,res)=>{
    console.log("POST request received at /user route");
    res.send('This is a POST request to the user route');
});
// use +, *, ? are used to match the route patterns. For example, if you want to match all routes that start with /user, you can use the following code:

app.get(/^\/a.+b$/, (req, res) => {
  res.send('Matches: /acb, /a123b, /aXYZb but not /ab  --> For +');
});

app.get(/^\/a.*b$/, (req, res) => {
  res.send('Matches: /ab, /a123b, /aXYZb -->  For *');
});

app.get(/^\/a.?b$/, (req, res) => {
  res.send('Matches: /ab, /acb but not /a123b or /aXYZb --> For ?');
});

app.use((req,res)=>{
    res.send('Welcome to DevConnect Backend! Please use the following routes to explore: /about, /about/user1, /contact, /user (GET and POST methods).');
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})