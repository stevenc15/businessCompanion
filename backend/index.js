/**
 * index.js - app entrypoint, only boots the server
 */

require('dotenv').config();
const app = require('./app');
const initializeDatabase = require('./src/config/database')

const PORT = process.env.PORT || 5001;

(async () => {
    try{
        await initializeDatabase();
    
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch(error) {
        console.error('Server Starup Aborted');
        console.error(error);          
        console.error(error.message);
        console.error(error.stack);
        process.exit(1);
    }
})();