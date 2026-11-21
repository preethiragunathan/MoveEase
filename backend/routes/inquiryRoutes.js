
const express = require("express");
const router = express.Router();

const Inquiry = require("../models/Inquiry");

// Submit a new inquiry
router.post("/", async (req, res) => {
    try {
        const inquiry = new Inquiry(req.body);

        const savedInquiry = await inquiry.save();

        res.status(201).json({
            message: "Inquiry submitted successfully",
            inquiry: savedInquiry
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to submit inquiry",
            error: error.message
        });
    }
});

// Get all inquiries
router.get("/", async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });

        res.status(200).json(inquiries);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch inquiries",
            error: error.message
        });
    }
});

// Get a single inquiry by ID
router.get("/:id", async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({
                message: "Inquiry not found"
            });
        }

        res.status(200).json(inquiry);

    } catch (error) {
        res.status(400).json({
            message: "Invalid inquiry ID",
            error: error.message
        });
    }
});

// Update inquiry status and quotation
router.put("/:id", async (req, res) => {
    try {
        const updatedInquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedInquiry) {
            return res.status(404).json({
                message: "Inquiry not found"
            });
        }

        res.status(200).json({
            message: "Inquiry updated successfully",
            inquiry: updatedInquiry
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to update inquiry",
            error: error.message
        });
    }
});

// Delete an inquiry
router.delete("/:id", async (req, res) => {
    try {
        const deletedInquiry = await Inquiry.findByIdAndDelete(req.params.id);

        if (!deletedInquiry) {
            return res.status(404).json({
                message: "Inquiry not found"
            });
        }

        res.status(200).json({
            message: "Inquiry deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to delete inquiry",
            error: error.message
        });
    }
});

module.exports = router;
