import splitTransactionModel from '../Controller/split-tranasaction/split-transaction.model'

async function getSplitTransactionsbyId(query){
    return await splitTransactionModel.find(query)
        .populate("paidUser_id")
        .populate("addedBy_id")
        .populate("split_between").sort({created_on: -1});
}

async function getSplitTransactions(query){
    return await splitTransactionModel.find(query)
        .populate("paidUser_id")
        .populate("addedBy_id")
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
        .populate("split_between").sort({created_on: -1});
}

async function createSplitTransaction(data){
    var transaction = new splitTransactionModel(data)
    return await transaction.save();
}

async function deleteSplitTransaction(query){
    return await splitTransactionModel.findOneAndDelete(query)
}

module.exports = {createSplitTransaction, getSplitTransactions, deleteSplitTransaction, getSplitTransactionsbyId}