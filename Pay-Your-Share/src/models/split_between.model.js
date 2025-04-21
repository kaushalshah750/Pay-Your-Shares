import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import SplitTransaction from './split_transaction.model.js';
import Users from './user.model.js';

const SplitBetween = sequelize.define('Split_Between', {
    Id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    Slip_id: { type: DataTypes.BIGINT, allowNull: false },
    User_id: { type: DataTypes.BIGINT, allowNull: false }
}, {
    tableName: 'Split_Between',
    timestamps: false
});

// Associations
SplitBetween.belongsTo(SplitTransaction, { foreignKey: 'Slip_id' });
SplitBetween.belongsTo(Users, { foreignKey: 'User_id' });

export default SplitBetween;