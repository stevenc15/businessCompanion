/**
 * employee.js - file that holds all the endpoints relating to the employee's 
 * submission form
 * 
 * Note: no auth required in these endpoints since these endpoints are only accessible 
 * via an external QR code
 */

const express = require('express');
const router = express.Router();
const {google}= require('googleapis');
const {getSheetsClient} = require('../services/utils/googleClient.js');
const employeeController = require('../controllers/employee.controller')
require("dotenv").config();

// POST employee/insert-activity
// retrieves google sheet file and inserts an activity into a brand new row
router.post(
    '/insert-activity', 
    employeeController.insertActivity
);

// POST employee/activities 
// creates a new activity object based on input from the employee
router.post(
    '/create-activities', 
    employeeController.createActivity
);

// GET employee/getSingleClient
// get client data based on given client id (in action will come from QR code usage)
router.get(
    '/getSingleClient', 
    employeeController.getSingleClient
);

module.exports=router;