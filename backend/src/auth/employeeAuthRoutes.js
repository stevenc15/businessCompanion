/**
 * employeeAuthRoutes.js - Google OAuth routes for employee authentication.
 *
 * Flow:
 *  1. Frontend redirects to /auth/employee/login/google?redirect=<formURL>
 *  2. Backend stores the redirect URL in the session, then sends employee to Google.
 *  3. Google sends employee back to /auth/employee/login/google/callback.
 *  4. If email is in the employees whitelist, session is created and employee is
 *     redirected to the original form URL.
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { FRONTENDAPPURL } = require('../config/appConfig');

// GET /auth/employee/status
router.get('/status', (req, res) => {
    res.status(200).json({ authenticated: req.isAuthenticated() && req.user?.role === 'employee' });
});

// GET /auth/employee/login/google
router.get('/login/google', (req, res, next) => {
    if (req.query.redirect) {
        req.session.employeeReturnTo = req.query.redirect;
    }
    passport.authenticate('google-employee', { scope: ['profile', 'email'] })(req, res, next);
});

// GET /auth/employee/login/google/callback
router.get('/login/google/callback',
    passport.authenticate('google-employee', { failureRedirect: `${FRONTENDAPPURL}/employeeLogin?error=unauthorized` }),
    (req, res) => {
        const redirectTo = req.session.employeeReturnTo || `${FRONTENDAPPURL}/employee`;
        delete req.session.employeeReturnTo;
        res.redirect(redirectTo);
    }
);

// GET /auth/employee/logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.status(200).json({ message: 'Logged out' });
    });
});

module.exports = router;
