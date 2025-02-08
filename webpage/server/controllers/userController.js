const User = require("../models/user");
const jwt = require("jsonwebtoken");

const submitPreferences = async (req, res) => {
    const { responses } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.json({ error: "User not found" });
        user.preferences = responses;
        await user.save();

        res.json(user.preferences);
    } catch (error) {
        res.json({ error: "Error saving preferences" });
    }
}

const getPreferences = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.json({ error: "User not found" });

        res.json(user.preferences);
    } catch (error) {
        res.json({ error: "Error retrieving preferences" });
    }
}

const authenticateUser = (req, res, next) => {
    try {
        // Check for Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header missing"
            });
        }

        // Check if it's a Bearer token
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({
                message: "Invalid authorization format"
            });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid or expired token"
                });
            }

            // Attach user info to request
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('Error in authentication:', error);
        res.status(500).json({
            message: "Server error during authentication"
        });
    }
};

module.exports = {
    submitPreferences,
    getPreferences,
    authenticateUser,
}