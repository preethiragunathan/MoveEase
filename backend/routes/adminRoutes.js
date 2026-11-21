
const express = require("express");
const router = express.Router();

const {
    registerAdmin,
    loginAdmin
} = require("../controllers/adminController");

const protectAdmin = require("../middleware/authMiddleware");
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", protectAdmin, (req, res) => {
    res.status(200).json({
        message: "Admin access granted",
        admin: req.admin
    });
});


module.exports = router;
