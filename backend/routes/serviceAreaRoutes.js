
const express = require("express");
const router = express.Router();

const ServiceArea = require("../models/ServiceArea");
const protectAdmin = require("../middleware/authMiddleware");

// Add a new service area
router.post("/", protectAdmin, async (req, res) => {
    try {
        const { areaName, city, state, pincode } = req.body;

        const serviceArea = new ServiceArea({
            areaName,
            city,
            state,
            pincode
        });

        const savedArea = await serviceArea.save();

        res.status(201).json({
            message: "Service area added successfully",
            serviceArea: savedArea
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add service area",
            error: error.message
        });
    }
});

// Get all service areas
router.get("/", async (req, res) => {
    try {
        const areas = await ServiceArea.find().sort({ createdAt: -1 });

        res.status(200).json(areas);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch service areas",
            error: error.message
        });
    }
});

// Update a service area
router.put("/:id", protectAdmin, async (req, res) => {
    try {
        const updatedArea = await ServiceArea.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedArea) {
            return res.status(404).json({
                message: "Service area not found"
            });
        }

        res.status(200).json({
            message: "Service area updated successfully",
            serviceArea: updatedArea
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update service area",
            error: error.message
        });
    }
});

// Delete a service area
router.delete("/:id", protectAdmin, async (req, res) => {
    try {
        const deletedArea = await ServiceArea.findByIdAndDelete(req.params.id);

        if (!deletedArea) {
            return res.status(404).json({
                message: "Service area not found"
            });
        }

        res.status(200).json({
            message: "Service area deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete service area",
            error: error.message
        });
    }
});

module.exports = router;
