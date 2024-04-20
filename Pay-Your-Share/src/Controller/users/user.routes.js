import express from 'express';
var router = express.Router();
import users from './user.controller'

module.exports = () => {
    router.get("/group/summary", users.getGroupSummary);
    router.get("/group/:id/summary", users.getGroupSummary);
    // router.get("/group/:id/summary/users", users.getGroupSummaryUsers);
    router.get("/check-user", users.checkUser);
    router.get("/loggedin", users.loggedInUser);
    router.post("/update-user", users.updateUser);
    return router;
}