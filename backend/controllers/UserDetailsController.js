// import UserDetails from "../models/UserDetails.js";

const UserDetails = require("../models/UserDetails");

//New Subscribe
const subscribe = async (req, res) => {
  try {
    const userDetails = new UserDetails({
      fullName: req.body.fullName,
      email: req.body.email,
      city: req.body.city,
      contact: req.body.contact,
    });

    await userDetails.save();
    res.status(200).json(userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Downloading data

const exportUserData = async (req, res) => {
  try {
    const userData = await UserDetails.find();
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { subscribe, exportUserData };
