import mongoose from "mongoose";

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    uid: String,
    picture: String,
    phone: String,
    registered_on: Date,
    last_login: String
})

module.exports = mongoose.model("User", userSchema, "users");