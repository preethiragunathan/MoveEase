
import { Link } from "react-router-dom";

function Contact() {
    return (
        <div className="contact-page">

            <div className="contact-header">
                <h1>Contact Us</h1>
                <p>
                    Have questions about your move? We are here to help.
                    Get in touch with the MoveEase team.
                </p>
            </div>

            <div className="contact-container">

                <div className="contact-info">
                    <h2>Get In Touch</h2>
                    <p>
                        Contact us for moving assistance, service details
                        or booking-related questions.
                    </p>

                    <div className="contact-item">
                        <h3>Phone</h3>
                        <p>+91 98765 43210</p>
                    </div>

                    <div className="contact-item">
                        <h3>Email</h3>
                        <p>support@moveease.example</p>
                    </div>

                    <div className="contact-item">
                        <h3>Office Address</h3>
                        <p>
                            MoveEase Office,<br />
                            Technopark Road,<br />
                            Kazhakkoottam, Thiruvananthapuram,<br />
                            Kerala - 695581
                        </p>
                    </div>

                    <div className="contact-item">
                        <h3>Working Hours</h3>
                        <p>Monday - Saturday</p>
                        <p>9:00 AM - 6:00 PM</p>
                    </div>
                </div>

                <div className="contact-action">
                    <h2>Need a Moving Quote?</h2>
                    <p>
                        Tell us about your moving requirements.
                        Our team will review your inquiry and get in touch.
                    </p>

                    <Link to="/inquiry" className="contact-inquiry-btn">
                        Submit an Inquiry
                    </Link>

                    <p className="contact-note">
                        You can also book an available moving vehicle directly
                        through our website.
                    </p>

                    <Link to="/booking" className="contact-booking-link">
                        Book a Vehicle
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Contact;
