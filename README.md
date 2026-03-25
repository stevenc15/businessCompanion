# Business Companion

A full-stack web application that digitizes a small business owner's workflow by replacing manual paper-based inspection logging with an automated system integrated with Google Sheets.

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Database](#database)
- [Security](#security)
- [Usage Flow](#usage-flow)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Testing](#testing)

---

## Overview

**Problem:** The business owner previously tracked client inspections by hand on paper, resulting in a lengthy manual process for organizing and maintaining records.

**Audience:** Admin (business owner), Employees (field workers), Clients (property owners).

**What it does:** Provides a digital system where the admin manages client records, generates secure form links (via email or QR code), and employees submit inspection checklists that are automatically logged into Google Sheets.

**Value:** Streamlines workflow, reduces manual effort, centralizes records, and prevents unauthorized form submissions through multi-layer authentication.

---

## Key Features

- **Admin Dashboard** — View, filter, and export all employee inspection records from a Google Sheets-backed dashboard.
- **Client Management** — Full CRUD for client profiles (name, address, community). Supports single and bulk deletion.
- **QR Code Generation** — Generate printable QR codes per client that open the employee form pre-filled with client data.
- **Email Link Sending** — Admin selects an employee and multiple clients, and sends one email containing signed, time-limited links for each client form.
- **Employee Whitelist** — Admin manages which Google accounts are permitted to submit forms. Unauthorized Google accounts are rejected.
- **Secure Employee Forms** — Forms require both a valid Google session (whitelisted email) and a valid 24-hour signed JWT token embedded in the link.
- **Google Sheets Integration** — Every form submission is appended as a new row in the connected Google Sheet in real time.
- **Session Persistence** — Sessions are stored in PostgreSQL, so employees stay logged in across server restarts for 24 hours.

---

## Architecture

```
Browser (Vercel)                Backend (Render)              External Services
────────────────                ────────────────              ─────────────────
Admin UI         ←── REST ──→  Express API (Node.js)  ←───→ PostgreSQL (NeonDB)
Employee Form    ←── REST ──→                          ←───→ Google Sheets API
                                      ↕                ←───→ Google OAuth
                               Session Store (PostgreSQL)
                                                       ←───→ Resend (email)
```

**Frontend** is a React SPA hosted on Vercel. All routing is client-side via React Router.

**Backend** is an Express server hosted on Render. It handles authentication, database operations, Google Sheets writes, QR generation, and email delivery.

**Database** is a PostgreSQL instance on NeonDB, managed via Sequelize ORM.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, React Router |
| Backend | Node.js, Express |
| Database | PostgreSQL (NeonDB), Sequelize ORM |
| Authentication | Passport.js, Google OAuth 2.0 |
| Sessions | express-session, connect-pg-simple |
| Google Sheets | Google Sheets API (service account) |
| QR Codes | qrcode |
| Email | Resend |
| Security | Helmet, express-rate-limit, JWT (jsonwebtoken) |
| Testing | Jest, Supertest |
| Hosting | Vercel (frontend), Render (backend) |

---

## Database

### Tables

**`admins`**
Stores the email addresses of users who are permitted to log in as admin. Entries are managed directly in the database.

**`clients`**
Stores client profiles used to pre-fill employee forms and generate links.

| Column | Type | Notes |
|---|---|---|
| ClientId | INTEGER | Primary key, auto-increment |
| ClientName | STRING | Required |
| Address | STRING | Required |
| Community | STRING | Required |

**`activities`**
Stores a copy of every inspection form submission as a record.

| Column | Type | Notes |
|---|---|---|
| ActivityId | INTEGER | Primary key, auto-increment |
| EmployeeName | STRING | Required |
| Community | STRING | Required |
| ClientName | STRING | Required |
| Address | STRING | Required |
| Service | STRING | Required |
| ReviewWeeklySchedule | BOOLEAN | Default false |
| CheckMailbox | BOOLEAN | Default false |
| ViewFrontOfTheHouse | BOOLEAN | Default false |
| TurnOnMainWater | BOOLEAN | Default false |
| BugsInsideOutsideFrontDoor | BOOLEAN | Default false |
| Ceilings | BOOLEAN | Default false |
| Floors | BOOLEAN | Default false |
| CloseClosets | BOOLEAN | Default false |
| TurnToiletsOnOff | BOOLEAN | Default false |
| GarageCeiling | BOOLEAN | Default false |
| GarageFloor | BOOLEAN | Default false |
| AnyGarageFridge | BOOLEAN | Default false |
| AcAirHandlerDrainLine | BOOLEAN | Default false |
| TurnOnOffWaterHeaterInElectricalPanel | BOOLEAN | Default false |
| TurnOnOffIceMachine | BOOLEAN | Default false |
| ThermostatSetTo78ForClose72ForOpening | BOOLEAN | Default false |
| ViewRearOfTheHouse | BOOLEAN | Default false |

**`employees`**
The email whitelist. Only Google accounts with an email stored here can authenticate as an employee and submit forms.

| Column | Type | Notes |
|---|---|---|
| id | INTEGER | Primary key, auto-increment |
| email | STRING | Required, unique |
| name | STRING | Optional |

**`session`**
Managed automatically by connect-pg-simple. Stores server-side session data so sessions survive Render server restarts.

---

## Security

The application uses multiple layers of security:

### 1. HTTP Security Headers (Helmet)
Applied globally. Sets `Content-Security-Policy`, `X-Frame-Options` (anti-clickjacking), `X-Content-Type-Options`, removes `X-Powered-By`, and more.

### 2. CORS
Only the configured frontend URL and `localhost:5173` are accepted. All other origins are blocked. `credentials: true` allows session cookies to be sent cross-origin.

### 3. Request Body Size Limit
`express.json({ limit: '10kb' })` prevents large payload abuse.

### 4. Rate Limiting
- **Employee form** (`/employee/insert-activity`): 10 requests per 15 minutes per IP
- **Admin auth routes**: 20 requests per 15 minutes per IP
- Returns standard `RateLimit-*` headers.

### 5. Admin Authentication
Google OAuth via Passport.js. After Google returns the user profile, the email is checked against the `admins` table. Only matching emails receive a session. Sessions are stored in PostgreSQL with a 24-hour cookie.

### 6. Employee Authentication
A separate Google OAuth strategy (`google-employee`) with its own callback URL. After Google returns the profile, the email is checked against the `employees` whitelist table. Only whitelisted emails receive an employee session. Sessions last 24 hours — employees stay logged in all day without re-authenticating between forms.

### 7. JWT Link Tokens
Every form link (email or QR) contains a signed JWT: `{ clientId, iat, exp }` signed with `LINK_SECRET` and valid for 24 hours. The backend cryptographically verifies the signature and expiry on every submission. Tokens cannot be forged without the secret, and expired tokens are rejected.

### 8. Double-Layer Form Protection
`POST /employee/insert-activity` requires **both**:
- A valid employee Google session (whitelisted email)
- A valid, unexpired JWT token in the request

An unauthenticated user with a stolen link cannot submit. An authenticated employee without a valid link cannot submit.

### 9. Input Validation
All text fields on form submission are validated: required, non-empty after trim, must be strings, max 200 characters. Prevents injection of oversized or malformed data.

### 10. Cache-Control: no-store
Applied to all endpoints that return sensitive data (client lists, employee lists, sheet URLs) to prevent browser and proxy caching.

### 11. Persistent Session Store
Sessions are stored in PostgreSQL rather than in-memory. Server restarts (common on Render's free tier) do not log users out.

---

## Usage Flow

### Admin Flow
1. Admin navigates to the app and signs in with their Google account.
2. Email is verified against the `admins` table — only authorized accounts proceed.
3. Admin lands on the **Activity Dashboard**, which displays the Google Sheet with all inspection records.
4. Admin navigates to the **Client Dashboard** to manage client profiles (add, edit, delete, bulk delete).
5. Per client, admin can:
   - Generate a **QR code** to print and post at the property.
   - Send **email links** — select an employee from the whitelist and one or more clients; one email is sent containing a signed, 24-hour form link per client.
6. Admin can manage the **employee whitelist** via the Employee Management page (add/remove emails).

### Employee Flow
1. Employee receives an email with form links, or scans a QR code at a property.
2. If not signed in, they are redirected to a Google sign-in page. Their Google account email must be in the employee whitelist.
3. After sign-in, they are redirected back to the form URL. The form is pre-filled with the client's name, address, and community.
4. Employee fills in their name, service type, and the inspection checklist.
5. On submit, the backend verifies their session and the link token, then appends the data to the Google Sheet.
6. For remaining properties that day, the employee goes directly to the form without re-authenticating (24-hour session).

---

## API Reference

### Auth — Admin (`/auth`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/auth/status` | Returns whether the current session is an authenticated admin |
| GET | `/auth/login/google` | Initiates admin Google OAuth |
| GET | `/auth/login/google/callback` | Google callback — verifies email, creates session |
| GET | `/auth/logout` | Destroys admin session |

### Auth — Employee (`/auth/employee`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/auth/employee/status` | Returns whether the current session is an authenticated employee |
| GET | `/auth/employee/login/google` | Initiates employee Google OAuth, stores return URL in session |
| GET | `/auth/employee/login/google/callback` | Google callback — verifies email against whitelist, redirects to form |
| GET | `/auth/employee/logout` | Destroys employee session |

### Admin (`/admin`) — All require admin session

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/dashboard/get-sheet` | Returns the Google Sheet embed URL |
| GET | `/admin/dashboard/get-export-sheet` | Streams the sheet as an XLSX download |
| GET | `/admin/clients/getClients` | Returns all clients |
| POST | `/admin/clients/addClient` | Creates a client record |
| POST | `/admin/clients/editClient` | Updates a client record |
| POST | `/admin/clients/deleteClient` | Deletes a single client |
| POST | `/admin/clients/bulkDeleteClients` | Deletes multiple clients by ID array |
| POST | `/admin/clients/genQR` | Generates a QR code data URL for a client |
| GET | `/admin/employees/getEmployees` | Lists all whitelisted employee emails |
| POST | `/admin/employees/addEmployee` | Adds an email to the employee whitelist |
| POST | `/admin/employees/deleteEmployee` | Removes an email from the whitelist |
| POST | `/admin/email/sendLinks` | Sends signed form links to an employee via email |

### Employee (`/employee`)
| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | `/employee/insert-activity` | Employee session + valid JWT token | Writes form submission to Google Sheet |
| POST | `/employee/create-activities` | None | Saves activity record to PostgreSQL |
| GET | `/employee/getSingleClient` | None | Returns a single client by ID (used for form pre-fill) |

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (NeonDB) |
| `JWT_SECRET` | Secret for admin JWT signing |
| `LINK_SECRET` | Secret for signing 24-hour employee form link tokens |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_SHEET_ID` | ID of the Google Sheet for activity logging |
| `GOOGLE_SHEET_EMBED_URL` | Embed URL for the sheet iframe |
| `GOOGLE_SHEET_EXPORT_URL` | Export URL for XLSX download |
| `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS` | JSON credentials for the Google service account |
| `SESSION_SECRET` | Secret for signing session cookies |
| `RESEND_API_KEY` | API key for Resend email service |
| `RESEND_FROM_EMAIL` | Sender address for outgoing emails |
| `FRONTEND_URL` | Production frontend URL (Vercel) |
| `BACKEND_URL` | Production backend URL (Render) |
| `PORT` | Port the backend listens on (default: 5001) |
| `NODE_ENV` | `development` or `production` |

---

## Running Locally

**Prerequisites:** Node.js, a PostgreSQL database, Google OAuth credentials, a Google service account with Sheets access.

**Terminal 1 — Backend**
```bash
cd backend
npm install
# Create a .env file with all required environment variables
npm run dev
# Runs on http://localhost:5001
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## Testing

The backend has a Jest + Supertest test suite covering auth, admin routes, employee routes, and health checks.

```bash
cd backend
npm test
```

Tests use an in-memory SQLite database and mock the Google Sheets client and employee auth middleware so no external services are called during testing.
