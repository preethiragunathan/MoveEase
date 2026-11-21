
const express = require("express");
const router = express.Router();

const Vehicle = require("../models/Vehicle");

// Add a new vehicle
router.post("/", async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);

        const savedVehicle = await vehicle.save();

        res.status(201).json({
            message: "Vehicle added successfully",
            vehicle: savedVehicle
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to add vehicle",
            error: error.message
        });
    }
});

// Get all vehicles
router.get("/", async (req, res) => {
    try {
        const vehicles = await Vehicle.find().sort({ createdAt: -1 });

        res.status(200).json(vehicles);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch vehicles",
            error: error.message
        });
    }
});

// Get available vehicles only
// Important: The /available route is intentionally placed before /:id. Otherwise, Express could interpret available as a vehicle ID.
router.get("/available", async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ isAvailable: true });

        res.status(200).json(vehicles);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch available vehicles",
            error: error.message
        });
    }
});

// Get a single vehicle
router.get("/:id", async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.status(200).json(vehicle);

    } catch (error) {
        res.status(400).json({
            message: "Invalid vehicle ID",
            error: error.message
        });
    }
});

// Update vehicle
router.put("/:id", async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedVehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            message: "Vehicle updated successfully",
            vehicle: updatedVehicle
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to update vehicle",
            error: error.message
        });
    }
});

// Delete vehicle
router.delete("/:id", async (req, res) => {
    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);

        if (!deletedVehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            message: "Vehicle deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to delete vehicle",
            error: error.message
        });
    }
});

module.exports = router;
