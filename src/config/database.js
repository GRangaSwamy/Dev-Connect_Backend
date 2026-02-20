const mongoose = require('mongoose');

const connectDB = async () => {
   await mongoose.connect(
     'mongodb+srv://ranga*********06_db_user:qC*******@test.hwlry9l.mongodb.net/DevConnect'
   );
};
<<<<<<< HEAD
module.exports = connectDB;
=======

connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
>>>>>>> 8c32f4f482bf0bd642e5b8ccf7aca4505a6cfbcf
