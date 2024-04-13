// import mongoose from 'mongoose';
// import properties from './properties';
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root', //MSI\KAUSHAL
    password: 'Kaushal$#@#123',
    database: 'PayYourShare'
}).promise()

export default pool;

// module.exports = function(){
//     var dbUrl = properties.DB
//     mongoose.connect(dbUrl);
// }