
const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");

// Create a new booking
router.post("/", async (req, res) => {
    try {
        const booking = new Booking(req.body);

        const savedBooking = await booking.save();

        res.status(201).json({
            message: "Booking created successfully",
            booking: savedBooking
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to create booking",
            error: error.message
        });
    }
});

// Get all bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });

        res.status(200).json(bookings);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch bookings",
            error: error.message
        });
    }
});

// Get a single booking
router.get("/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json(booking);

    } catch (error) {
        res.status(400).json({
            message: "Invalid booking ID",
            error: error.message
        });
    }
});

// Update booking
router.put("/:id", async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json({
            message: "Booking updated successfully",
            booking: updatedBooking
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to update booking",
            error: error.message
        });
    }
});

// Delete booking
router.delete("/:id", async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

        if (!deletedBooking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json({
            message: "Booking deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to delete booking",
            error: error.message
        });
    }
});

module.exports = router;
