
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h2>MoveEase</h2>

            <div>
                <Link to="/">Home</Link>
                {" | "}
                <Link to="/services">Services</Link>
                {" | "}
                <Link to="/inquiry">Get a Quote</Link>
                {" | "}
                <Link to="/vehicles">Vehicles</Link>
                {" | "}
                <Link to="/booking">Book Now</Link>
                {" | "}
                <Link to="/contact">Contact Us</Link>
            </div>
        </nav>
    );
}

export default Navbar;
