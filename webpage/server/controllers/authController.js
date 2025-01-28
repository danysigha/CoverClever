const User = require("../models/user")
const { hashPassword, comparePassword } = require("../helpers/authHelpers");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
    res.json("test is working");
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                error: "No user found"
            })
        }
        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie("token", token).json(user);
            })
        } else {
            res.json({
                error: "Password does not match"
            })
        }
    } catch (err) {
        console.log(err);
    }
}

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (!name) {
            return res.json({
                error: "Name is required"
            })
        }
        if (!password) {
            return res.json({
                error: "Password is required"
            })
        }
        const exists = await User.findOne({email});
        if (exists) {
            return res.json({
                error: "Email is already registered"
            })
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        return res.json(user);
    } catch (err) {
        console.log(err)
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        })
    } else {
        res.json(null);
    }
}

module.exports = {
    test,
    loginUser,
    registerUser,
    getProfile,
}