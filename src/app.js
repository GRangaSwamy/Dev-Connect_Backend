require("dotenv").config();

const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.set("trust proxy", 1);

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://dev-connect-frontend-ey0q6egkr-grangaswamys-projects.vercel.app"
  ],
  credentials: true
}));

const authRouter = require('./Routes/authRouter');
const profileRouter = require('./Routes/profileRouter');
const requestsRouter = require('./Routes/requestsRouter');
const userRoute = require('./Routes/userRouter');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestsRouter);
app.use('/', userRoute);

const PORT = process.env.PORT || 3000;

connectDB()
.then(()=>{
  console.log("Database connected successfully");
  app.listen(PORT, ()=>console.log("Server running on port " + PORT));
})
.catch(err=>{
  console.error("Database connection failed:", err);
});