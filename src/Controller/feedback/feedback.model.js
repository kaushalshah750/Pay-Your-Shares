import mongoose from "mongoose";

var feedbackSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    feedback: String,
    created_on: Date
})

module.exports = mongoose.model("Feedback", feedbackSchema, "feedbacks")