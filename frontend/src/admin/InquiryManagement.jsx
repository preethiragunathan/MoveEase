
import { useEffect, useState } from "react";
import API from "../services/api";
import AdminNavbar from "./AdminNavbar";

function InquiryManagement() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    const fetchInquiries = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await API.get("/inquiries");
            setInquiries(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load inquiries."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleUpdate = async (inquiry) => {
        try {
            setUpdatingId(inquiry._id);
            setError("");
            setMessage("");

            const token = localStorage.getItem("adminToken");

            const response = await API.put(
                `/inquiries/${inquiry._id}`,
                {
                    status: inquiry.status,
                    estimatedPrice: Number(inquiry.estimatedPrice)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(
                response.data.message ||
                "Inquiry updated successfully."
            );

            await fetchInquiries();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update inquiry."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const handleFieldChange = (id, field, value) => {
        setInquiries((previousInquiries) =>
            previousInquiries.map((inquiry) =>
                inquiry._id === id
                    ? { ...inquiry, [field]: value }
                    : inquiry
            )
        );
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this inquiry?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setError("");
            setMessage("");

            const token = localStorage.getItem("adminToken");

            const response = await API.delete(
                `/inquiries/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(
                response.data.message ||
                "Inquiry deleted successfully."
            );

            await fetchInquiries();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete inquiry."
            );
        }
    };

    return (
        <>
        <AdminNavbar />
        <div className="admin-management-page">

            <h1>Inquiry Management</h1>
            <p>View customer inquiries and manage quotations.</p>

            {message && (
                <p className="success-message">{message}</p>
            )}

            {error && (
                <p className="error-message">{error}</p>
            )}

            <h2 className="admin-section-title">
                Customer Inquiries ({inquiries.length})
            </h2>

            {loading && <p>Loading inquiries...</p>}

            {!loading && !error && inquiries.length === 0 && (
                <p>No customer inquiries found.</p>
            )}

            <div className="admin-inquiry-list">

                {inquiries.map((inquiry) => (
                    <div
                        className="admin-inquiry-card"
                        key={inquiry._id}
                    >

                        <div className="admin-inquiry-header">
                            <h3>{inquiry.customerName}</h3>

                            <span className={`inquiry-status ${inquiry.status?.toLowerCase()}`}>
                                {inquiry.status}
                            </span>
                        </div>

                        <div className="admin-inquiry-details">

                            <p><strong>Email:</strong> {inquiry.email}</p>
                            <p><strong>Phone:</strong> {inquiry.phone}</p>
                            <p><strong>Pickup:</strong> {inquiry.pickupAddress}</p>
                            <p><strong>Destination:</strong> {inquiry.destinationAddress}</p>
                            <p>
                                <strong>Moving Date:</strong>{" "}
                                {inquiry.movingDate
                                    ? new Date(inquiry.movingDate).toLocaleDateString()
                                    : "Not specified"}
                            </p>
                            <p><strong>Property Type:</strong> {inquiry.houseType}</p>

                            {inquiry.additionalDetails && (
                                <p>
                                    <strong>Additional Details:</strong>{" "}
                                    {inquiry.additionalDetails}
                                </p>
                            )}

                        </div>

                        <div className="admin-inquiry-controls">

                            <div>
                                <label>Status</label>

                                <select
                                    value={inquiry.status}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            inquiry._id,
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Quoted">Quoted</option>
                                    <option value="Converted">Converted</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            <div>
                                <label>Estimated Price (₹)</label>

                                <input
                                    type="number"
                                    min="0"
                                    value={inquiry.estimatedPrice ?? 0}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            inquiry._id,
                                            "estimatedPrice",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                        </div>

                        <div className="admin-inquiry-actions">

                            <button
                                className="admin-submit-btn"
                                onClick={() => handleUpdate(inquiry)}
                                disabled={updatingId === inquiry._id}
                            >
                                {updatingId === inquiry._id
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                            <button
                                className="admin-delete-btn"
                                onClick={() => handleDelete(inquiry._id)}
                            >
                                Delete Inquiry
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </div>
        </>
    );
}

export default InquiryManagement;
