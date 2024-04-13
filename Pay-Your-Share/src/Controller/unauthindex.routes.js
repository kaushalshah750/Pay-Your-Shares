import express from 'express';
var router = express.Router();

import userRoutes from './unauth/users/user.routes';

router.use('/users', userRoutes());

module.exports = router;