const express = require("express");
const router = express.Router();
const cors = require("cors");
const { test, loginUser, registerUser, getProfile } = require("../controllers/authController");

// Middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", test);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", getProfile);

module.exports = router;
