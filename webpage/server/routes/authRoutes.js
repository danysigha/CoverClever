const express = require("express");
const router = express.Router();
const cors = require("cors");
const { loginUser, registerUser, getProfile } = require("../controllers/authController");
const { submitPreferences, getPreferences, authenticateUser} = require("../controllers/userController");

// Middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", getProfile);
router.post("/preferences", authenticateUser, submitPreferences)
router.get("/preferences", authenticateUser, getPreferences)

module.exports = router;
