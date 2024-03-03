import mongoose from 'mongoose';
import properties from './properties';

module.exports = function(){
    var dbUrl = properties.DB
    mongoose.connect(dbUrl);
}