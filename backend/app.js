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
const helmet = require('helmet');
require('dotenv').config();
require('./src/models/Admin.js');
require('./src/models/Client.js');
require('./src/models/Activity.js');
require('./src/models/Employee.js');

const isProduction = process.env.NODE_ENV === 'production';
const authRouter = require('./src/auth/authRoutes.js');
const employeeAuthRouter = require('./src/auth/employeeAuthRoutes.js');
const adminRouter = require('./src/routes/admin.routes.js');
const employeeRouter = require('./src/routes/employee.routes.js');

const allowedOrigins = [
    'http://localhost:5173', 
    process.env.FRONTEND_URL
]

const {databaseReady} = require('./src/config/database');

const app = express();

// Middleware
app.set('trust proxy', 1);

app.use(helmet());

app.use(cors({
    origin: allowedOrigins,
    credentials:true
}));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.json({ limit: '10kb' }));

app.use(session ({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: isProduction ? 'none' : 'lax',
        secure: isProduction,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime()
    });
});

app.get('/ready', (req, res) =>{
    if (!databaseReady()) {
        return res.status(503).json({status: 'not ready'});
    }
    res.status(200).json({status: 'ready'});
});

// Routes
app.use('/admin', adminRouter);
app.use('/employee', employeeRouter);
app.use('/auth', authRouter);
app.use('/auth/employee', employeeAuthRouter);

module.exports = app;