/**
 * employee.controller.js - orchestrates employee-related requests
 */

const clientService = require('../services/client.service');
const sheetService = require('../services/sheet.service');
const activityService = require('../services/activity.service');
const emailService = require('../services/email.service');

const {getSheetsClient} = require('../services/utils/googleClient.js');

async function insertActivity(req, res) {
    const formData = req.body;

    if (!formData){
        return res.status(400).json({ message: 'no data is submitted/found from form'});
    }

    const { EmployeeName, Community, ClientName, Address, Service } = formData;
    if (!EmployeeName || !Community || !ClientName || !Address || !Service) {
        return res.status(400).json({ message: 'missing required fields' });
    }

    const MAX_LENGTH = 200;
    const textFields = [EmployeeName, Community, ClientName, Address, Service];
    if (textFields.some(f => typeof f !== 'string' || f.trim().length === 0 || f.length > MAX_LENGTH)) {
        return res.status(400).json({ message: 'invalid field values' });
    }

    if (process.env.NODE_ENV !== 'production') {
        console.log('form data in controller: ', formData);
    }

    // Database and Sheet writes are independent — a failure in one should
    // never prevent the other from being attempted, so a Sheets outage
    // doesn't lose data that did make it to the database (and vice versa).
    let newActivity = null;
    let dbSuccess = false;
    let dbErrorMessage = null;
    try{
        newActivity = await activityService.createActivity(formData);
        dbSuccess = true;
    }catch(err){
        console.error('Failed to save activity to database:', err);
        dbErrorMessage = err.message;
    }

    let sheetSuccess = false;
    let sheetErrorMessage = null;
    try{
        const sheets = await getSheetsClient();
        const newRow = sheetService.createRow(formData);
        await sheetService.addToSheet(newRow, sheets);
        sheetSuccess = true;
    }catch(err){
        console.error('Failed to write to sheet:', err);
        sheetErrorMessage = err.message;
    }

    if (!dbSuccess || !sheetSuccess) {
        try{
            await emailService.notifyAdminsOfSubmissionFailure({
                employeeName: EmployeeName,
                clientName: ClientName,
                address: Address,
                community: Community,
                service: Service,
                dbSuccess,
                dbErrorMessage,
                sheetSuccess,
                sheetErrorMessage,
            });
        }catch(notifyErr){
            console.error('Failed to notify admins of submission failure:', notifyErr);
        }
    }

    const database = {
        success: dbSuccess,
        message: dbSuccess
            ? 'Saved to the database.'
            : 'Could not save to the database. Please resubmit this activity.',
    };

    const sheet = {
        success: sheetSuccess,
        message: sheetSuccess
            ? 'Synced to the spreadsheet.'
            : 'Could not sync to the spreadsheet. The admin has been notified.',
    };

    let message;
    if (dbSuccess && sheetSuccess) {
        message = 'Activity logged successfully.';
    } else if (!dbSuccess && sheetSuccess) {
        message = 'Your activity could not be saved to the database — please resubmit. (It was recorded in the backup spreadsheet, and your admin has been notified.)';
    } else if (dbSuccess && !sheetSuccess) {
        message = 'Activity logged successfully, but the spreadsheet sync failed. The admin has been notified.';
    } else {
        message = 'Your activity could not be saved. Please resubmit, and contact your admin if this keeps happening.';
    }

    res.set('Cache-Control', 'no-store');
    res.status(dbSuccess ? 200 : 500).json({ message, database, sheet, newActivity });
}

async function createActivity(req, res) {
    try{
            const { Community, ClientName, Address, Service, EmployeeName } = req.body;

            if (!Community || !ClientName || !Address || !Service || !EmployeeName){
                return res.status(400).json({message: 'missing required fields'});
            }

            const newActivity = await activityService.createActivity(req.body);

            res.status(200).json({message: 'successfully logged activity', newActivity});
        }catch(err){
            console.error(err);
            res.status(500).json({error: 'Failed to save activity'});
        }
}

async function getSingleClient(req, res){
    const {ClientId} = req.query;

    try{
        const client = await clientService.getOneClient(ClientId);
    
        if (!client){
            return res.status(404).json({message: 'no client found by that id'});
        }

        res.status(200).json(client);
    
    }catch(error){
        console.error('Error fetching client: ', error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = {
    insertActivity,
    createActivity,
    getSingleClient
}