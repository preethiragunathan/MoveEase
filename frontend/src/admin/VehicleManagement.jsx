
import { useEffect, useState } from "react";
import API from "../services/api";
import AdminNavbar from "./AdminNavbar";

function VehicleManagement() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const initialFormData = {
        vehicleName: "",
        vehicleType: "Mini Truck",
        capacity: "",
        pricePerKm: "",
        image: "",
        isAvailable: true
    };

    const [formData, setFormData] = useState(initialFormData);

    const fetchVehicles = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await API.get("/vehicles");
            setVehicles(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load vehicles."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            setError("");
            setMessage("");

            const token = localStorage.getItem("adminToken");

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const payload = {
                ...formData,
                pricePerKm: Number(formData.pricePerKm)
            };

            let response;

            if (editingId) {
                response = await API.put(
                    `/vehicles/${editingId}`,
                    payload,
                    config
                );
            } else {
                response = await API.post(
                    "/vehicles",
                    payload,
                    config
                );
            }

            setMessage(
                response.data.message ||
                "Vehicle saved successfully."
            );

            setFormData(initialFormData);
            setEditingId(null);

            await fetchVehicles();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to save vehicle."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (vehicle) => {
        setEditingId(vehicle._id);

        setFormData({
            vehicleName: vehicle.vehicleName || "",
            vehicleType: vehicle.vehicleType || "Mini Truck",
            capacity: vehicle.capacity || "",
            pricePerKm: vehicle.pricePerKm ?? "",
            image: vehicle.image || "",
            isAvailable: vehicle.isAvailable
        });

        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData(initialFormData);
        setMessage("");
        setError("");
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this vehicle?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setError("");
            setMessage("");

            const token = localStorage.getItem("adminToken");

            const response = await API.delete(
                `/vehicles/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(
                response.data.message ||
                "Vehicle deleted successfully."
            );

            if (editingId === id) {
                handleCancelEdit();
            }

            await fetchVehicles();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete vehicle."
            );
        }
    };

    const handleToggleAvailability = async (vehicle) => {
        try {
            setError("");
            setMessage("");

            const token = localStorage.getItem("adminToken");

            const response = await API.put(
                `/vehicles/${vehicle._id}`,
                {
                    isAvailable: !vehicle.isAvailable
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(
                response.data.message ||
                "Vehicle availability updated successfully."
            );

            await fetchVehicles();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update vehicle availability."
            );
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="admin-management-page">

                <h1>Vehicle Management</h1>
                <p>Add, update and manage MoveEase vehicles.</p>

                {/* Add / Edit Vehicle Form */}
                <div className="admin-form-card">
                    <h2>
                        {editingId ? "Edit Vehicle" : "Add New Vehicle"}
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="admin-form-grid">

                            <input
                                type="text"
                                name="vehicleName"
                                placeholder="Vehicle Name"
                                value={formData.vehicleName}
                                onChange={handleChange}
                                required
                            />

                            <select
                                name="vehicleType"
                                value={formData.vehicleType}
                                onChange={handleChange}
                                required
                            >
                                <option value="Mini Truck">Mini Truck</option>
                                <option value="Pickup Truck">Pickup Truck</option>
                                <option value="14 Feet Truck">14 Feet Truck</option>
                                <option value="17 Feet Truck">17 Feet Truck</option>
                                <option value="20 Feet Truck">20 Feet Truck</option>
                            </select>

                            <input
                                type="text"
                                name="capacity"
                                placeholder="Capacity (e.g. 750 kg)"
                                value={formData.capacity}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="number"
                                name="pricePerKm"
                                placeholder="Price Per KM (₹)"
                                value={formData.pricePerKm}
                                onChange={handleChange}
                                min="0"
                                required
                            />

                            <input
                                type="url"
                                name="image"
                                placeholder="Vehicle Image URL (optional)"
                                value={formData.image}
                                onChange={handleChange}
                            />

                        </div>

                        <label className="admin-availability-label">
                            <input
                                type="checkbox"
                                name="isAvailable"
                                checked={formData.isAvailable}
                                onChange={handleChange}
                            />
                            Vehicle is available for booking
                        </label>

                        <div className="admin-form-actions">
                            <button
                                type="submit"
                                className="admin-submit-btn"
                                disabled={submitting}
                            >
                                {submitting
                                    ? "Saving..."
                                    : editingId
                                        ? "Update Vehicle"
                                        : "Add Vehicle"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    className="admin-cancel-btn"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>

                    </form>
                </div>

                {message && (
                    <p className="success-message">{message}</p>
                )}

                {error && (
                    <p className="error-message">{error}</p>
                )}

                {/* Vehicle List */}
                <h2 className="admin-section-title">
                    Existing Vehicles
                </h2>

                {loading && <p>Loading vehicles...</p>}

                {!loading && !error && vehicles.length === 0 && (
                    <p>No vehicles found.</p>
                )}

                <div className="admin-vehicle-list">

                    {vehicles.map((vehicle) => (
                        <div
                            className="admin-vehicle-card"
                            key={vehicle._id}
                        >

                            {vehicle.image && (
                                <img
                                    src={vehicle.image}
                                    alt={vehicle.vehicleName}
                                    className="admin-vehicle-image"
                                />
                            )}

                            <h3>{vehicle.vehicleName}</h3>

                            <p>Type: {vehicle.vehicleType}</p>
                            <p>Capacity: {vehicle.capacity}</p>
                            <p>Price per KM: ₹{vehicle.pricePerKm}</p>

                            <p>
                                Status:{" "}
                                <strong className={
                                    vehicle.isAvailable
                                        ? "available-text"
                                        : "unavailable-text"
                                }>
                                    {vehicle.isAvailable
                                        ? "Available"
                                        : "Unavailable"}
                                </strong>
                            </p>

                            <div className="admin-vehicle-actions">

                                <button
                                    className="admin-edit-btn"
                                    onClick={() => handleEdit(vehicle)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="admin-delete-btn"
                                    onClick={() => handleDelete(vehicle._id)}
                                >
                                    Delete
                                </button>

                                <button
                                    className={
                                        vehicle.isAvailable
                                            ? "admin-status-btn deactivate-btn"
                                            : "admin-status-btn activate-btn"
                                    }
                                    onClick={() =>
                                        handleToggleAvailability(vehicle)
                                    }
                                >
                                    {vehicle.isAvailable
                                        ? "Mark Unavailable"
                                        : "Mark Available"}
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </>
    );
}

export default VehicleManagement;
