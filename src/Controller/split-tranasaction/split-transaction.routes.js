import express from 'express';
var router = express.Router();
import splitTransaction from './split-transaction.controller';

module.exports = () => {
    router.get("/get-transaction/:id", splitTransaction.getSplitTransactions);
    router.post("/create", splitTransaction.createSplitTransaction);
    router.delete("/:id/delete", splitTransaction.deleteSplitTransaction);
    return router;
}