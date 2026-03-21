/**
 * admin.controller.js - orchestrates admin-related requests
 */

const qrService = require('../services/qr.service');
const clientService = require('../services/client.service');
const sheetService = require('../services/sheet.service');
const Employee = require('../models/Employee');
const { generateLinkToken } = require('../utils/linkToken');
const { sendEmployeeLinks } = require('../services/email.service');
const { FRONTENDAPPURL } = require('../config/appConfig');

// ----- Dashboard routes -----

// getSheet - retrieves sheet url 
async function getSheet(req, res) {
    try{
        const url = await sheetService.getSheet();
        res.set('Cache-Control', 'no-store');
        res.status(200).json({url: url});
    }catch(error){
        console.error('Error fetching sheet:', error.message);
        res.status(500).json({error: "failed to get sheet data"});
    }
}

// exportSheet - exports the Google Sheet file to an XLXS file format
async function exportSheet(req, res) {
    try{
        const response = await sheetService.exportSheet()

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
        res.set('Cache-Control', 'no-store');
        res.status(200).json(clients);
    }catch(error){
        res.status(500).json({error: 'failed to retrieve client data'})
    }
};

// createClient - create a client profile that goes into the client table in the database
async function createClient(req, res) {

    try{
        const {ClientName, Address, Community} = req.body;

        if (!ClientName || !Address || !Community) {
            return res.status(400).json({error: 'ClientName, Address, and Community are required'});
        }

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

        const updatedClient = await clientService.editClient(client, {ClientName, Address, Community})

        res.status(200).json({message: 'successful edit of client info', updatedClient});

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to edit client data'});
    }
}

// bulkDeleteClients - deletes multiple clients by array of IDs
async function bulkDeleteClients(req, res) {
    try {
        const { clientIds } = req.body;

        if (!Array.isArray(clientIds) || clientIds.length === 0) {
            return res.status(400).json({ error: 'clientIds must be a non-empty array' });
        }

        await clientService.bulkDeleteClients(clientIds);

        res.status(200).json({ message: `Successfully deleted ${clientIds.length} client(s)` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to bulk delete clients' });
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
                return res.status(400).json({ error: 'Client ID missing' });
            }
    
            const qrCode = await qrService.generateClientQR(ClientId)
            
            res.status(200).json({qrCode: qrCode});
        }catch(error){
            console.error(error);
            res.status(500).json({ error: 'Failed to generate QR code' });
        }
}; 

// ── Employee whitelist management ────────────────────────────────────────────

async function getEmployees(req, res) {
    try {
        const employees = await Employee.findAll({ order: [['createdAt', 'ASC']] });
        res.set('Cache-Control', 'no-store');
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
}

async function addEmployee(req, res) {
    try {
        const { email, name } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        const employee = await Employee.create({ email: email.toLowerCase().trim(), name: name || null });
        res.status(200).json({ message: 'Employee added', employee });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'That email is already in the whitelist' });
        }
        console.error(error);
        res.status(500).json({ error: 'Failed to add employee' });
    }
}

async function deleteEmployee(req, res) {
    try {
        const { id } = req.body;
        const employee = await Employee.findOne({ where: { id } });
        if (!employee) return res.status(404).json({ error: 'Employee not found' });

        await employee.destroy();
        res.status(200).json({ message: 'Employee removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to remove employee' });
    }
}

// ── Send bulk links via email ─────────────────────────────────────────────────

async function sendLinks(req, res) {
    try {
        const { employeeEmail, clientIds } = req.body;

        if (!employeeEmail || !Array.isArray(clientIds) || clientIds.length === 0) {
            return res.status(400).json({ error: 'employeeEmail and a non-empty clientIds array are required' });
        }

        const clients = await Promise.all(
            clientIds.map(id => clientService.getOneClient(id))
        );

        const missing = clients.some(c => !c);
        if (missing) return res.status(404).json({ error: 'One or more clients not found' });

        const clientLinks = clients.map(client => ({
            clientName: client.ClientName,
            address: client.Address,
            url: `${FRONTENDAPPURL}/employee?ClientId=${client.ClientId}&token=${generateLinkToken(client.ClientId)}`,
        }));

        await sendEmployeeLinks(employeeEmail, clientLinks);

        res.status(200).json({ message: `Links sent to ${employeeEmail}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send links' });
    }
}

module.exports = {
    getSheet,
    exportSheet,
    generateClientQR,
    getAllClients,
    editClient,
    createClient,
    deleteClient,
    bulkDeleteClients,
    getEmployees,
    addEmployee,
    deleteEmployee,
    sendLinks,
}