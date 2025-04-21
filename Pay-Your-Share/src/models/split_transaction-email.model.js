import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';

const Email = sequelize.define('Email', {
    Id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    body: { type: DataTypes.STRING },
    subject: { type: DataTypes.STRING }
}, {
    timestamps: false,
    tableName: 'split_transaction_email'
});

Email.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Email, { foreignKey: 'userId' });

export default Email;