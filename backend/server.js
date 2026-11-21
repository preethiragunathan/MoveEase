
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const customerRoutes = require("./routes/customerRoutes");
const serviceAreaRoutes = require("./routes/serviceAreaRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/customers", customerRoutes);
app.use("/api/service-areas", serviceAreaRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/admin", adminRoutes);

// Test API
app.get("/", (req, res) => {
    res.send("Moving Company API is running!");
});

// Start server after database connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
