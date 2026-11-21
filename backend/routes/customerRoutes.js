
const express = require("express");
const router = express.Router();

const Customer = require("../models/Customer");

// API to add a new customer
router.post("/", async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        const customer = new Customer({
            name,
            email,
            phone,
            address
        });

        const savedCustomer = await customer.save();

        res.status(201).json({
            message: "Customer added successfully",
            customer: savedCustomer
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add customer",
            error: error.message
        });
    }
});

// API to get all customers
router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find().sort({ createdAt: -1 });

        res.status(200).json(customers);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch customers",
            error: error.message
        });
    }
});

module.exports = router;
