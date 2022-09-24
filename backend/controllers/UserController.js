// import User from "../models/User.js";
const User = require("../models/User");

const getSpecificUser = async (req, res) => {
  try {
    const userToGet = await User.findById(req.params.id);
    res.status(200).json(userToGet);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Read all Users

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Update User
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Delete User
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "User has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { deleteUser, updateUser, getAllUsers, getSpecificUser };
