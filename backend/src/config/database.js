/**
 * database.js - initializes a connection to the DB (DB initialization)
 * 
 * This file will do the following:
 * - opens a connection to the DB
 * - verifies credentials
 * - will create or update the DB tables
 */

const sequelize = require('../database/sequelize.js');
let isDatabaseReady = false;
require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production';

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database successfully connected');

        await sequelize.sync({alter:!isProduction});
        console.log('Tables were adjusted successfully');

        isDatabaseReady = true;
    }catch(error){
        console.error('Unable to connect to Database: ', error);
        throw error;
    }
}

function databaseReady() {
    return isDatabaseReady;
}

module.exports = {
    initializeDatabase,
    databaseReady,
};