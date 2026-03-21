/**
 * employee.js - endpoints for the employee submission form.
 *
 * insert-activity requires:
 *  - A valid employee session (Google sign-in, email in whitelist)
 *  - A valid 24-hour signed link token
 */

const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const { employeeLimiter } = require('../middleware/rateLimiter');
const requireEmployeeAuth = require('./Route_utils/requireEmployeeAuth');
const { verifyLinkToken } = require('../utils/linkToken');
require('dotenv').config();

// Token validation middleware
function validateLinkToken(req, res, next) {
    const token = req.body.token || req.query.token;
    if (!token) {
        return res.status(401).json({ message: 'Missing link token' });
    }
    try {
        req.linkPayload = verifyLinkToken(token);
        next();
    } catch {
        return res.status(401).json({ message: 'Link has expired or is invalid' });
    }
}

// POST employee/insert-activity
router.post(
    '/insert-activity',
    employeeLimiter,
    requireEmployeeAuth,
    validateLinkToken,
    employeeController.insertActivity
);

// POST employee/create-activities
router.post(
    '/create-activities',
    employeeController.createActivity
);

// GET employee/getSingleClient
router.get(
    '/getSingleClient',
    employeeController.getSingleClient
);

module.exports = router;
