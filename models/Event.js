const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        event_date: {
            type: DataTypes.DATE,
            allowNull: false,
            // Want to see how this looks, may remove it.
            defaultValue: DataTypes.NOW,
        },
        event_address: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        event_owner: {
            type:DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
                unique: false,
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'event',
    }
);

module.exports = Event;