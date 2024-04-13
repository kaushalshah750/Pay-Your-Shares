import mongoose from "mongoose";

var groupSchema = new mongoose.Schema({
    name: String,
    description: String,
    admin: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    members: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    created_on: Date,
    updated_on: Date
})

module.exports = mongoose.model("Group", groupSchema, "groups")