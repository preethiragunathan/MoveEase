
import { useState } from "react";
import API from "../services/api";

function Booking() {
    const today = new Date().toLocaleDateString("en-CA");
    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        phone: "",
        pickupAddress: "",
        destinationAddress: "",
        movingDate: "",
        vehicleType: "",
        estimatedPrice: 0
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/bookings", formData);

            setMessage(
                response.data.message || "Booking submitted successfully!"
            );

            setFormData({
                customerName: "",
                email: "",
                phone: "",
                pickupAddress: "",
                destinationAddress: "",
                movingDate: "",
                vehicleType: "",
                estimatedPrice: 0
            });
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to submit booking."
            );
        }
    };

    return (
        <div className="form-page">
            <h1>Book Your Moving Vehicle</h1>
            <p>Fill in your details to book a vehicle.</p>

            <form onSubmit={handleSubmit} className="inquiry-form">
                <input
                    type="text"
                    name="customerName"
                    placeholder="Your Name"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="pickupAddress"
                    placeholder="Pickup Address"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="destinationAddress"
                    placeholder="Destination Address"
                    value={formData.destinationAddress}
                    onChange={handleChange}
                    required
                />

                <label>Moving Date</label>
                <input
                    type="date"
                    name="movingDate"
                    value={formData.movingDate}
                    onChange={handleChange}
                    min={today}
                    required
                />

                <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Vehicle Type</option>
                    <option value="Mini Truck">Mini Truck</option>
                    <option value="Pickup Truck">Pickup Truck</option>
                    <option value="14 Feet Truck">14 Feet Truck</option>
                    <option value="17 Feet Truck">17 Feet Truck</option>
                    <option value="20 Feet Truck">20 Feet Truck</option>
                </select>

                <button type="submit">Submit Booking</button>
            </form>

            {message && <p className="form-message">{message}</p>}
        </div>
    );
}

export default Booking;
