
const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        pickupAddress: {
            type: String,
            required: true,
            trim: true
        },
        destinationAddress: {
            type: String,
            required: true,
            trim: true
        },
        movingDate: {
            type: Date,
            required: true
        },
        houseType: {
            type: String,
            required: true,
            enum: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Office", "Other"]
        },
        additionalDetails: {
            type: String,
            trim: true,
            default: ""
        },
        status: {
            type: String,
            enum: ["Pending", "Contacted", "Quoted", "Converted", "Rejected"],
            default: "Pending"
        },
        estimatedPrice: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
