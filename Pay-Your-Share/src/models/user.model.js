// src/models/user.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    uid: DataTypes.STRING,
    picture: DataTypes.STRING,
    phone: DataTypes.BIGINT,
    registered_on: DataTypes.DATE,
    last_login: DataTypes.STRING
}, {
    tableName: 'users',
    timestamps: false
});

export default User;