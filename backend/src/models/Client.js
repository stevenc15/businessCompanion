/**
 * Client.js - schema structure for client data
 */

const {DataTypes} = require('sequelize');
const sequelize = require('../database/sequelize');

const Client = sequelize.define( 'Client', {
    ClientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ClientName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Address:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Community:{
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    tableName: 'clients'
});

module.exports = Client;