import mongoose from "mongoose";

var TransactionSettlementSchema = new mongoose.Schema({
    type: String,
    amount: Number,
    settleBy_User: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    settleTo_User: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    addedBy_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    group_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Group'
    },
    payment_date: Date,
    created_on: Date,
    updated_on: Date
})

module.exports = mongoose.model("TransactionSettlement", TransactionSettlementSchema, "transaction_settlement");

// .populate(
//     {
//         path: 'group_id',
//         populate: [
//             {
//                 path: "admin"
//             },
//             {
//                 path: "members"
//             }
//         ]
//     }
// )