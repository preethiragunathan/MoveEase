
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Services from "./pages/Services";
import Inquiry from "./pages/Inquiry";
import Vehicles from "./pages/Vehicles";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import ServiceAreaManagement from "./admin/ServiceAreaManagement";
import VehicleManagement from "./admin/VehicleManagement";
import InquiryManagement from "./admin/InquiryManagement";
import BookingManagement from "./admin/BookingManagement";



function Home() {
    return (
        <div className="home-page">

            {/* Hero Section */}
            <section className="home">
                <div className="home-content">
                    <span className="home-tagline">
                        YOUR TRUSTED MOVING PARTNER
                    </span>

                    <h1>
                        Make Your Move Easy with <span>MoveEase</span>
                    </h1>

                    <p>
                        Reliable and affordable packing and moving services.
                        We make your relocation simple, safe and stress-free.
                        Let us take care of your move while you focus on
                        your new beginning.
                    </p>

                    <div className="home-buttons">
                        <Link to="/inquiry" className="home-btn">
                            Get a Free Quote
                        </Link>

                        <Link to="/booking" className="home-btn secondary-btn">
                            Book a Vehicle
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Highlights */}
            <section className="home-services">
                <div className="home-section-heading">
                    <h2>Our Moving Services</h2>
                    <p>Everything you need for a smooth relocation.</p>
                </div>

                <div className="home-service-cards">
                    <div className="home-service-card">
                        <div className="home-service-icon">📦</div>
                        <h3>Home Relocation</h3>
                        <p>
                            Safe and reliable moving solutions for your
                            household belongings.
                        </p>
                    </div>

                    <div className="home-service-card">
                        <div className="home-service-icon">🏢</div>
                        <h3>Office Relocation</h3>
                        <p>
                            Convenient moving services to help your business
                            relocate smoothly.
                        </p>
                    </div>

                    <div className="home-service-card">
                        <div className="home-service-icon">🚚</div>
                        <h3>Vehicle Booking</h3>
                        <p>
                            Choose from available moving vehicles according
                            to your transportation needs.
                        </p>
                    </div>
                </div>

                <div className="home-services-link">
                    <Link to="/services">Explore Our Service Areas →</Link>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="why-moveease">
                <div className="home-section-heading">
                    <h2>Why Choose MoveEase?</h2>
                    <p>Making every move easier and more convenient.</p>
                </div>

                <div className="why-moveease-grid">
                    <div>
                        <h3>✓ Reliable Service</h3>
                        <p>
                            We focus on making your moving experience
                            dependable and hassle-free.
                        </p>
                    </div>

                    <div>
                        <h3>✓ Affordable Pricing</h3>
                        <p>
                            Get moving solutions that suit your requirements
                            and budget.
                        </p>
                    </div>

                    <div>
                        <h3>✓ Easy Booking</h3>
                        <p>
                            Submit an inquiry or book an available vehicle
                            through our website.
                        </p>
                    </div>
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="home-cta">
                <h2>Planning Your Next Move?</h2>
                <p>Let MoveEase make your relocation easier.</p>

                <Link to="/inquiry" className="home-btn">
                    Get Started Today
                </Link>
            </section>

        </div>
    );
}


function PublicLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>

            <Routes>
                {/* Public routes with Navbar */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/inquiry" element={<Inquiry />} />
                    <Route path="/vehicles" element={<Vehicles />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/contact" element={<Contact />} />
                </Route>

                {/* Admin routes without public Navbar */}
                <Route path="/admin" element={<AdminLogin />} />

                <Route element={<AdminProtectedRoute />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/service-areas" element={<ServiceAreaManagement />} />
                    <Route
                        path="/admin/vehicles"
                        element={<VehicleManagement />}
                    />
                    <Route
                        path="/admin/inquiries"
                        element={<InquiryManagement />}
                    />
                    <Route
                        path="/admin/bookings"
                        element={<BookingManagement />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
