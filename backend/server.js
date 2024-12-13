const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = "mongodb://localhost:27017/restaurantDB"; // Replace with your MongoDB connection string

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Booking Schema
const bookingSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  phone: String,
  date: String,
  time: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

// Routes hii
// Fetch all bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookings" });
  }
});

// Create a new booking
app.post("/api/bookings", async (req, res) => {
  try {
    const { name, lastname, phone, date, time } = req.body;
    const newBooking = new Booking({ name, lastname, phone, date, time });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: "Error creating booking" });
  }
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
