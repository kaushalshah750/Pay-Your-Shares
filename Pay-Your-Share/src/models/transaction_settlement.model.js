import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Users from './user.model.js';
import SplitGroup from './split_group.model.js';

const TransactionSettlement = sequelize.define('Transaction_Settlement', {
    Trans_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    Amount: { type: DataTypes.DECIMAL, allowNull: false },
    SettleBy_id: { type: DataTypes.BIGINT, allowNull: false },
    SettleTo_id: { type: DataTypes.BIGINT, allowNull: false },
    AddedBy_id: { type: DataTypes.BIGINT, allowNull: false },
    Group_id: { type: DataTypes.BIGINT, allowNull: false },
    Payment_date: { type: DataTypes.DATE, allowNull: false },
    Created_on: { type: DataTypes.DATE, allowNull: false },
    Updated_on: { type: DataTypes.DATE, allowNull: false }
}, {
    tableName: 'Transaction_Settlement',
    timestamps: false
});

// Associations
TransactionSettlement.belongsTo(Users, { foreignKey: 'SettleBy_id' });
TransactionSettlement.belongsTo(Users, { foreignKey: 'SettleTo_id' });
TransactionSettlement.belongsTo(Users, { foreignKey: 'AddedBy_id' });
TransactionSettlement.belongsTo(SplitGroup, { foreignKey: 'Group_id' });

export default TransactionSettlement;