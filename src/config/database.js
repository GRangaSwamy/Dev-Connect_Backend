const mongoose = require('mongoose');

const connectDB = async () => {
   await mongoose.connect(
     'mongodb+srv://ranga*********06_db_user:qC*******@test.hwlry9l.mongodb.net/DevConnect'
   );
};

connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
