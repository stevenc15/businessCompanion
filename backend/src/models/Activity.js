/**
 * Activity.js - Schema structure for activities that are logged by employees
 */

const {DataTypes} = require('sequelize');
const sequelize = require('../database/sequelize');

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
        allowNull: false,
        defaultValue: false
    },
    CheckMailbox:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    ViewFrontOfTheHouse:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    TurnOnMainWater:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    BugsInsideOutsideFrontDoor:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    Ceilings:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    Floors:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    CloseClosets:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    TurnToiletsOnOff:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    GarageCeiling:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    GarageFloor:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    AnyGarageFridge:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    AcAirHandlerDrainLine:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    TurnOnOffWaterHeaterInElectricalPanel:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    TurnOnOffIceMachine:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    ThermostatSetTo78ForClose72ForOpening:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    ViewRearOfTheHouse:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    Status:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps:true,
    tableName: 'activities'
});

module.exports = Activity;