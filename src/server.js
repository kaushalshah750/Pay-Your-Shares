import express from 'express';
var app = express();
import path from 'path';
import properties from './config/properties';
import db from './config/db'
import cors from 'cors';
import indexRoute from './Controller/index.routes'
import { OAuth2Client } from 'google-auth-library';

db();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
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
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

app.use(cors())

// Serve static files from the 'public' folder (Angular build files)
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", verifyGoogleToken, indexRoute);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(properties.PORT, () => {
    console.log(`Server is running on port ${properties.PORT}`);
});
