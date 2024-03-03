import express from 'express'
var router = express.Router();
import emailController from './split-transaction-email.controller'

module.exports = () => {
    router.post("/", emailController.sendEmail)
    return router;
}
