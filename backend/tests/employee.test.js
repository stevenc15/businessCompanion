const request = require('supertest');
const app = require('../app');
const { initializeTestDB } = require('./setupTestDB');
const Client = require('../src/models/Client');
const Activity = require('../src/models/Activity');

// Mock employee auth middleware to pass through in tests
jest.mock('../src/routes/Route_utils/requireEmployeeAuth', () => (req, res, next) => next());

// Mock link token verification to always return a valid payload in tests
jest.mock('../src/utils/linkToken', () => ({
    generateLinkToken: jest.fn().mockReturnValue('test-token'),
    verifyLinkToken: jest.fn().mockReturnValue({ clientId: 1 }),
}));

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

// Mock email service so failure-notification tests don't hit the real Resend API
jest.mock('../src/services/email.service', () => ({
    sendEmployeeLinks: jest.fn().mockResolvedValue(),
    notifyAdminsOfSubmissionFailure: jest.fn().mockResolvedValue(),
}));

const { getSheetsClient } = require('../src/services/utils/googleClient');
const emailService = require('../src/services/email.service');
const activityService = require('../src/services/activity.service');

beforeEach(async () => {
    await initializeTestDB();
    jest.clearAllMocks();
    getSheetsClient.mockResolvedValue({
        spreadsheets: {
            values: {
                append: jest.fn().mockResolvedValue({}),
            },
        },
    });
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

// ─── insert-activity (writes to the activities table and the Google Sheet) ────

describe('POST /employee/insert-activity', () => {

    const validBody = {
        EmployeeName: 'John Smith',
        Community: 'Sunset Villas',
        ClientName: 'Maria Lopez',
        Address: '1234 Palm Ave, Miami FL',
        Service: 'Home Watch',
        token: 'test-token',
    };

    it('returns 200, saves the activity to the database, and writes to the sheet', async () => {
        const res = await request(app)
            .post('/employee/insert-activity')
            .send(validBody);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Activity logged successfully.');
        expect(res.body.database).toEqual({ success: true, message: 'Saved to the database.' });
        expect(res.body.sheet).toEqual({ success: true, message: 'Synced to the spreadsheet.' });
        expect(res.body.newActivity).toBeDefined();
        expect(emailService.notifyAdminsOfSubmissionFailure).not.toHaveBeenCalled();

        const saved = await Activity.findOne({ where: { ClientName: 'Maria Lopez' } });
        expect(saved).not.toBeNull();
        expect(saved.EmployeeName).toBe('John Smith');
    });

    it('returns 200 but flags the sheet failure when the sheet write fails, and notifies admins', async () => {
        getSheetsClient.mockRejectedValueOnce(new Error('Sheets API unavailable'));

        const res = await request(app)
            .post('/employee/insert-activity')
            .send(validBody);

        expect(res.statusCode).toBe(200);
        expect(res.body.database.success).toBe(true);
        expect(res.body.sheet.success).toBe(false);
        expect(res.body.message).toMatch(/spreadsheet sync failed/);
        expect(emailService.notifyAdminsOfSubmissionFailure).toHaveBeenCalledTimes(1);
        expect(emailService.notifyAdminsOfSubmissionFailure).toHaveBeenCalledWith(
            expect.objectContaining({ dbSuccess: true, sheetSuccess: false })
        );

        const saved = await Activity.findOne({ where: { ClientName: 'Maria Lopez' } });
        expect(saved).not.toBeNull();
    });

    it('returns 500 and asks for a resubmit when the database write fails, and notifies admins', async () => {
        jest.spyOn(activityService, 'createActivity').mockRejectedValueOnce(new Error('DB unavailable'));

        const res = await request(app)
            .post('/employee/insert-activity')
            .send(validBody);

        expect(res.statusCode).toBe(500);
        expect(res.body.database.success).toBe(false);
        expect(res.body.sheet.success).toBe(true);
        expect(res.body.message).toMatch(/please resubmit/i);
        expect(emailService.notifyAdminsOfSubmissionFailure).toHaveBeenCalledTimes(1);
        expect(emailService.notifyAdminsOfSubmissionFailure).toHaveBeenCalledWith(
            expect.objectContaining({ dbSuccess: false, sheetSuccess: true })
        );

        const saved = await Activity.findOne({ where: { ClientName: 'Maria Lopez' } });
        expect(saved).toBeNull();
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
