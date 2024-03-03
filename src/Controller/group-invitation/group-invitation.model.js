import mongoose from "mongoose"

var groupinviteSchema = mongoose.Schema({
    email:String,
    invite_uid: String,
    invited_by: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    group_uid: String,
    subject:String,
    body: String
})

module.exports = mongoose.model("GroupInvite", groupinviteSchema, "group-invitation")