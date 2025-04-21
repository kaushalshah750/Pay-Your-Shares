import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import SplitGroup from './split_group.model.js';
import Users from './user.model.js';
import SplitBetween from './split_between.model.js';

const SplitTransaction = sequelize.define('Split_Transaction', {
    Slip_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    Name: { type: DataTypes.STRING(100), allowNull: false },
    Amount: { type: DataTypes.DECIMAL, allowNull: false },
    PaidBy_id: { type: DataTypes.BIGINT, allowNull: false },
    AddedBy_id: { type: DataTypes.BIGINT, allowNull: false },
    Group_id: { type: DataTypes.BIGINT, allowNull: false },
    Payment_date: { type: DataTypes.DATE, allowNull: false },
    Created_on: { type: DataTypes.DATE, allowNull: false },
    Updated_on: { type: DataTypes.DATE, allowNull: false }
}, {
    tableName: 'Split_Transaction',
    timestamps: false
});

// Associations
SplitTransaction.belongsTo(Users, { foreignKey: 'PaidBy_id' });
SplitTransaction.belongsTo(Users, { foreignKey: 'AddedBy_id' });
SplitTransaction.belongsTo(SplitGroup, { foreignKey: 'Group_id' });
SplitTransaction.hasMany(SplitBetween, { foreignKey: 'Slip_id' });

export default SplitTransaction;