/**
 * index.js - app entrypoint, only boots the server
 */

require('dotenv').config();
const app = require('./app');
const initializeDatabase = require('./src/config/database')

const PORT = process.env.PORT || 5001;

(async () => {
    await initializeDatabase();
    
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
})();