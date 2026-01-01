/**
 * app.js - file responsible for defining the application 
 * 
 * This file will build and configure the express application, this 
 * includes the following: middleware, sessions, auth, routes, parsing 
 * and CORS
 * 
 * Another note, app.js creates the app but does not start it.
 */

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');

require('./src/auth/passport.js')

const authRouter = require('./src/auth/authRoutes.js')
const adminRouter = require('./src/routes/admin.routes.js');
const employeeRouter = require('./src/routes/employee.routes.js');

const app = express();

// Middleware 
app.set('trust proxy', 1);

app.use(cors({
    origin: allowedOrigins,
    credentials:true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session ({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'none',
        secure: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/admin', adminRouter);
app.use('/employee', employeeRouter);
app.use('/auth', authRouter);

module.exports = app;