//imports
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const sequelize = require('./database/database.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const Client = require('./Schemas/clientSchema.js');
const Activity = require('./Schemas/activitySchema.js');
const ALLOWED_EMAILS = ['stevenacamachoperez@gmail.com', 'armandocaro282@gmail.com', 'bmmedjuck@gmail.com'];
const isProduction = process.env.NODE_ENV === 'production';

const FRONTENDAPPURL = isProduction ? 'https://www.hm-services.online' : 'http://localhost:5173';
const BACKENDAPPURL = isProduction ? 'https://api.hm-services.online' : `http://localhost:${PORT}`;
console.log('Production Mode: ', isProduction);
console.log('FRONTEND App URL: ', FRONTENDAPPURL);
console.log('BACKEND App URL: ', BACKENDAPPURL);

app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1);
app.use(session ({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: isProduction ? 'none' : 'lax',
        secure: isProduction
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy ({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${BACKENDAPPURL}/auth/google/callback`,
}, (accessToken, refreshToken, profile, done) => {
    if (ALLOWED_EMAILS.includes(profile.emails[0].value)){
        return done(null, profile); //allow login
    }else{
        return done(null, false, {message: 'Not Authorized'});
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done)=> {
    done(null, user);
});

// Initiate google login
app.get('/auth/google', 
    passport.authenticate('google', {scope: ['profile', 'email'] })
);

//handle google oauth callback
app.get('/auth/google/callback', 
    passport.authenticate('google', {failureRedirect: '/unauthorized' }),
    (req, res) => {
        res.redirect(`${FRONTENDAPPURL}/activityDashboard`);
    }
);

//handle logout
app.get('/logout', (req, res) => {
    req.logout(()=> {
        res.redirect('/');
    });
});

//Connect to database
async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database successfully connected');

        await sequelize.sync({alter:true});

        console.log('Tables were adjusted successfully');
    }catch(error){
        console.error('Unable to connect to Database: ', error);
    }
}

initializeDatabase();

const allowedOrigins = [
    'http://localhost:5173', 
    'https://business-companion-seven.vercel.app',
    'https://www.hm-services.online'
]

//allow ports connection from frontend to backend
app.use(cors({
    origin: allowedOrigins,
    credentials:true
}));

//parse any incoming data
app.use(express.json());

const adminRouter = require('./Routes/admin.js');
app.use('/admin', adminRouter);
const employeeRouter = require('./Routes/employee.js');
app.use('/employee', employeeRouter);

//start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
})