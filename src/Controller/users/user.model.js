import mongoose from "mongoose";

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    uid: String,
    picture: String,
    phone: String
})

module.exports = mongoose.model("User", userSchema, "users");