
const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
    {
        vehicleName: {
            type: String,
            required: true,
            trim: true
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [
                "Mini Truck",
                "Pickup Truck",
                "14 Feet Truck",
                "17 Feet Truck",
                "20 Feet Truck"
            ]
        },
        capacity: {
            type: String,
            required: true,
            trim: true
        },
        pricePerKm: {
            type: Number,
            required: true,
            min: 0
        },
        isAvailable: {
            type: Boolean,
            default: true
        },
        image: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
