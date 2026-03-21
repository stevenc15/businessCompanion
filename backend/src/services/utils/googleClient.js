/**
 * googleClient.js - fetching authentication to drive and sheets services
 */

const {google} = require('googleapis');

const missingVars = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_SHEET_ID', 'GOOGLE_SHEET_EMBED_URL', 'GOOGLE_SERVICE_ACCOUNT_CREDENTIALS']
    .filter(v => !process.env[v]);
if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

//defining what paths i want access i want
const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
];

//new google auth instance using service account credentials from env var
const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS),
    scopes: SCOPES,
});


//for read, write and create/delete sheets 
async function getSheetsClient() {
    const client = await auth.getClient();
    if (!client){
        throw new Error('Failed to authenticate with Google API');
    }
    return google.sheets({ version: 'v4', auth:client });
}

//for upload/download, move, share files and create folders
async function getDriveClient() {
    const client = await auth.getClient();
    if (!client){
        throw new Error('Failed to authenticate with Google API');
    }
    return google.drive({ version: 'v3', auth:client});
}

module.exports = {getSheetsClient, getDriveClient}; 