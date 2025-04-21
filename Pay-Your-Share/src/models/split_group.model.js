import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Users from './user.model.js';
import GroupUser from './group_user.model.js';
import SplitTransaction from './split_transaction.model.js';
import TransactionSettlement from './transaction_settlement.model.js';
import GroupInvite from './group_invite.model.js';

const SplitGroup = sequelize.define('Split_Group', {
    Group_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    Name: { type: DataTypes.STRING(100), allowNull: false },
    Description: { type: DataTypes.STRING(400), allowNull: false },
    Admin: { type: DataTypes.BIGINT, allowNull: false },
    Created_on: { type: DataTypes.DATE, allowNull: false },
    Updated_on: { type: DataTypes.DATE, allowNull: false }
}, {
    tableName: 'Split_Group',
    timestamps: false
});

// Associations
SplitGroup.belongsTo(Users, { foreignKey: 'Admin' });
SplitGroup.hasMany(GroupUser, { foreignKey: 'Group_id' });
SplitGroup.hasMany(SplitTransaction, { foreignKey: 'Group_id' });
SplitGroup.hasMany(TransactionSettlement, { foreignKey: 'Group_id' });
SplitGroup.hasMany(GroupInvite, { foreignKey: 'Group_id' });

export default SplitGroup;