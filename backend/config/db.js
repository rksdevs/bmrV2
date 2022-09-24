// import mongoose from "mongoose";
const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection established to the database!");
  } catch (error) {
    throw error;
  }
};

// export default connectToDb;
module.exports = connectToDb;
