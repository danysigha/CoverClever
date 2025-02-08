const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    preferences: { type: Object, default: {} }
})

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;