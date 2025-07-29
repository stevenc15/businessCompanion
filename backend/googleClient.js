//backend/googleClient.js - fetching authentication to drive and sheets services
const {google} = require('googleapis');
const path = require('path');
const fs = require('fs');

//defining what paths i want access i want
const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
];

//new google auth instance using json key
const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, './credentials/businesscompanion-app-backend-ad0a2252b965.json'),
    scopes:SCOPES,
});


//for read, write and create/delete sheets 
async function getSheetsClient() {
    const client = await auth.getClient();
    return google.sheets({ version: 'v4', auth:client });
}

//for upload/download, move, share files and create folders
async function getDriveClient() {
    const client = await auth.getClient();
    return google.drive({ version: 'v3', auth:client});
}

module.exports = {getSheetsClient, getDriveClient};