/**
 * sheet.service.js - handles logic relating to accessing and exporting Google Sheet
 * with activity data
 */

require("dotenv").config();
const {getDriveClient, getSheetsClient} = require('./utils/googleClient.js');

async function getSheet(){
    console.log(process.env.GOOGLE_SHEET_EMBED_URL);
    return process.env.GOOGLE_SHEET_EMBED_URL;
}

async function exportSheet(){
    const drive = await getDriveClient();
    const fileId = process.env.GOOGLE_SHEET_ID;

    const response = await drive.files.export(
        {
            fileId,
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        {responseType: 'stream'}
    );

    return response;
}

async function createRow(formData){
    return Object.values(formData);
}

async function addToSheet(newRow, sheets){
    console.log([newRow]);
    console.log(sheets);
    await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'Sheet1!A2',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [newRow],
            },
    });
}
module.exports = {
    getSheet,
    exportSheet,
    createRow,
    addToSheet
}
