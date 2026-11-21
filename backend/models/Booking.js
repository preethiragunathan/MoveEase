
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
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
        vehicleType: {
            type: String,
            required: true,
            enum: ["Mini Truck", "Pickup Truck", "14 Feet Truck", "17 Feet Truck", "20 Feet Truck"]
        },
        estimatedPrice: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Booking", bookingSchema);
