const express = require("express");
const { register, login, home } = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/home", verifyToken, home);

module.exports = router;
