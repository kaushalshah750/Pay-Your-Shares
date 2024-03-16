import splittransactionbusiness from '../../Business/split-transaction.business';
import responsedata from '../../Utils/response'

exports.createSplitTransaction = (req, res) =>{
    splittransactionbusiness.createSplitTransaction(req.body)
    .then(data => responsedata(res, false, "", data))
    .catch(err => responsedata(res, true, err, null))
}

exports.getSplitTransactions = (req, res) =>{
    splittransactionbusiness.getSplitTransactions({group_id: req.params.group})
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
}

exports.getSplitTransactionsbyId = (req, res) =>{
    splittransactionbusiness.getSplitTransactionsbyId({group_id: req.params.group, _id: req.params.id})
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
}

exports.deleteSplitTransaction = (req, res) =>{
    splittransactionbusiness.deleteSplitTransaction({_id: req.params.id})
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
}