const request = require('supertest');
const app = require('../app');
const { initializeTestDB } = require('./setupTestDB');
const Client = require('../src/models/Client');

// Bypass auth middleware so protected routes are reachable in tests
jest.mock('../src/routes/Route_utils/requireAuth', () => {
    return jest.fn((req, res, next) => next());
});

// Prevent googleClient.js from making real Google API calls or failing on missing creds
jest.mock('../src/services/utils/googleClient', () => ({
    getSheetsClient: jest.fn().mockResolvedValue({}),
    getDriveClient: jest.fn().mockResolvedValue({}),
}));

beforeEach(async () => {
    await initializeTestDB();
});

// ─── Client management ────────────────────────────────────────────────────────

describe('GET /admin/clients/getClients', () => {

    it('returns 200 and an array of all seeded clients', async () => {
        const res = await request(app).get('/admin/clients/getClients');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });
});

describe('POST /admin/clients/addClient', () => {

    it('returns 200 and creates a new client', async () => {
        const newClient = {
            ClientName: 'Test Client',
            Address: '1234 Test Ave',
            Community: 'Test Community',
        };
        const res = await request(app).post('/admin/clients/addClient').send(newClient);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('successfully added client to database');
        expect(res.body.client.ClientName).toBe(newClient.ClientName);
        expect(res.body.client.Address).toBe(newClient.Address);
        expect(res.body.client.Community).toBe(newClient.Community);
        const all = await Client.findAll();
        expect(all.length).toBe(3);
    });

    it('returns 400 when required fields are missing', async () => {
        const res = await request(app)
            .post('/admin/clients/addClient')
            .send({ ClientName: 'Only Name' });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBeDefined();
    });
});

describe('POST /admin/clients/editClient', () => {

    it('returns 200 and updates the target client', async () => {
        const clients = await Client.findAll();
        const target = clients[0];
        const res = await request(app).post('/admin/clients/editClient').send({
            ClientId: target.ClientId,
            ClientName: 'Updated Name',
            Address: 'Updated Address',
            Community: 'Updated Community',
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('successful edit of client info');
        expect(res.body.updatedClient.ClientName).toBe('Updated Name');
        expect(res.body.updatedClient.Address).toBe('Updated Address');
        expect(res.body.updatedClient.Community).toBe('Updated Community');
        // original values should not persist
        expect(res.body.updatedClient.ClientName).not.toBe(target.ClientName);
    });

    it('returns 404 when the client does not exist', async () => {
        const res = await request(app).post('/admin/clients/editClient').send({
            ClientId: 99999,
            ClientName: 'Ghost',
            Address: 'Nowhere',
            Community: 'None',
        });
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBeDefined();
    });
});

describe('POST /admin/clients/deleteClient', () => {

    it('returns 200 and removes the client from the database', async () => {
        const clients = await Client.findAll();
        const target = clients[0];
        const res = await request(app)
            .post('/admin/clients/deleteClient')
            .send({ ClientId: target.ClientId });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('successful deletion of client info');
        const remaining = await Client.findAll();
        expect(remaining.length).toBe(1);
        const deleted = await Client.findByPk(target.ClientId);
        expect(deleted).toBeNull();
    });

    it('returns 404 when the client does not exist', async () => {
        const res = await request(app)
            .post('/admin/clients/deleteClient')
            .send({ ClientId: 99999 });
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBeDefined();
    });
});

describe('POST /admin/clients/genQR', () => {

    it('returns 200 and a base64 PNG data URL', async () => {
        const clients = await Client.findAll();
        const target = clients[0];
        const res = await request(app)
            .post('/admin/clients/genQR')
            .send({ ClientId: target.ClientId });
        expect(res.statusCode).toBe(200);
        expect(res.body.qrCode).toBeDefined();
        expect(res.body.qrCode).toMatch(/^data:image\/png;base64,/);
    });

    it('returns 400 when ClientId is missing', async () => {
        const res = await request(app).post('/admin/clients/genQR').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBeDefined();
    });
});

// ─── Dashboard ────────────────────────────────────────────────────────────────

describe('GET /admin/dashboard/get-sheet', () => {

    it('returns 200 and the configured sheet URL', async () => {
        const res = await request(app).get('/admin/dashboard/get-sheet');
        expect(res.statusCode).toBe(200);
        expect(res.body.url).toBe(process.env.GOOGLE_SHEET_EMBED_URL);
    });
});
