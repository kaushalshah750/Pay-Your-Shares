import express from 'express';
var router = express.Router();
import groups from './group.controller';

module.exports = () => {
    router.get("/", groups.getAll);
    router.get("/:id", groups.getGroupbyId);
    router.delete("/:id/delete", groups.deleteGroup);
    router.post("/create", groups.creategroup);
    router.put("/remove-member", groups.removeGroupMember);
    router.put("/add-members", groups.addGroupMembers);
    return router;
};