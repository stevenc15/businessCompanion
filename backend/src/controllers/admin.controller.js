/**
 * admin.controller.js - orchestrates admin-related requests
 */

const qrService = require('../services/qr.service');
const clientService = require('../services/client.service');
const sheetService = require('../services/sheet.service');

// ----- Dashboard routes -----

// getSheet - retrieves sheet url 
async function getSheet(req, res) {
    try{
        const url = sheetService.getSheet();
        res.status(200).json({url: url});
    }catch(error){
        console.error('Error fetching sheet:', error.message);
        res.status(500).json({error: "failed to get sheet data"});
    }
}

// exportSheet - exports the Google Sheet file to an XLXS file format
async  function exportSheet(req, res) {
    try{
        const response = sheetService.exportSheet()

        res.setHeader('Content-Disposition', 'attachment; filename="export.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        response.data.pipe(res);
    }catch(error){
        console.error('Error fetching sheet:', error.message);
        res.status(500).json({error: "failed to get EXPORT sheet"});
    }
}

// getAllClients - fetches all client data from database
async function getAllClients(req, res) {
    try{
        const clients = await clientService.getAllClients();
        
        res.status(200).json(clients);
    }catch(error){
        res.status(500).json({message: 'failed to retrieve client data'})
    }
};

// createClient - create a client profile that goes into the client table in the database
async function createClient(req, res) {
    
    try{
        const {ClientName, Address, Community} = req.body;

        const client = await clientService.createClient({ClientName, Address, Community})

        res.status(200).json({message: 'successfully added client to database', client});
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to save client'});
    }
}

// editClient - edit client profile data
async function editClient(req, res) {

    try{
        const {ClientId, ClientName, Address, Community} = req.body;

        const client = await clientService.getOneClient(ClientId)

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        updatedClient = clientService.editClient(client, {ClientName, Address, Community})
        
        res.status(200).json({message: 'successful edit of client info'}, updatedClient);

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to edit client data'});
    }
}

// deleteClient - deletes client from client table in database
async function deleteClient(req, res) {
    try{
        const {ClientId} = req.body;

        const client = await clientService.getOneClient(ClientId);

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        await clientService.deleteClient(client);
        
        res.status(200).json({message: 'successful deletion of client info'});

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to delete client data'});
    }
}

// generateClientQR - generates qr code with client information
async function generateClientQR(req, res) {
    try{
            const {ClientId} = req.body;
    
            if (!ClientId){
                return res.status(401).json({ message:'Client ID missing '});
            }
    
            const qrCode = await qrService.generateClientQR(ClientId)
            
            res.status(200).json({qrCode: qrCode});
        }catch(error){
            console.error(error);
            res.status(500).json({ error: 'Failed to generate QR code' });
        }
};

module.exports = {
    getSheet,
    exportSheet,
    generateClientQR,
    getAllClients,
    editClient,
    createClient,
    deleteClient
}