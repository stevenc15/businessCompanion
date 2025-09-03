# Business Companion
A lightweight application that digitizes a small business owner's workflow by replacing manual, paper-based logging with an automated integrated with Google Sheets.

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Usage Flow](#usage-flow)
- [Data & Storage](#data-&-storage)


## Overview
- Problem: The business owner previously tracked and maintained client inspections by hand on paper, leading to a lengthy 20-hour process for organizing and handling the data.
- Audience: Employers, employees, clients of the business.
- What it does: Provides a digital system in which the business owner can manage records fo client inspections via a centralized Google Sheets file, which stores and accepts submissions from employees through the scanning of a client info-linked QR code.
- Value: Streamlines workflow, reduces manual effort, centralizes records, and allows weekly automatic logging and archival. 

## Key Features
- Employer Activity Dashboard: Monitor client inspection data through viewer window for Google Sheet file.
- Client Dashboard & QR Codes: Generate and print QR codes that prefill client information.
- Employee Submission Forms: Scan QR codes -> auto-filled client data -> employee enters details of house inspection.
- Google Sheets Integration: Automatic logging of submissions into a Sheets file accesible by the employer.
- Weekly Data Management: Thhe system automatically creates a new blank sheet each week, archiving the previous one for records.
- Export & Adjustments: Employer can view, edit, or export records at any time.

## Architecure
- Employer: Views activity dashboard, client data, creates QR codes from client data, and exports logs.
- Employees: Scan QR -> fill form -> data auto-logged.
- Google Sheets: Acts as the primary datastore and reporting tool.

## Tech Stack
- Frontend: React
- Backend: Express, Node.js, Google Auth
- Database: Google Sheets (primary data source).
- Integrations: Google Sheets API

## Usage Flow
1. Employer logs into dashboard -> generates client QR code.
2. Employee scans QR -> form opens with client info prefilled.
3. Employee submits inspection details.
4. Submission auto-logs into Google Sheets.
5. At week's end, app archives sheet & opens a new one 

## Data & Storage 
- Google Sheets: primary storage of all inspection logs.
- Weekly Archive: Automatically rotates to a new sheet each week.
- Exports: Employer can export Sheets data in multiple formats.
