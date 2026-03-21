/**
 * passport.js - sets up Google OAuth strategies for both admin and employee users.
 *
 * Admin strategy ('google'): verifies email against the admins table.
 * Employee strategy ('google-employee'): verifies email against the employees table.
 * Both strategies attach a `role` field to the session user so middleware can
 * distinguish between the two.
 */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Admin = require('../models/Admin');
const Employee = require('../models/Employee');
require('dotenv').config();
const { BACKENDAPPURL } = require('../config/appConfig');

module.exports = () => {

    // ── Admin strategy ──────────────────────────────────────────────────────
    passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${BACKENDAPPURL}/auth/login/google/callback`,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const admin = await Admin.findOne({ where: { email: profile.emails[0].value } });
            if (admin) {
                return done(null, { ...profile, role: 'admin' });
            }
            return done(null, false, { message: 'Not Authorized' });
        } catch (err) {
            return done(err);
        }
    }));

    // ── Employee strategy ────────────────────────────────────────────────────
    passport.use('google-employee', new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${BACKENDAPPURL}/auth/employee/login/google/callback`,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const employee = await Employee.findOne({ where: { email: profile.emails[0].value } });
            if (employee) {
                return done(null, { ...profile, role: 'employee' });
            }
            return done(null, false, { message: 'Not Authorized' });
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    return passport;
};
