import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';

const Feedback = sequelize.define('Feedback', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    feedback: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.BIGINT,
        references: {
            model: User,
            key: 'id'
        }
    },
    created_on: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'feedbacks',
    timestamps: false
});

// Associations
Feedback.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

export default Feedback;