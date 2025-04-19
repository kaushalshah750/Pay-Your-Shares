import express from 'express';
var router = express.Router();
import groupInviteController from './group-invitation.controller'

module.exports = () => {
    router.get("/:id/:groupId", groupInviteController.getGroupInvitationDetail)
    return router;
}