const DataTypes = require('sequelize');
const sequelize = require('../database/database');
//import sequelize from '../database/database.js';

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    passwordVtoken:{
        type: DataTypes.STRING,
        allowNull:true
    }
}, {
    timestamps:true,
    tableName: 'admins'
});

module.exports = Admin;