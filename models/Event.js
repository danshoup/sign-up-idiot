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
        event_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        event_start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        event_end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        event_address_line1: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        event_address_line2: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        event_address_city: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        event_address_state: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        event_address_zip: {
            type: DataTypes.INTEGER,
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