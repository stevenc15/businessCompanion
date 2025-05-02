const express = require('express');
const router = express.Router();
const Admin = require('../Schemas/adminSchema.js'); //admin model
const Activity = require('../Schemas/activitySchema.js'); //activity model
const Client = require('../Schemas/clientSchema.js'); //activity model
const {Op} = require('sequelize'); //operator from sequelize module
const saltRounds=10; //how many times password gets hashed
require('dotenv').config();
const jwtKey = process.env.JWT_SECRET; //jwt key
const ensureAuthenticated = require ('./Route_utils/authentication'); //create helper function `for jwts
const QRCode = require('qrcode');

/*
router.post('/login', async(req, res) =>{
    try{

        const {email, password} = req.body;

        const user = await Admin.findOne({
            where: {email:email}
        });

        if (!user){
            return res.status(401).json({message: 'Invalid Username'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(404).json({message: 'Invalid Password'});
        }

        const token = jwt.sign({id: user.id}, jwtKey, {expiresIn: '1h'});

        res.cookie('token', token, {
            httpOnly: true,   // Prevents access from JavaScript
            //secure: true,     // Only over HTTPS, temporary removal for local dev
            sameSite: 'Lax', //change to strict later
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        res.status(200).json({id:user.id, message: 'Logged in Successfully'});
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed Login'})
    }
});

router.post('/resetPasswordEmail', async(req, res)=>{
    try{
        const {email} = req.body; //email required as input

        //check if email is in system
        const user = await Admin.findOne({
            where: {email:email}
        });

        if (!user){
            return res.status(400).json({message: 'no email matching to any user'});
        }

        //generate password reset token
        const passwordT = genToken();

        //assign password token for verification
        user.passwordVtoken=passwordT;
        await user.save();

        //send password change email
        sendPchange(user.email, passwordT);

        res.status(200).json({message: 'success'});
    }catch(error){
        res.status(500).send(error);
    }
});


//CHECKED for 400, 200, given success here, move to reset password page
router.post('/enterResetCode', async(req, res)=>{
    try{
        const {code} = req.body; //code required for input

        //check if token valid in database
        const user = await Admin.findOne({
            where:{passwordVtoken:code}
        });
        if(!user){
            return res.status(400).json({message: 'code incorrect or no matching code found'});
        }

        //remove token from user arsenal
        user.passwordVtoken = null;
        await user.save();

        res.status(200).json({message: 'success'});
    }catch(error){
        res.status(500).send(error)
    }   
});

//CHECKED for 200, 402, 401, 400
router.post('/changePassword', async(req, res) =>{

    try{
        const {email, newPassword, confirmPassword} = req.body; //username, new password and confirm new password

        //check if username is valid
        const user = await Admin.findOne({
            where: {email:email}
        });
        if (!user){
            return res.status(400).json({message: 'incorrect username'});
        }

        //check if new password matches copy
        if (newPassword!=confirmPassword){
            return res.status(401).json({message: 'passwords do not match'});
        }

        //check if password is repeated
        const isMatch = await bcrypt.compare(confirmPassword, user.password);
        if (isMatch){
            return res.status(402).json({message: 'new password cannot match old password'});
        }

        //hash password
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        //change user password
        user.password=hashedPassword;
        await user.save();

        res.status(200).json({message:'success'});
    }catch(error){
        res.status(500).send(error);
    }
});
*/

router.patch('/approve', ensureAuthenticated, async(req, res) => {
    try{
        const {ActivityId} = req.body;


        const activity = await Activity.findOne({
            where: {ActivityId: ActivityId}
        });

        if (!activity){
            return res.status(404).json({message: 'Activity not found in database'})
        }

        activity.Status=true;
        await activity.save();

        res.status(200).json({message: 'Successfully approved activity'});
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to change activity status to Approved'})
    }
});

