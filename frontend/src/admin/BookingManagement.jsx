
import { useEffect, useState } from "react";
import API from "../services/api";
import AdminNavbar from "./AdminNavbar";

function BookingManagement() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await API.get("/bookings");
            setBookings(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load bookings."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleFieldChange = (id, field, value) => {
        setBookings((previousBookings) =>
            previousBookings.map((booking) =>
                booking._id === id
                    ? { ...booking, [field]: value }
                    : booking
            )
        );
    };

    const handleUpdate = async (booking) => {
        try {
            setUpdatingId(booking._id);
            setError("");
            setMessage("");

            const token = localStorage.getItem("adminToken");

            const response = await API.put(
                `/bookings/${booking._id}`,
                {
                    status: booking.status,
                    estimatedPrice: Number(booking.estimatedPrice)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(
                response.data.message ||
                "Booking updated successfully."
            );

            await fetchBookings();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update booking."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this booking?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setError("");
            setMessage("");

            const token = localStorage.getItem("adminToken");

            const response = await API.delete(
                `/bookings/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(
                response.data.message ||
                "Booking deleted successfully."
            );

            await fetchBookings();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete booking."
            );
        }
    };

    return (
        <>
        <AdminNavbar />
        <div className="admin-management-page">

            <h1>Booking Management</h1>
            <p>View and manage customer vehicle bookings.</p>

            {message && (
                <p className="success-message">{message}</p>
            )}

            {error && (
                <p className="error-message">{error}</p>
            )}

            <h2 className="admin-section-title">
                Customer Bookings ({bookings.length})
            </h2>

            {loading && <p>Loading bookings...</p>}

            {!loading && !error && bookings.length === 0 && (
                <p>No customer bookings found.</p>
            )}

            <div className="admin-booking-list">

                {bookings.map((booking) => (
                    <div
                        className="admin-booking-card"
                        key={booking._id}
                    >

                        <div className="admin-booking-header">
                            <h3>{booking.customerName}</h3>

                            <span className={`booking-status ${booking.status?.toLowerCase().replace(/\s+/g, "-")}`}>
                                {booking.status}
                            </span>
                        </div>

                        <div className="admin-booking-details">

                            <p><strong>Email:</strong> {booking.email}</p>
                            <p><strong>Phone:</strong> {booking.phone}</p>
                            <p><strong>Pickup:</strong> {booking.pickupAddress}</p>
                            <p><strong>Destination:</strong> {booking.destinationAddress}</p>

                            <p>
                                <strong>Moving Date:</strong>{" "}
                                {booking.movingDate
                                    ? new Date(booking.movingDate).toLocaleDateString()
                                    : "Not specified"}
                            </p>

                            <p><strong>Vehicle Type:</strong> {booking.vehicleType}</p>

                        </div>

                        <div className="admin-booking-controls">

                            <div>
                                <label>Booking Status</label>

                                <select
                                    value={booking.status}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            booking._id,
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div>
                                <label>Estimated Price (₹)</label>

                                <input
                                    type="number"
                                    min="0"
                                    value={booking.estimatedPrice ?? 0}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            booking._id,
                                            "estimatedPrice",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                        </div>

                        <div className="admin-booking-actions">

                            <button
                                className="admin-submit-btn"
                                onClick={() => handleUpdate(booking)}
                                disabled={updatingId === booking._id}
                            >
                                {updatingId === booking._id
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                            <button
                                className="admin-delete-btn"
                                onClick={() => handleDelete(booking._id)}
                            >
                                Delete Booking
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </div>
        </>
    );
}

export default BookingManagement;
