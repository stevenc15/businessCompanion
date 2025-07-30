//imports
const express = require('express');
const router = express.Router();
require('dotenv').config();
const Client = require('../Schemas/clientSchema.js');
const Activity = require('../Schemas/activitySchema.js');
const {google}= require('googleapis');
const {getSheetsClient} = require('../googleClient.js');

//insert activity endpoint
router.post('/insert-activity', async(req, res) => {
    const sheets = await getSheetsClient();
    
    const formData = req.body;

    if (!formData){
        res.status(402).json({ message: 'no data is submitted/found from form'});
    }

    console.log(formData);

    const newRow = Object.values(formData);

    console.log([newRow]);

    try{
        await sheets.spreadsheets.values.append({
            spreadsheetId: '1C1X6BUa51t1XhKwQcDPXg4Mj5wYHatybBqkY_0JbrFs',
            range: 'Sheet1!A2',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [newRow],
            },
        });

        res.status(200).json({ message: 'Submitted to Sheet successfully'});
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Failed to write to sheet'});
    }
});

//Define general employee logging route
router.post('/activities', async(req, res) => {
    
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
router.get('/getSingleClient', async(req, res) => {
    const {ClientId} = req.query;

    try{
        console.log('client id: ', ClientId);

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

module.exports=router;