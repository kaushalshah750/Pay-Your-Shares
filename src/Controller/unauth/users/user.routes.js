import express from 'express';
var router = express.Router();
import users from './user.controller'

module.exports = () => {
    router.get("/loggedin", users.loggedInUser);
    return router;
}