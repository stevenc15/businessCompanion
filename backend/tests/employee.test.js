const request = require('supertest');
const app = require('../app');
const { initializeTestDB } = require('./setupTestDB');
const Client = require('../src/models/Client');

// Mock getSheetsClient to return a fake sheets client with the methods used by insertActivity
jest.mock('../src/services/utils/googleClient', () => ({
    getSheetsClient: jest.fn().mockResolvedValue({
        spreadsheets: {
            values: {
                append: jest.fn().mockResolvedValue({}),
            },
        },
    }),
    getDriveClient: jest.fn().mockResolvedValue({}),
}));

beforeEach(async () => {
    await initializeTestDB();
});

// ─── create-activities ────────────────────────────────────────────────────────

describe('POST /employee/create-activities', () => {

    const validActivity = {
        EmployeeName: 'John Smith',
        Community: 'Sunset Villas',
        ClientName: 'Maria Lopez',
        Address: '1234 Palm Ave, Miami FL',
        Service: 'Home Watch',
        ReviewWeeklySchedule: false,
        CheckMailbox: false,
        ViewFrontOfTheHouse: false,
        TurnOnMainWater: false,
        BugsInsideOutsideFrontDoor: false,
        Ceilings: false,
        Floors: false,
        CloseClosets: false,
        TurnToiletsOnOff: false,
        GarageCeiling: false,
        GarageFloor: false,
        AnyGarageFridge: false,
        AcAirHandlerDrainLine: false,
        TurnOnOffWaterHeaterInElectricalPanel: false,
        TurnOnOffIceMachine: false,
        ThermostatSetTo78ForClose72ForOpening: false,
        ViewRearOfTheHouse: false,
    };

    it('returns 200 and creates the activity record', async () => {
        const res = await request(app)
            .post('/employee/create-activities')
            .send(validActivity);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('successfully logged activity');
        expect(res.body.newActivity).toBeDefined();
        expect(res.body.newActivity.EmployeeName).toBe('John Smith');
        expect(res.body.newActivity.Community).toBe('Sunset Villas');
        expect(res.body.newActivity.ClientName).toBe('Maria Lopez');
    });

    it('returns 400 when required fields are missing', async () => {
        const res = await request(app)
            .post('/employee/create-activities')
            .send({ EmployeeName: 'Jane Doe' }); // missing Community, ClientName, Address, Service
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('missing required fields');
    });
});

// ─── insert-activity (Google Sheet write) ─────────────────────────────────────

describe('POST /employee/insert-activity', () => {

    it('returns 200 when sheet write succeeds', async () => {
        const res = await request(app)
            .post('/employee/insert-activity')
            .send({
                EmployeeName: 'John Smith',
                Community: 'Sunset Villas',
                ClientName: 'Maria Lopez',
                Address: '1234 Palm Ave, Miami FL',
                Service: 'Home Watch',
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Submitted to Sheet successfully');
    });
});

// ─── getSingleClient ──────────────────────────────────────────────────────────

describe('GET /employee/getSingleClient', () => {

    it('returns 200 and the client object directly', async () => {
        const clients = await Client.findAll();
        const target = clients[0];
        const res = await request(app)
            .get('/employee/getSingleClient')
            .query({ ClientId: target.ClientId });
        expect(res.statusCode).toBe(200);
        // After fix (issue 7), client is returned directly — not wrapped in { client: ... }
        expect(res.body.ClientId).toBe(target.ClientId);
        expect(res.body.ClientName).toBe(target.ClientName);
        expect(res.body.Address).toBe(target.Address);
        expect(res.body.Community).toBe(target.Community);
    });

    it('returns 404 when the client does not exist', async () => {
        const res = await request(app)
            .get('/employee/getSingleClient')
            .query({ ClientId: 99999 });
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBeDefined();
    });
});
