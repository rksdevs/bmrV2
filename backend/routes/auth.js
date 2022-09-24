// import express from "express";
// import { registerUser, login } from "../controllers/AuthController.js";

const express = require("express");
const { registerUser, login } = require("../controllers/AuthController");

const router = express.Router();

//register new user
router.post("/register", registerUser);

//login
router.post("/login", login);

// export default router;
module.exports = router;
