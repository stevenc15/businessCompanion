/**
 * authRoutes.js - file storing array of allowed emails as admins and the OAuth login 
 * and logout related endpoints for the admin login functionality of the application
 */

const express = require('express')
const router = express.Router();
const {FRONTENDAPPURL} = require('../config/appConfig');
const { authLimiter } = require('../middleware/rateLimiter');

const passport = require('./passport')()

// endpoints
router.get('/status', (req, res) => {
    res.status(200).json({ authenticated: req.isAuthenticated() });
});

router.get('/login/google',
    authLimiter,
    passport.authenticate('google', {scope: ['profile', 'email'] })
);

router.get('/login/google/callback', 
    passport.authenticate('google', {failureRedirect: '/unauthorized' }),
    (req, res) => {
        res.redirect(`${FRONTENDAPPURL}/activityDashboard`);
    }
);

router.get('/logout', (req, res) => {
    req.logout(()=> {
        res.redirect('/');
    });
});

module.exports = router;