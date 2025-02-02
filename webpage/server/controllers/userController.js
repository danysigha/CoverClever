const User = require("../models/user");
const jwt = require("jsonwebtoken");

const submitPreferences = async (req, res) => {
    const { responses } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.json({ error: "User not found" });
        user.preferences = responses;
        await user.save();

        res.json({ message: "Preferences saved successfully!" });
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
        const {token} = req.cookies;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
                if (err) throw err;
                req.user = user;
                next();
            })
        } else {
            res.json(null);
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    submitPreferences,
    getPreferences,
    authenticateUser,
}