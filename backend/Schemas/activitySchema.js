const DataTypes = require('sequelize');
const sequelize = require('../database/database');
//import sequelize from '../database/database.js';

const Activity = sequelize.define( 'Activity', {
    ActivityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    EmployeeName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Community: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Address:{
        type: DataTypes.STRING,
        allowNull:false
    },
    DoorCode:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Service:{
        type: DataTypes.STRING,
        allowNull:false
    }, 
    Status:{
        type: DataTypes.BOOLEAN,
        default: false
    }
}, {
    timestamps:true,
    tableName: 'activities'
});

module.exports = Activity;