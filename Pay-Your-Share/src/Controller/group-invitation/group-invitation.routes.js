import express from 'express';
var router = express.Router();
import groupInviteController from './group-invitation.controller'

module.exports = () => {
    router.post("/:id/invite", groupInviteController.sendGroupInvitation)
    return router;
}