/**
 * qr.services.js - handles QR code generation logic
 */

require("dotenv").config();
const QRCode = require('qrcode');
const isProduction = process.env.NODE_ENV === 'production';
const FRONTENDAPPURL = isProduction ? process.env.FRONTEND_URL : 'http://localhost:5173';

async function generateClientQR(clientId){
    
    if (!clientId){
        throw new Error('Client ID missing');
    }
    const frontendURL = FRONTENDAPPURL
    const qrLink = `${frontendURL}/employee?ClientId=${clientId}`;
    const qrCodeDataURL = await QRCode.toDataURL(qrLink);
    if (!qrCodeDataURL){
        throw new Error('unsuccessful qr code generation');
    }

    return qrCodeDataURL;
}

module.exports = {generateClientQR,};