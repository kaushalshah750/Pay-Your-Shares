import splitTransactionModel from '../Controller/split-tranasaction/split-transaction.model'
import groupModel from '../Controller/groups/group.model'

async function getSplitTransactionsbyId(query){
    return await splitTransactionModel.findOne(query)
        .populate("paidUser_id")
        .populate("addedBy_id")
        .populate("split_between").sort({created_on: -1});
}

async function getSplitTransactions(transaction){
    var group = await groupModel.findOne({_id: transaction.group}).populate("members")
    var tranasactions = await splitTransactionModel.find({type: transaction.type, group_id: transaction.group})
        .populate("paidUser_id")
        .populate("addedBy_id")
        .populate("split_between").sort({created_on: -1});
    var payment = {
        group: group,
        transaction: tranasactions
    }
    return payment    
}

async function createSplitTransaction(data){
    var transaction = new splitTransactionModel(data)
    return await transaction.save();
}

async function deleteSplitTransaction(query){
    return await splitTransactionModel.findOneAndDelete(query)
}

module.exports = {createSplitTransaction, getSplitTransactions, deleteSplitTransaction, getSplitTransactionsbyId}