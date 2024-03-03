import express from 'express';
var router = express.Router();

import userRoutes from './users/user.routes';
import groupRoutes from './groups/group.routes';
import groupInviteRoutes from './group-invitation/group-invitation.routes';
import feedbackRoutes from './feedback/feedback.routes';
import splitTransactionRoutes from './split-tranasaction/split-transaction.routes';
import emailRoutes from './split-transaction-email/split-transaction-email.routes';

router.use('/users', userRoutes());
router.use('/groups', groupRoutes());
router.use('/group-invitation', groupInviteRoutes());
router.use('/create-feedback', feedbackRoutes());
router.use('/split-transaction', splitTransactionRoutes());
router.use('/email', emailRoutes());

module.exports = router;