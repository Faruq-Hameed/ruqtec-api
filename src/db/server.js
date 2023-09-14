const mongoose = require('mongoose');

module.exports = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    // await mongoose.connect("mongodb://127.0.0.1:27017/ruqtec");

    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
  
};
    

