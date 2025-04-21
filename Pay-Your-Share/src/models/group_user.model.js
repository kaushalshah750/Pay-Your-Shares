import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import SplitGroup from './split_group.model.js';
import Users from './user.model.js';

const GroupUser = sequelize.define('Group_User', {
    Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Group_id: { type: DataTypes.BIGINT, allowNull: false },
    User_id: { type: DataTypes.BIGINT, allowNull: false },
    Added_on: { type: DataTypes.DATE, allowNull: false }
}, {
    tableName: 'Group_User',
    timestamps: false
});

// Associations
GroupUser.belongsTo(SplitGroup, { foreignKey: 'Group_id' });
GroupUser.belongsTo(Users, { foreignKey: 'User_id' });

export default GroupUser;