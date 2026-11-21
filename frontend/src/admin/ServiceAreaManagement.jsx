
import { useEffect, useState } from "react";
import API from "../services/api";
import AdminNavbar from "./AdminNavbar";

function ServiceAreaManagement() {
    const [serviceAreas, setServiceAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        areaName: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [editLoading, setEditLoading] = useState(false);

    const fetchServiceAreas = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await API.get("/service-areas");
            setServiceAreas(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load service areas."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServiceAreas();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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

            let response;

            if (editingId) {
                response = await API.put(
                    `/service-areas/${editingId}`,
                    formData,
                    config
                );
            } else {
                response = await API.post(
                    "/service-areas",
                    formData,
                    config
                );
            }

            setMessage(response.data.message || "Service area saved successfully.");

            setFormData({
                areaName: "",
                city: "",
                state: "",
                pincode: ""
            });

            setEditingId(null);

            await fetchServiceAreas();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to save service area."
            );
        } finally {
            setSubmitting(false);
        }
    };


    const handleEdit = (area) => {
        setEditingId(area._id);

        setFormData({
            areaName: area.areaName,
            city: area.city,
            state: area.state,
            pincode: area.pincode
        });

        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this service area?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setError("");
            setMessage("");

            const token = localStorage.getItem("adminToken");

            const response = await API.delete(
                `/service-areas/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(
                response.data.message || "Service area deleted successfully."
            );

            if (editingId === id) {
                handleCancelEdit();
            }

            await fetchServiceAreas();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete service area."
            );
        }
    };


    const handleToggleStatus = async (area) => {
        try {
            setError("");
            setMessage("");

            const token = localStorage.getItem("adminToken");

            const response = await API.put(
                `/service-areas/${area._id}`,
                {
                    isActive: !area.isActive
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(
                response.data.message || "Service area status updated successfully."
            );

            await fetchServiceAreas();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update service area status."
            );
        }
    };


    const handleCancelEdit = () => {
        setEditingId(null);

        setFormData({
            areaName: "",
            city: "",
            state: "",
            pincode: ""
        });

        setMessage("");
        setError("");
    };


    return (
        <>
            <AdminNavbar />
            <div className="admin-management-page">

                <h1>Service Area Management</h1>
                <p>View and manage MoveEase service locations.</p>

                {/* Add Service Area Form */}
                <div className="admin-form-card">
                    <h2>{editingId ? "Edit Service Area" : "Add New Service Area"}</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="admin-form-grid">

                            <input
                                type="text"
                                name="areaName"
                                placeholder="Area Name"
                                value={formData.areaName}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                pattern="[0-9]{6}"
                                title="Enter a valid 6-digit pincode"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="admin-submit-btn"
                            disabled={submitting}
                        >
                            {submitting
                                ? "Saving..."
                                : editingId
                                    ? "Update Service Area"
                                    : "Add Service Area"}
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
                    </form>
                </div>

                {message && (
                    <p className="success-message">{message}</p>
                )}

                {error && (
                    <p className="error-message">{error}</p>
                )}

                {/* Existing Service Areas */}
                <h2 className="admin-section-title">
                    Existing Service Areas
                </h2>

                {loading && <p>Loading service areas...</p>}

                {!loading && !error && serviceAreas.length === 0 && (
                    <p>No service areas found.</p>
                )}

                <div className="admin-service-area-list">
                    {serviceAreas.map((area) => (
                        <div
                            className="admin-service-area-card"
                            key={area._id}
                        >
                            <h3>{area.areaName}</h3>
                            <p>{area.city}, {area.state}</p>
                            <p>Pincode: {area.pincode}</p>
                            <p>
                                Status: {area.isActive ? "Active" : "Inactive"}
                            </p>
                            <button
                                className="admin-edit-btn"
                                onClick={() => handleEdit(area)}
                            >
                                Edit
                            </button>
                            <button
                                className="admin-delete-btn"
                                onClick={() => handleDelete(area._id)}
                            >
                                Delete
                            </button>

                            <button
                                className={
                                    area.isActive
                                        ? "admin-status-btn deactivate-btn"
                                        : "admin-status-btn activate-btn"
                                }
                                onClick={() => handleToggleStatus(area)}
                            >
                                {area.isActive ? "Deactivate" : "Activate"}
                            </button>

                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}

export default ServiceAreaManagement;
