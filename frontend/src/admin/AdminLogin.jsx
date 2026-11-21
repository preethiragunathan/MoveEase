
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");

            const response = await API.post("/admin/login", {
                email,
                password
            });

            // Store JWT token
            localStorage.setItem("adminToken", response.data.token);

            // Store admin details
            localStorage.setItem(
                "adminDetails",
                JSON.stringify(response.data.admin)
            );

            setMessage("Login successful!");

            // Navigate to dashboard (we will create this page next)
            navigate("/admin/dashboard");

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <h1>Admin Login</h1>
                <p>Sign in to manage MoveEase</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {message && (
                    <p className="admin-message">{message}</p>
                )}
            </div>
        </div>
    );
}

export default AdminLogin;
