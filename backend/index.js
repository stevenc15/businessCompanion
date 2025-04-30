const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const sequelize = require('./database/database.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const Admin = require('./Schemas/adminSchema.js');
const Activity = require('./Schemas/activitySchema.js');
const ALLOWED_EMAILS = ['stevenacamachoperez@gmail.com'];

app.set('trust proxy', 1);
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

passport.use(new GoogleStrategy ({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://business-companion-seven.vercel.app/auth/google/callback',
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
        res.redirect('https://business-companion-seven.vercel.app/activityDashboard');
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
    'https://business-companion-seven.vercel.app/'
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

//Define general employee logging route
app.post('/api/activities', async(req, res) => {
    
    try{
        const {Community, Address, DoorCode, Service, EmployeeName} = req.body;

        const activity = await Activity.create({
            EmployeeName: EmployeeName,
            Community: Community,
            Address: Address,
            DoorCode: DoorCode,
            Service: Service
        });

        res.status(200).json({message: 'successfully logged activity'});
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to save activity'});
    }     
});

//start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})