import express from 'express';
var app = express();
import path from 'path';
import properties from './config/properties';
import sequelize from './config/db'
import cors from 'cors';
import indexRoute from './Controller/index.routes'
import unauthindexRoute from './Controller/unauthindex.routes'
import { OAuth2Client } from 'google-auth-library';

import Feedback from './models/Feedback.model';
import GroupInvite from './models/group_invite.model';
import GroupUser from './models/group_user.model';
import SplitBetween from './models/split_between.model';
import SplitGroup from './models/split_group.model';
import Email from './models/split_transaction_email.model';
import SplitTransaction from './models/split_transaction.model';
import TransactionSettlement from './models/transaction_settlement.model';
import User from './models/user.model';

sequelize.sync({ force: false }) // `force: true` will drop existing tables
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const CLIENT_ID = '156985885803-62ok5adedqmmg3nr0vj24b9sh5jjtvih.apps.googleusercontent.com'; // Replace with your Google client ID
const client = new OAuth2Client(CLIENT_ID);

// Middleware to verify Google token
async function verifyGoogleToken(req, res, next) {
    try {
        const token = req.headers['authorization'].split(' ')[1]; // Extract token from Authorization header
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        req.user = payload; // Attach user payload to request object
        next();
    } catch (error) {
        console.error('Error verifying Google token:', error);
        return res.status(401).json({ err: true, errMessage: 'Unauthorized', data: null });
    }
}

app.use(cors())

// Serve static files from the 'public' folder (Angular build files)
app.use(express.static(path.join(__dirname, 'public')));

app.use("/unauth", unauthindexRoute);
app.use("/api", verifyGoogleToken, indexRoute);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(properties.PORT, () => {
    console.log(`Server is running on port ${properties.PORT}`);
});