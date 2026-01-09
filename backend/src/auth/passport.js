/**
 * passport.js - sets up strategies and serialization and deserialization of user
 * 
 * This file specifies how passport will authenticate users through the import 
 * of GoogleStrategy. It grabs the correct client id (to confirm which app user is 
 * trying to access) and client secret (confirmation that it is indeed an app the developers
 * own) values from GCP credentials in the .env file. The callback url is where the user
 * will be redicrected after a successful login. After Google returns the
 * user info, a verify function executed to see if the user is within the allowed
 * email range. Entire profile stored in session given how serialization and deserialization 
 * is defined for passport as to how user info will be stored and removed.
 */


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const isProduction = process.env.NODE_ENV === 'production';
const FRONTENDAPPURL = isProduction ? 'https://www.hm-services.online' : 'http://localhost:5173';
const BACKENDAPPURL = isProduction ? 'https://api.hm-services.online' : `http://localhost:${PORT}`;
console.log('Production Mode: ', isProduction);
console.log('FRONTEND App URL: ', FRONTENDAPPURL);
console.log('BACKEND App URL: ', BACKENDAPPURL);


module.exports = (ALLOWED_EMAILS) => {

    if (process.env.NODE_ENV === 'test') {
        return passport;
    }
    
    passport.use(new GoogleStrategy ({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${BACKENDAPPURL}/auth/login/google/callback`,
    }, (accessToken, refreshToken, profile, done) => {
        if (ALLOWED_EMAILS.includes(profile.emails[0].value)) {
            return done(null, profile);
        } else {
            return done(null, false, { message: 'Not Authorized' });
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    return passport; // optional, if you want to import and use it directly
};
