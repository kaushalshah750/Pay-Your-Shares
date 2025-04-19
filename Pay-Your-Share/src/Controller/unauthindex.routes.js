import express from 'express';
var router = express.Router();

import userRoutes from './unauth/users/user.routes';
import groupInviteRoutes from './unauth/group-invitation/group-invitation.routes';

router.use('/users', userRoutes());
router.use('/group-invitation', groupInviteRoutes());

module.exports = router;