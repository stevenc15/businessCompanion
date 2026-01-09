const request = require('supertest');
const app = require('../app');
const {initializeTestDB} = require('./setupTestDB');
const Client = require('../src/models/Client');

beforeEach(async () => {
    await initializeTestDB();
});

describe('Employee routes (SQLite in-memory DB)', () => {

    // Test insert-activity endpoint
    it('POST /employee/create-activity', async () =>{
        const activityFormData = {
            EmployeeName: "John Smith",
            Community: "Sunset Villas",
            ClientName: "Maria Lopez",
            Address: "1234 Palm Ave, Miami FL",
            Service: "Home Watch",
            EmployeeName:false,
            ReviewWeeklySchedule:false,
            CheckMailbox:false,
            ViewFrontOfTheHouse:false,
            TurnOnMainWater:false,
            BugsInsideOutsideFrontDoor:false,
            Ceilings:false,
            Floors:false, 
            CloseClosets:false,
            TurnToiletsOnOff:false,
            GarageCeiling:false, 
            GarageFloor:false,
            AnyGarageFridge:false,
            AcAirHandlerDrainLine:false,
            TurnOnOffWaterHeaterInElectricalPanel:false,
            TurnOnOffIceMachine:false,
            ThermostatSetTo78ForClose72ForOpening:false,
            ViewRearOfTheHouse:false,
        };
        
        const res = await request(app)
          .post('/employee/create-activities')
          .send(activityFormData);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('successfully logged activity');
        expect(res.body.newActivity).toBeDefined();
    });

    // Test getSingleClient endpoint
    it('GET /employee/getSingleClient', async () => {
        const clientsBefore = await Client.findAll();
        expect(clientsBefore.length).toBe(2);

        const clientToGet = clientsBefore[0];

        const res = await request(app)
          .get('/employee/getSingleClient')
          .send({ClientId: clientToGet.ClientId});

        expect(res.statusCode).toBe(200);
        expect(res.body.client).toBeDefined();
    });

    //test addactivity endpoint
})