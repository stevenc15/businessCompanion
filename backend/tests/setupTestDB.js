/**
 * setupTestDB.js - initializes the in-memory SQLite database for tests.
 * All three models must be required here so Sequelize registers them before
 * sync() is called — otherwise their tables won't be created.
 */

const sequelize = require('../src/database/sequelize');
const Client = require('../src/models/Client');
require('../src/models/Activity');
require('../src/models/Admin');

async function initializeTestDB() {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    await Client.create({ ClientName: 'Client1', Address: 'Addr1', Community: 'Comm1' });
    await Client.create({ ClientName: 'Client2', Address: 'Addr2', Community: 'Comm2' });

    return sequelize;
}

module.exports = {
    sequelize,
    initializeTestDB,
};
