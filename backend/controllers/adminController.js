
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Admin
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, setupKey } = req.body;

        // Verify the secret setup key
        if (!process.env.ADMIN_SETUP_KEY || setupKey !== process.env.ADMIN_SETUP_KEY) {
            return res.status(403).json({
                message: "Unauthorized admin registration"
            });
        }

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide name, email and password"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            });
        }

        const existingAdmin = await Admin.findOne({
            email: email.toLowerCase().trim()
        });

        if (existingAdmin) {
            return res.status(409).json({
                message: "Admin already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Admin registered successfully",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Admin Login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        const admin = await Admin.findOne({
            email: email.toLowerCase().trim()
        });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                role: admin.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin
};
