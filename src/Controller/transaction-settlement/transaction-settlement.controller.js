import transactionSettlementBusiness from '../../Business/transaction-settlement.business';
import responsedata from '../../Utils/response'

exports.getTransactionsSummary = (req, res) =>{
    transactionSettlementBusiness.getTransactionsSummary(req.user.sub, req.body)
    .then(data => responsedata(res, false, "", data))
    .catch(err => responsedata(res, true, err, null))
}

exports.settleTransaction = (req, res) =>{
    transactionSettlementBusiness.settleTransaction(req.user.sub, req.body)
    .then(data => responsedata(res, false, "", data))
    .catch(err => responsedata(res, true, err, null))
}
