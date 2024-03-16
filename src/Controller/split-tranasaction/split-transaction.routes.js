import express from 'express';
var router = express.Router();
import splitTransaction from './split-transaction.controller';

module.exports = () => {
    router.get("/:group/get-transaction", splitTransaction.getSplitTransactions);
    router.get("/:group/get-transaction/:id", splitTransaction.getSplitTransactionsbyId);
    router.post("/create", splitTransaction.createSplitTransaction);
    router.delete("/:id/delete", splitTransaction.deleteSplitTransaction);
    return router;
}