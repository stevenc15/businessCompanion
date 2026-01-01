/**
 * database.js - initializes a connection to the DB (DB initialization)
 * 
 * This file will do the following:
 * - opens a connection to the DB
 * - verifies credentials
 * - will create or update the DB tables
 */

const sequelize = require('../database/sequelize.js');

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database successfully connected');

        await sequelize.sync({alter:true});

        console.log('Tables were adjusted successfully');
    }catch(error){
        console.error('Unable to connect to Database: ', error);
    }
}

module.exports = initializeDatabase;