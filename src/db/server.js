const mongoose = require('mongoose');

module.exports = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
  
};
    

