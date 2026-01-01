
const {DataTypes} = require('sequelize');
const sequelize = require('../database/sequelize');

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
}, {
    timestamps:true,
    tableName: 'admins'
});

module.exports = Admin;