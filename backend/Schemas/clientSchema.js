const DataTypes = require('sequelize');
const sequelize = require('../database/database');
//import sequelize from '../database/database.js';

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
    Email:{
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    tableName: 'clients'
});

module.exports = Client;