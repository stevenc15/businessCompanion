/**
 * authRoutes.js - file storing array of allowed emails as admins and the OAuth login 
 * and logout related endpoints for the admin login functionality of the application
 */

const express = require('express')
const router = express.Router();
require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production';
const FRONTENDAPPURL = isProduction ? 'https://www.hm-services.online' : 'http://localhost:5173';
const BACKENDAPPURL = isProduction ? 'https://api.hm-services.online' : `http://localhost:${PORT}`;
console.log('Production Mode: ', isProduction);
console.log('FRONTEND App URL: ', FRONTENDAPPURL);
console.log('BACKEND App URL: ', BACKENDAPPURL);

const ALLOWED_EMAILS = [
    'stevenacamachoperez@gmail.com', 
    'armandocaro282@gmail.com', 
    'bmmedjuck@gmail.com'
];

const passport = require('./passport')(ALLOWED_EMAILS)

// endpoints
router.get('/login/google', 
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

module.exports = router