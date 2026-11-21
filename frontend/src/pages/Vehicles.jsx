
import { useEffect, useState } from "react";
import API from "../services/api";

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await API.get("/vehicles/available");
                setVehicles(response.data);
            } catch (error) {
                setError("Unable to load available vehicles.");
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    return (
        <div className="vehicles-page">
            <h1>Our Available Vehicles</h1>
            <p>Choose a suitable vehicle for your moving requirements.</p>

            {loading && <p>Loading vehicles...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && vehicles.length === 0 && (
                <p>No vehicles available at the moment.</p>
            )}

            <div className="vehicle-list">
                {vehicles.map((vehicle) => (
                    <div className="vehicle-card" key={vehicle._id}>
                        <h3>{vehicle.vehicleName}</h3>
                        <p>Type: {vehicle.vehicleType}</p>
                        <p>Capacity: {vehicle.capacity}</p>
                        <p>Price per km: ₹{vehicle.pricePerKm}</p>
                        <p className="available-status">Available</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Vehicles;
