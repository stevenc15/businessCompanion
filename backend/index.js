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
const Client = require('./Schemas/clientSchema.js');
const Activity = require('./Schemas/activitySchema.js');
const ALLOWED_EMAILS = ['stevenacamachoperez@gmail.com', 'armandocaro282@gmail.com', 'bmmedjuck@gmail.com'];
const multer = require('multer');
const XLSX = require('xlsx');

const path = require('path');

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
    callbackURL: 'https://businesscompanion.onrender.com/auth/google/callback',
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
    'https://business-companion-seven.vercel.app'
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

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, 'stored.xlsx');
    }
});
const upload = multer({storage:storage});

//import excel file
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded');
    res.status(200).send('File uploaded successfully!');
})

//view excel file
app.get('/api/data', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', 'stored.xlsx');
    if (!fs.existsSync(filePath)){
        return res.status(404).send('No file found');
    }

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    res.json(jsonData);
});

//download/export file
app.get('/api/download', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', 'stored.xlsx');
    if (!fs.existsSync(filePath)){
        return res.status(404).send('No file found');
    }

    res.download(filePath, 'exported-file.xlsx');
});

//Define general employee logging route
app.post('/api/activities', async(req, res) => {
    
    try{
        const {
            Community, 
            ClientName, 
            Address, 
            DoorCode, 
            Service, 
            EmployeeName,
            ReviewWeeklySchedule,
            CheckMailbox,
            ViewFrontOfTheHouse,
            TurnOnMainWater,
            BugsInsideOutsideFrontDoor,
            Ceilings,
            Floors, 
            CloseClosets,
            TurnToiletsOnOff,
            GarageCeiling, 
            GarageFloor,
            AnyGarageFridge,
            AcAirHandlerDrainLine,
            TurnOnOffWaterHeaterInElectricalPanel,
            TurnOnOffIceMachine,
            ThermostatSetTo78ForClose72ForOpening,
            ViewRearOfTheHouse,
        } = req.body;

        await Activity.create({
            EmployeeName: EmployeeName,
            Community: Community,
            ClientName: ClientName,
            Address: Address,
            DoorCode: DoorCode,
            Service: Service,
            ReviewWeeklySchedule: ReviewWeeklySchedule === true || ReviewWeeklySchedule === 'true',
            CheckMailbox: CheckMailbox === true || CheckMailbox === 'true',
            ViewFrontOfTheHouse: ViewFrontOfTheHouse === true || ViewFrontOfTheHouse === 'true',
            TurnOnMainWater: TurnOnMainWater === true || TurnOnMainWater === 'true',
            BugsInsideOutsideFrontDoor: BugsInsideOutsideFrontDoor === true || BugsInsideOutsideFrontDoor === 'true',
            Ceilings: Ceilings === true || Ceilings === 'true',
            Floors: Floors === true || Floors === 'true',
            CloseClosets: CloseClosets === true || CloseClosets === 'true',
            TurnToiletsOnOff: TurnToiletsOnOff === true || TurnToiletsOnOff === 'true',
            GarageCeiling: GarageCeiling === true || GarageCeiling === 'true',
            GarageFloor: GarageFloor === true || GarageFloor === 'true',
            AnyGarageFridge: AnyGarageFridge === true || AnyGarageFridge === 'true',
            AcAirHandlerDrainLine: AcAirHandlerDrainLine === true || AcAirHandlerDrainLine === 'true',
            TurnOnOffWaterHeaterInElectricalPanel: TurnOnOffWaterHeaterInElectricalPanel === true || TurnOnOffWaterHeaterInElectricalPanel === 'true',
            TurnOnOffIceMachine: TurnOnOffIceMachine === true || TurnOnOffIceMachine === 'true',
            ThermostatSetTo78ForClose72ForOpening: ThermostatSetTo78ForClose72ForOpening === true || ThermostatSetTo78ForClose72ForOpening === 'true',
            ViewRearOfTheHouse: ViewRearOfTheHouse === true || ViewRearOfTheHouse === 'true',
        });

        res.status(200).json({message: 'successfully logged activity'});
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to save activity'});
    }     
});

//get single client
app.get('/api/getSingleClient', async(req, res) => {
    const {ClientId} = req.query;

    try{
        const client = await Client.findByPk(ClientId);

        if (!client){
            return res.status(401).json({message: 'no client found by that id'});
        }

        res.status(200).json(client);

    }catch(error){
        console.error('Error fetching client: ', error);
        res.status(500).json({message: 'Server Error'});
    }
});

//start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})