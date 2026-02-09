# Implementation Plan - Database Setup

## Goal Description
Create the initial MySQL database schema and seed data for the appointments management project. The schema includes `development_teams` and `meetings` tables with necessary constraints and indexes.
Also, set up the Node.js + Express + MySQL backend infrastructure following the "21-node-mysql" reference architecture.

## Proposed Changes
### [Backend]
#### [NEW] [create-schema.sql](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/database/create-schema.sql)
- SQL script to create `development_teams` and `meetings` tables.
- Includes indexes for performance.

#### [NEW] [seed.sql](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/database/seed.sql)
- SQL script to insert sample data into the tables.

### [Backend Infrastructure]
#### [NEW] [package.json](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/package.json)
- TypeScript, Express, MySQL2, Dotenv, CORS.

#### [NEW] [tsconfig.json](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/tsconfig.json)
- TypeScript configuration.

#### [NEW] [.env](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/.env)
- Database configuration (Host, User, Password, DB, Port).

#### [NEW] [src/config.ts](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/src/config.ts)
- Central configuration file exporting environment variables.

#### [NEW] [src/db.ts](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/src/db.ts)
- Database connection pool using `mysql2/promise`.

#### [NEW] [src/middleware/error-handler.ts](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/src/middleware/error-handler.ts)
- Simple error handling middleware.

#### [NEW] [src/app.ts](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/src/app.ts)
- Main application entry point.
- Configures Middleware (CORS, JSON).
- Connects to Database.
- Starts Server.

### [API Feature Implementation]
#### [NEW] [src/models/development-team.ts](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/src/models/development-team.ts)
- `DevelopmentTeam` class with `selectAll`.

#### [NEW] [src/models/meeting.ts](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/src/models/meeting.ts)
- `Meeting` class with `selectByTeamId` and `insert`.

#### [NEW] [src/controllers/development-teams.ts](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/src/controllers/development-teams.ts)
- Controller logic for Teams (getAll).

#### [NEW] [src/controllers/meetings.ts](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/src/controllers/meetings.ts)
- Controller logic for Meetings (get by team, add).
- Validation: `endTime > startTime`.

#### [NEW] [src/routes/development-teams.ts](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/src/routes/development-teams.ts)
- Router for `/api/teams`.

#### [NEW] [src/routes/meetings.ts](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/src/routes/meetings.ts)
- Router for `/api/meetings`.

#### [MODIFY] [src/app.ts](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/src/app.ts)
- Register new routers.

### [Bonus Features]
#### [MODIFY] [src/models/meeting.ts](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/src/models/meeting.ts)
- Add `hasOverlap(teamId, startTime, endTime)` method using `SELECT COUNT(*)`.

#### [MODIFY] [src/controllers/meetings.ts](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/backend/src/controllers/meetings.ts)
- In `add` method, call `hasOverlap` before inserting.
- Return 409 Conflict if overlap exists.

#### [MODIFY] [src/components/MeetingList.js](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/frontend/src/components/MeetingList.js)
- Calculate duration (`endTime - startTime`) and display formatted string (e.g., "1h 30m").

### [Frontend]
#### [NEW] [package.json](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/frontend/package.json)
- React, Redux, React-Redux, Redux-Thunk, Axios, Material UI (@mui/material, @emotion/react, @emotion/styled).

#### [NEW] [src/api/index.js](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/frontend/src/api/index.js)
- Axios instance and service functions (`fetchTeams`, `fetchMeetings`, `addMeeting`).

#### [NEW] [src/redux/store.js](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/frontend/src/redux/store.js)
- Redux store configuration with Thunk middleware.

#### [NEW] [src/redux/action-types.js](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/frontend/src/redux/action-types.js)
- Action type constants.

#### [NEW] [src/redux/actions.js](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/frontend/src/redux/actions.js)
- Actions for Teams and Meetings (Async thunks).

#### [NEW] [src/redux/reducers.js](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/frontend/src/redux/reducers.js)
- Reducers for Teams and Meetings state.

#### [NEW] [src/components/TeamSelect.js](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/frontend/src/components/TeamSelect.js)
- MUI Select component for choosing a team.

#### [NEW] [src/components/MeetingList.js](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/frontend/src/components/MeetingList.js)
- MUI Table/Card component for displaying meetings.

#### [NEW] [src/components/AddMeetingForm.js](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/frontend/src/components/AddMeetingForm.js)
- Form with MUI TextFields and Button. Validates `endTime > startTime`.

#### [NEW] [src/App.js](file:///Users/aslamjj/Documents/Workspace/Task 3/appointments-project/frontend/src/App.js)
- Main layout. Connects components.

## Verification Plan
### Automated Tests
- None strictly required for SQL files, but we will inspect the files to ensure they contain valid SQL.
- (Optional) If a MySQL instance were available, we would source the files to test them, but for this task, generation and inspection are sufficient.
