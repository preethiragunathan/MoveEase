
import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminDetails");

        navigate("/admin");
    };

    return (
        <nav className="admin-navbar">

            <h2>MoveEase Admin</h2>

            <div className="admin-navbar-links">
                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="/admin/service-areas">Service Areas</Link>
                <Link to="/admin/vehicles">Vehicles</Link>
                <Link to="/admin/inquiries">Inquiries</Link>
                <Link to="/admin/bookings">Bookings</Link>

                <button
                    className="admin-logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

        </nav>
    );
}

export default AdminNavbar;
