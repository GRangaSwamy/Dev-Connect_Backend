const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());
const authRouter  = require('./Routes/authRouter')
const profileRouter  = require('./Routes/profileRouter')
const requestsRouter  = require('./Routes/requestsRouter');
const userRoute = require('./Routes/userRouter');

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestsRouter);
app.use('/',userRoute)

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