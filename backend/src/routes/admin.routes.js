/**
 * admin.js - file that holds all endpoints related to admin functionality in application
 */

const express = require('express');
const router = express.Router();
const requireAuth = require ('./Route_utils/requireAuth.js'); 
require("dotenv").config();

const adminController = require('../controllers/admin.controller')

// ----- Dashboard routes -----

// GET /admin/dashboard/get-sheet
// returns the embedded url for the google sheet with employee activities for display
router.get(
    '/dashboard/get-sheet', 
    requireAuth, 
    adminController.getSheet
);

// GET /admin/dashboard/get-export-sheet
// exports the Google Sheet as an XLXS file
router.get(
    '/dashboard/get-export-sheet', 
    requireAuth, 
    adminController.exportSheet
);

// ----- Client Management Routes -----

// GET /admin/clients/getClients
// fetch all client data from database
router.get(
    '/clients/getClients', 
    requireAuth,
    adminController.getAllClients 
);

// POST /admin/clients/addClient
// add new client to database
router.post(
    '/clients/addClient', 
    requireAuth,
    adminController.createClient
);

// POST /admin/clients/getQR
// generate QR code for client
router.post(
    '/clients/genQR', 
    requireAuth, 
    adminController.generateClientQR
);

// POST /admin/clients/editClient
// edit client information
router.post(
    '/clients/editClient', 
    requireAuth, 
    adminController.editClient
);

// POST /admin/clients/deleteClient
// delete clint profile from database 
router.post(
    '/clients/deleteClient', 
    requireAuth, 
    adminController.deleteClient
);

module.exports = router;