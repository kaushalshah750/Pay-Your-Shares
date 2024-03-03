import express from 'express';
var router = express.Router();
import feedback from './feedback.controller'

module.exports = () => {
    router.post("/", feedback.createFeedback)
    return router;
}