router.patch('/unapprove', ensureAuthenticated, async(req, res) => {
    try{
        const {ActivityId} = req.body;


        const activity = await Activity.findOne({
            where: {ActivityId: ActivityId}
        });

        if (!activity){
            return res.status(404).json({message: 'Activity not found in database'})
        }

        activity.Status=false;
        await activity.save();

        res.status(200).json({message: 'Successfully unapproved activity'});
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to change activity status to Unapproved'})
    }
});

router.get('/getActivities', ensureAuthenticated, async (req, res)=>{
    try{
        const activities = await Activity.findAll();
    if (!activities){
        return res.status(401).json({message:'error retrieving activities'});
    }
        res.status(200).json(activities);
    }catch(error){
        res.status(500).json({message: 'failed to retrieve activity data'});
    }
});

//fetch clients
router.get('/getClients', ensureAuthenticated, async (req, res)=>{
    try{
        const clients = await Client.findAll();
        if (!clients){
            return res.status(401).json({message: 'error retrieving clients'});
        }
        res.status(200).json(clients);
    }catch(error){
        res.status(500).json({message: 'failed to retrieve client data'})
    }
})


//add client
router.post('/addClient', ensureAuthenticated, async (req, res)=> {

    try{
        const {ClientName, Address, Community} = req.body;

        await Client.create({
            ClientName: ClientName,
            Address: Address,
            Community: Community
        });

        res.status(200).json({message: 'successfully added client to database'});
    }catch(error){
        console.error(err);
        res.status(500).json({error: 'Failed to save client'});
    }
});

//get QR 
router.post('/getQR', ensureAuthenticated, async (req, res)=> {
    try{
        const {ClientId} = req.body;

        if (!ClientId){
            return res.status(401).json({ message:'Client ID missing '});
        }

        const qrLink = `https://business-companion-seven.vercel.app/employee?ClientId=${ClientId}`;

        const qrCodeDataURL = await QRCode.toDataURL(qrLink);

        if (!qrCodeDataURL){
            return res.status(405).json({message: 'unsuccessful qr code generation'});
        }
        
        res.status(200).json({qrCode: qrCodeDataURL});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
});

//modify client
router.post('/editClient', ensureAuthenticated, async (req, res)=> {
    try{
        const {ClientId, ClientName, Address, Community} = req.body;

        const client = await Client.findOne({
            where: {ClientId: ClientId}
        });

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        client.ClientName=ClientName;
        client.Address=Address;
        client.Community=Community;

        await client.save();
        
        res.status(200).json({message: 'successful edit of client info'});

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to edit client data'});
    }
});

//delete client
router.post('/deleteClient', ensureAuthenticated, async (req, res)=> {
    try{
        const {ClientId} = req.body;

        const client = await Client.findOne({
            where: {ClientId: ClientId}
        });

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        await client.destroy();
        
        res.status(200).json({message: 'successful deletion of client info'});

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to delete client data'});
    }
});

//modify Activity
router.post('/editActivity', ensureAuthenticated, async (req, res)=> {
    try{
        const {ActivityId, EmployeeName, Community, Address, DoorCode, Service} = req.body;

        const activity = await Activity.findOne({
            where: {ActivityId: ActivityId}
        });

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        
        activity.EmployeeName=EmployeeName;
        activity.Community=Community;
        activity.Address=Address;
        activity.DoorCode=DoorCode;
        activity.Service=Service;

        await activity.save();
        
        res.status(200).json({message: 'successful edit of activity info'});

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to edit activity data'});
    }
});

//delete activity
router.post('/deleteActivity', ensureAuthenticated, async (req, res)=> {
    try{
        const {ActivityId} = req.body;

        const activity = await Activity.findOne({
            where: {ActivityId: ActivityId}
        });

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        await activity.destroy();
        
        res.status(200).json({message: 'successful deletion of activity info'});

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to delete activity data'});
    }
});


router.post('/addActivity', ensureAuthenticated, async (req, res)=> {
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

module.exports = router;