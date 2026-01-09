const request = require('supertest');
const app = require('../app');
const {initializeTestDB} = require('./setupTestDB');
const requireAuth = require('../src/routes/Route_utils/requireAuth');
const Client = require('../src/models/Client');

jest.mock('../src/routes/Route_utils/requireAuth', () => {
    return jest.fn((req, res, next) => next());
});

beforeEach(async () => {
    await initializeTestDB();
});

describe('Admin routes (SQLite in-memory DB)', () => {

    // Test getClients endpoint
    it('GET /admin/clients/getClient should return 200 and an array', async () =>{
        const res = await request(app).get('/admin/clients/getClients');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });

    // Test addClients endpoint
    it('POST /admin/clients/addClient', async () => {
        const newClient = {
            ClientName: 'test name',
            Address: '1234 ave',
            Community: 'example circle',
        };

        const res = await request(app)
          .post('/admin/clients/addClient')
          .send(newClient);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('successfully added client to database');
        expect(res.body.client).toBeDefined();

        expect(res.body.client.ClientName).toBe(newClient.ClientName);
        expect(res.body.client.Address).toBe(newClient.Address);
        expect(res.body.client.Community).toBe(newClient.Community);

        const clients = await Client.findAll();
        expect(clients.length).toBe(3);
    });

    // Test deleteClient endpoint
    it('POST /admin/clients/deleteClient', async () => {
        const clientsBefore = await Client.findAll();
        expect(clientsBefore.length).toBe(2);

        const clientToDelete = clientsBefore[0];
        
        const res = await request(app)
          .post('/admin/clients/deleteClient')
          .send({ClientId: clientToDelete.ClientId});

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('successful deletion of client info');

        const clients = await Client.findAll();
        expect(clients.length).toBe(1);

        const deletedClient = await Client.findByPk(clientToDelete.ClientId);
        expect(deletedClient).toBeNull();
    });

    // Test editClient endpoint
    it('POST /admin/clients/editClient', async () => {
        const clientsBefore = await Client.findAll();
        expect(clientsBefore.length).toBe(2);

        const clientToEdit = clientsBefore[0];

        const newClient = {
            ClientId: clientToEdit.ClientId, 
            ClientName: 'Utest name',
            Address: 'U1234 ave',
            Community: 'Uexample circle',
        };

        const res = await request(app)
          .post('/admin/clients/editClient')
          .send(newClient);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('successful edit of client info');
        expect(res.body.updatedClient).toBeDefined();

        expect(res.body.updatedClient.ClientName).toBe(newClient.ClientName);
        expect(res.body.updatedClient.Address).toBe(newClient.Address);
        expect(res.body.updatedClient.Community).toBe(newClient.Community);

        expect(res.body.updatedClient.ClientName).not.toBe(clientToEdit.ClientName);
        expect(res.body.updatedClient.Address).not.toBe(clientToEdit.Address);
        expect(res.body.updatedClient.Community).not.toBe(clientToEdit.Community);
    })

    // Test getQR endpoint
    it('POST /admin/clients/genQR', async () => {
        const clientsBefore = await Client.findAll();
        expect(clientsBefore.length).toBe(2);

        const clientToGetQR = clientsBefore[0];

        const res = await request(app)
          .post('/admin/clients/genQR')
          .send({ClientId: clientToGetQR.ClientId});

        expect(res.statusCode).toBe(200);
        expect(res.body.qrCode).toBeDefined();
    })

    // Test get-sheet endpoint
    it('GET /admin/dashboard/get-sheet', async () => {

        const res = await request(app)
          .get('/admin/dashboard/get-sheet');

        expect(res.statusCode).toBe(200);
        expect(res.body.url).toBeDefined();
    })

    // Test get-export-sheet endpoint
})