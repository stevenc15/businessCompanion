/**
 * setupTestDB.js
 */

const sequelize = require('../src/database/sequelize');
const Client = require('../src/models/Client');

async function initializeTestDB() {
    await sequelize.authenticate();
    await sequelize.sync({force: true});

    await Client.create({ ClientName: 'Client1', Address: 'Addr1', Community: 'Comm1' });
    await Client.create({ ClientName: 'Client2', Address: 'Addr2', Community: 'Comm2' });

    return sequelize;
}

module.exports = {
    sequelize,
    initializeTestDB,
}