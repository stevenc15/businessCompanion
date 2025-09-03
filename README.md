# Business Companion
A lightweight application that digitizes a small business owner's workflow by replacing manual, paper-based logging with an automated integrated with Google Sheets.

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development Process](#development-process)
- [Challenges and Learnings](#challenges-and-learnings)

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

## Usage

## Project Structure
```bash
TrackMate/
├── backend
│   ├── ML
│   ├── Routes
│   ├── Routes_help
│   ├── Schemas
│   ├── __tests__
│   ├── backend_details.env
│   ├── cloud_database
│   ├── database
│   ├── docker_details.env
│   ├── inputs
│   ├── server.js
│   └── v_e_utils
├── db_init
│   └── init.sql
├── frontend
│   ├── frontEnd.env
│   ├── inputs
│   ├── node_modules
│   ├── public
│   └── src
|       ├── App.css
│       ├── App.js
│       ├── Apptest.js
│       ├── components
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── pages
│       ├── reportWebVitals.js
│       ├── setupTests.js
|       ├── package-lock.json
|       ├── package.json
│       └── tailwind.config.js
├── .dockerignore
├── .gitattributes
├── docker-compose.yaml
├── docker.README.md
├── Dockerfile
├── package-lock.json
├── package.json
├── README.md
└── yolov8s.pt
```


## Development Process
- **Backend**: Set up backend server using express, create user and video-related endpoints, initialize database creation leveraging MySql,
  Unit tests created for each endpoint. User authentication and server session management enabled through jsonwebtokens.
- **Frontend**: Utilizing React, pages were organized and developed with components utilized in each page and created using React-Dropzone and React-Router-Dom
- **Model Integration**: Leveraged YOLOV5 to create a trained model to identify players, creating annotations that track the desired player
- **Replication**: Docker setup for replication of app

## Development Timeline

*NOTICE: This project was worked on and developed outside of a repository meaning that local system file setup was used. This was a mistake in hindsight as the developer because a git repository would have allowed for better version control and file management.

- August 21st to October 5th: Model Development. Machine-Learning based tracking model implemented and used within a virtual environment. YOLOv5 model used to get basic tracking of persons on video, with functions created to modify notations of bounding boxes, and annotate the highlighted and selected player.
- October 5th to October 7th: React app initialized, overall app design and features designed.
- October 7th to October 12th: Backend server created, user and video related endpoints created.
- October 12th to October 19th: Database configuration setup. MySQL used as database framework.
- October 19th to October 23rd: Unit tests for each endpoint created.
- October 23rd to October 25th: Local MySQL database created and used for testing purposes and to lessen cloud storage costs.
- October 25th to November 14th: Frontend service connected to backend server and API endpoints used for said connection. User management and Video processing
  functionalities implemented as to allow purposeful communication between the frontend and backend.
- November 14th to November 21st: Frontend UI designed and implemented. Testing of app functionality as 'user' done.
  
## Challenges and Lessons
- **Unit Tests**: When testing, creating a mock database would have been helpful and testing endpoint behavior more thouroughly, not only setup logic
- **Docker Setup**: Best practice to separate application components into different containers (frontend, backend, database)
- **Frontend Styling**: More packages should have been used and researched upon for a more
