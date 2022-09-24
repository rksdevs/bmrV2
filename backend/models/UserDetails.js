// import mongoose from "mongoose";
// const { Schema } = mongoose;
const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// export default mongoose.model("UserDetails", UserDetailsSchema);

module.exports = mongoose.model("UserDetails", UserDetailsSchema);
