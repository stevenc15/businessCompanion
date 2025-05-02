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
    ClientName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Address:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Service:{
        type: DataTypes.STRING,
        allowNull:false
    },
    ReviewWeeklySchedule:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    CheckMailbox:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    ViewFrontOfTheHouse:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    TurnOnMainWater:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    BugsInsideOutsideFrontDoor:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    Ceilings:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    Floors:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    CloseClosets:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    TurnToiletsOnOff:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    GarageCeiling:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    GarageFloor:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    AnyGarageFridge:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    AcAirHandlerDrainLine:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    TurnOnOffWaterHeaterInElectricalPanel:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    TurnOnOffIceMachine:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    ThermostatSetTo78ForClose72ForOpening:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
    },
    ViewRearOfTheHouse:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: false
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