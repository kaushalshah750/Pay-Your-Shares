import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Users from './user.model.js';
import SplitGroup from './split_group.model.js';

const GroupInvite = sequelize.define('Group_Invite', {
    Group_Invite_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    Email: { type: DataTypes.STRING(255), allowNull: false },
    Invite_id: { type: DataTypes.STRING(30), allowNull: false },
    Invited_by: { type: DataTypes.BIGINT, allowNull: false },
    Group_id: { type: DataTypes.BIGINT, allowNull: false },
    Subject: { type: DataTypes.STRING(250), allowNull: false },
    Body: { type: DataTypes.STRING(7000), allowNull: false }
}, {
    tableName: 'Group_Invite',
    timestamps: false
});

// Associations
GroupInvite.belongsTo(Users, { foreignKey: 'Invited_by' });
GroupInvite.belongsTo(SplitGroup, { foreignKey: 'Group_id' });

export default GroupInvite;