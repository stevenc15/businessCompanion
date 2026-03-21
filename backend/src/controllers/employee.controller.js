/**
 * employee.controller.js - orchestrates employee-related requests
 */

const clientService = require('../services/client.service');
const sheetService = require('../services/sheet.service');
const activityService = require('../services/activity.service');

const {getSheetsClient} = require('../services/utils/googleClient.js');

async function insertActivity(req, res) {
    const formData = req.body;

    if (!formData){
        return res.status(400).json({ message: 'no data is submitted/found from form'});
    }

    try{
        const sheets = await getSheetsClient();
        const newRow = sheetService.createRow(formData);
        await sheetService.addToSheet(newRow, sheets);
        res.status(200).json({ message: 'Submitted to Sheet successfully'});
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Failed to write to sheet'});
    }
}

async function createActivity(req, res) {
    try{
            const {
                Community, 
                ClientName, 
                Address,  
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

            if (!Community || !ClientName || !Address || !Service || !EmployeeName){
                return res.status(400).json({message: 'missing required fields'});
            }

                const newActivity = await activityService.createActivity(
                    Community, 
                    ClientName, 
                    Address, 
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
                )
            
            res.status(200).json({message: 'successfully logged activity', newActivity});
        }catch(err){
            console.error(err);
            res.status(500).json({error: 'Failed to save activity'});
        }     
}

async function getSingleClient(req, res){
    const {ClientId} = req.query;

    try{
        const client = await clientService.getOneClient(ClientId);
    
        if (!client){
            return res.status(404).json({message: 'no client found by that id'});
        }

        res.status(200).json(client);
    
    }catch(error){
        console.error('Error fetching client: ', error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = {
    insertActivity,
    createActivity,
    getSingleClient
}