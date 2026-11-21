
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

function AdminDashboard() {
    const navigate = useNavigate();

    const adminDetails = JSON.parse(
        localStorage.getItem("adminDetails") || "{}"
    );

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminDetails");
        navigate("/admin");
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-dashboard-header">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Welcome, {adminDetails.name || "Admin"}!</p>
                </div>

                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="admin-dashboard-content">
                <h2>MoveEase Management</h2>
                <p>
                    Manage your service areas, vehicles,
                    customer inquiries and bookings from here.
                </p>


                <div className="admin-dashboard-cards">

                    <Link to="/admin/service-areas" className="admin-card">
                        <h3>Service Areas</h3>
                        <p>Manage available service locations.</p>
                    </Link>

                    <Link to="/admin/vehicles" className="admin-card">
                        <h3>Vehicles</h3>
                        <p>Manage moving vehicles.</p>
                    </Link>

                    <Link to="/admin/inquiries" className="admin-card">
                        <h3>Inquiries</h3>
                        <p>View and manage customer inquiries.</p>
                    </Link>

                    <Link to="/admin/bookings" className="admin-card">
                        <h3>Bookings</h3>
                        <p>View and manage customer bookings.</p>
                    </Link>

                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;
