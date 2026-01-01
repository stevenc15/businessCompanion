/**
 * qr.services.js - handles QR code generation logic
 */

require("dotenv").config();

async function generateClientQR(clientId){
    
    if (!clientId){
        throw new Error('Client ID missing');
    }

    const frontendURL = process.env.FRONTEND_URL

    const qrLink = `${frontendURL}/employee?ClientId=${clientId}`;
    
    const qrCodeDataURL = await QRCode.toDataURL(qrLink);
    
    if (!qrCodeDataURL){
        throw new Error('unsuccessful qr code generation');
    }

    return qrCodeDataURL;
}

module.exports = {generateClientQR,};