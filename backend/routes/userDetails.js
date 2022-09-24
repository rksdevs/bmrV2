// import express from "express";
const express = require("express");
// import {
//   subscribe,
//   exportUserData,
// } from "../controllers/UserDetailsController.js";

const {
  subscribe,
  exportUserData,
} = require("../controllers/UserDetailsController");

const router = express.Router();

router.post("/", subscribe);

router.get("/download", exportUserData);

// export default router;

module.exports = router;
