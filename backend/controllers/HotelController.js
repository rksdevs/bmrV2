// import Hotel from "../models/Hotel.js";
// import Room from "../models/Room.js";

const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

//Create Hotel
const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Read Hotel - specific
const getSpecificHotel = async (req, res) => {
  try {
    const hotelToGet = await Hotel.findById(req.params.id);
    res.status(200).json(hotelToGet);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Read all Hotels

const getAllHotels = async (req, res) => {
  const { min, max, ...others } = req.query;
  try {
    const allHotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 9999 },
    }).limit(req.query.limit);
    res.status(200).json(allHotels);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Update Hotel
const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Delete Hotel
const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Hotel has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Find by City Names

const countByCity = async (req, res) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Find by Hotel Names
const countByType = async (req, res) => {
  try {
    const hotelCounts = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCounts = await Hotel.countDocuments({ type: "apartment" });
    const resortCounts = await Hotel.countDocuments({ type: "resort" });
    const villaCounts = await Hotel.countDocuments({ type: "villa" });

    res.status(200).json([
      { type: "hotel", count: hotelCounts },
      { type: "apartment", count: apartmentCounts },
      { type: "resort", count: resortCounts },
      { type: "villa", count: villaCounts },
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Find rooms in a certain hotel

const getHotelRooms = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getHotelRooms,
  countByType,
  countByCity,
  deleteHotel,
  updateHotel,
  getAllHotels,
  getSpecificHotel,
  createHotel,
};
