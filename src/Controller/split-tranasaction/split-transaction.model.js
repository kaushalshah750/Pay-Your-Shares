import mongoose from "mongoose";

var splitTransactionSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    paidUser_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    addedBy_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    group_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Group"
    },
    split_between: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    payment_date: Date,
    created_on: Date,
    updated_on: Date
})

module.exports = mongoose.model("SplitTransaction", splitTransactionSchema, "split_transactions");