// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import connectToDb from "./config/db.js";
// import cookieParser from "cookie-parser";
// import path from "path";
// import { fileURLToPath } from "url";

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const connectToDb = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

//importing all the routes
// import authRoute from "./routes/auth.js";
// import hotelsRoute from "./routes/hotels.js";
// import roomsRoute from "./routes/rooms.js";
// import usersRoute from "./routes/users.js";
// import userDetailsRoute from "./routes/userDetails.js";

const authRoute = require("./routes/auth");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");
const usersRoute = require("./routes/users");
const userDetailsRoute = require("./routes/userDetails");

const app = express();
dotenv.config();
// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

//checking mongoDB database integration
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected!");
});

//testing api endpoints
// app.get("/", (req, res) => {
//   res.send("Endpoint connected");
// });

//middlewares
//to be able to send/receive json in express
app.use(cookieParser());
app.use(express.json());

// app.use(express.static(path.resolve(__dirname, "public")));

//implementing routes middlewares
app.use("/auth", authRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);
app.use("/users", usersRoute);
app.use("/userDetails", userDetailsRoute);

app.listen(8800, () => {
  connectToDb();
  console.log("Connected to port 8800");
});
