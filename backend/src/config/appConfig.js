require('dotenv').config();
const PORT = process.env.PORT || 5001;
const isProduction = process.env.NODE_ENV === 'production';
const FRONTENDAPPURL = isProduction ? process.env.FRONTEND_URL : 'http://localhost:5173';
const BACKENDAPPURL = isProduction ? process.env.BACKEND_URL : `http://localhost:${PORT}`;

module.exports = {
    FRONTENDAPPURL,
    BACKENDAPPURL
}