
import { useEffect, useState } from "react";
import API from "../services/api";

function Services() {
    const [serviceAreas, setServiceAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchServiceAreas = async () => {
            try {
                const response = await API.get("/service-areas");
                setServiceAreas(response.data);
            } catch (error) {
                setError("Unable to load service areas.");
            } finally {
                setLoading(false);
            }
        };

        fetchServiceAreas();
    }, []);

    return (
        <div className="services-page">
            <h1>Our Service Areas</h1>
            <p>Check the locations where MoveEase provides moving services.</p>

            {loading && <p>Loading service areas...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && serviceAreas.length === 0 && (
                <p>No service areas available at the moment.</p>
            )}

            <div className="service-list">
                {serviceAreas.map((area) => (
                    <div className="service-card" key={area._id}>
                        <h3>{area.areaName}</h3>
                        <p>{area.city}, {area.state}</p>
                        <p>Pincode: {area.pincode}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Services;
