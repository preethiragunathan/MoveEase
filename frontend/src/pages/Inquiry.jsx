
import { useState } from "react";
import API from "../services/api";

function Inquiry() {
    const today = new Date().toLocaleDateString("en-CA");
    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        phone: "",
        pickupAddress: "",
        destinationAddress: "",
        movingDate: "",
        houseType: "",
        additionalDetails: ""
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
            const response = await API.post("/inquiries", formData);
            setMessage(response.data.message || "Inquiry submitted successfully!");

            setFormData({
                customerName: "",
                email: "",
                phone: "",
                pickupAddress: "",
                destinationAddress: "",
                movingDate: "",
                houseType: "",
                additionalDetails: ""
            });
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to submit inquiry."
            );
        }
    };

    return (
        <div className="form-page">
            <h1>Get a Free Moving Quote</h1>
            <p>Share your moving details and we'll get back to you.</p>

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
                    name="houseType"
                    value={formData.houseType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select House Type</option>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                </select>

                <textarea
                    name="additionalDetails"
                    placeholder="Additional Details (Optional)"
                    value={formData.additionalDetails}
                    onChange={handleChange}
                />

                <button type="submit">Submit Inquiry</button>
            </form>

            {message && <p className="form-message">{message}</p>}
        </div>
    );
}

export default Inquiry;
