/**
 * employee.controller.js - orchestrates employee-related requests
 */

const clientService = require('../services/client.service');
const sheetService = require('../services/sheet.service');
const activityService = require('../services/activity.service');

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

    try{
        const newActivity = await activityService.createActivity(formData);

        try{
            const sheets = await getSheetsClient();
            const newRow = sheetService.createRow(formData);
            await sheetService.addToSheet(newRow, sheets);
        }catch(sheetErr){
            console.error('Failed to write to sheet:', sheetErr);
        }

        res.set('Cache-Control', 'no-store');
        res.status(200).json({ message: 'Activity logged successfully', newActivity});
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Failed to log activity'});
    }
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