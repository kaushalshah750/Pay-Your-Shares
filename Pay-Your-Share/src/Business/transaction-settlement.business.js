import transactionSettlementModel from '../Controller/transaction-settlement/transaction-settlement.model'
import groupModel from '../Controller/groups/group.model'
import userModel from '../Controller/users/user.model'

async function getTransactionsSummary(user_uid, transaction){
    var group = await groupModel.findOne({_id: transaction.group})
    var user = await userModel.findOne({uid: user_uid})
    var tranasactions = await transactionSettlementModel.find({type: transaction.type, group_id: transaction.group})
        .populate("settleBy_User")
        .populate("settleTo_User")
        .populate("addedBy_id")
        .populate("group_id").sort({created_on: -1});
    var payment = {
        group: group,
        transaction: tranasactions
    }
    return payment
}

async function settleTransaction(user_uid, transaction){
    var current_user = await userModel.findOne({uid: user_uid})
    var data = {
        type: "Settlement",
        amount: transaction.amount,
        settleBy_User: transaction.action == "Me" ? transaction.settleTo_User : current_user._id,
        settleTo_User: transaction.action == "Me" ? current_user._id : transaction.settleTo_User,
        addedBy_id: current_user._id,
        group_id: transaction.group_id,
        payment_date: transaction.payment_date,
        created_on: transaction.created_on,
        updated_on: transaction.updated_on
    }
    var transactionSettlement = new transactionSettlementModel(data)
    return await transactionSettlement.save()
}

module.exports = { getTransactionsSummary, settleTransaction }