import express from 'express';
var router = express.Router();
import transactionSettlement from './transaction-settlement.controller';

module.exports = () => {
    router.post("/get-transaction", transactionSettlement.getTransactionsSummary);
    router.post("/settle", transactionSettlement.settleTransaction);
    return router;
}