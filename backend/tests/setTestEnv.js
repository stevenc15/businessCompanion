/**
 * setTestEnv.js - sets fake environment variables before any test module is loaded.
 * Runs via jest.config.js setupFiles, before imports, so googleClient.js env var
 * validation and passport strategy setup both see defined values.
 */

process.env.GOOGLE_CLIENT_ID = 'test-google-client-id';
process.env.GOOGLE_CLIENT_SECRET = 'test-google-client-secret';
process.env.GOOGLE_SHEET_ID = 'test-sheet-id';
process.env.GOOGLE_SHEET_EMBED_URL = 'https://docs.google.com/spreadsheets/d/test/edit';
process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS = JSON.stringify({ type: 'service_account', project_id: 'test' });
process.env.SESSION_SECRET = 'test-session-secret';
process.env.FRONTEND_URL = 'http://localhost:5173';
process.env.BACKEND_URL = 'http://localhost:5001';
