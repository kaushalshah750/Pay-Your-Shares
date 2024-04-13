import mongoose from "mongoose";

var emailSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    body: String,
    subject: String,
})

module.exports = mongoose.model("Email", emailSchema, "split-transaction-email")