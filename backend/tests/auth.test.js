const request = require('supertest');
const app = require('../app');
const { initializeTestDB } = require('./setupTestDB');

jest.mock('../src/services/utils/googleClient', () => ({
    getSheetsClient: jest.fn().mockResolvedValue({}),
    getDriveClient: jest.fn().mockResolvedValue({}),
}));

beforeEach(async () => {
    await initializeTestDB();
});

// ─── /auth/status ─────────────────────────────────────────────────────────────

describe('GET /auth/status', () => {

    it('returns 200 with authenticated: false when no session exists', async () => {
        const res = await request(app).get('/auth/status');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ authenticated: false });
    });
});

// ─── /auth/login/google ───────────────────────────────────────────────────────

describe('GET /auth/login/google', () => {

    it('redirects to Google OAuth (302)', async () => {
        const res = await request(app).get('/auth/login/google');
        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toContain('accounts.google.com');
    });
});

// ─── /auth/logout ─────────────────────────────────────────────────────────────

describe('GET /auth/logout', () => {

    it('redirects after logout (302)', async () => {
        const res = await request(app).get('/auth/logout');
        expect(res.statusCode).toBe(302);
    });
});
