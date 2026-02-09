# Walkthrough - Database Setup

I have created the initial database schema and seed data for the appointments project.

## Changes

### Database Scripts

- **[create-schema.sql](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/backend/database/create-schema.sql)**
  - Created `development_teams` and `meetings` tables.
  - Added indexes for performance on team lookups and schedule overlap checks.
  
- **[seed.sql](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/backend/database/seed.sql)**
  - Populated tables with sample teams (Alpha Squad, etc.) and meeting data.

### Backend Implementation

I have set up a full Node.js + Express + MySQL backend environment.

#### Files Created
- **[package.json](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/backend/package.json)**: Scripts, dependencies (Express, MySQL2, TypeScript).
- **[tsconfig.json](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/backend/tsconfig.json)**: TypeScript compiler options.
- **[.env](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/backend/.env)**: Environment variables for Database and Server port.
- **[src/config.ts](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/backend/src/config.ts)**: Central configuration module.
- **[src/db.ts](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/backend/src/db.ts)**: MySQL connection pool using `mysql2/promise`.
- **[src/middleware/error-handler.ts](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/backend/src/middleware/error-handler.ts)**: Global error handling middleware.
- **[src/app.ts](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/backend/src/app.ts)**: Entry point causing server start, CORS setup, and JSON parsing.

### API Implementation
I have implemented the requested API features following the Model-Controller-Route pattern.

#### Files Created
- **Models**:
    - **[src/models/development-team.ts](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/backend/src/models/development-team.ts)**: Handles `Select * from development_teams`.
    - **[src/models/meeting.ts](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/backend/src/models/meeting.ts)**: Handles `Insert` and `Select by teamId` for meetings.
- **Controllers**:
    - **[src/controllers/development-teams.ts](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/backend/src/controllers/development-teams.ts)**: Logic for fetching teams.
    - **[src/controllers/meetings.ts](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/backend/src/controllers/meetings.ts)**: Logic for fetching meetings by team and adding new meetings with validation.
- **Routes**:
    - **[src/routes/development-teams.ts](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/backend/src/routes/development-teams.ts)**: `GET /api/teams`
    - **[src/routes/meetings.ts](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/backend/src/routes/meetings.ts)**: `GET /api/meetings/:teamId`, `POST /api/meetings`

#### API Usage Examples

**1. Get All Development Teams**
- **URL**: `GET http://localhost:3000/api/teams`
- **Response**:
```json
[
  { "id": 1, "name": "Alpha Squad" },
  { "id": 2, "name": "Beta Builders" }
]
```

**2. Get Meetings for a Team**
- **URL**: `GET http://localhost:3000/api/meetings/1`
- **Response**:
```json
[
  {
    "id": 1,
    "teamId": 1,
    "startTime": "2025-02-10T09:00:00.000Z",
    "endTime": "2025-02-10T10:00:00.000Z",
    "description": "Daily Standup",
    "room": "Room A"
  }
]
```

**3. Add New Meeting**
- **URL**: `POST http://localhost:3000/api/meetings`
- **Body**:
```json
{
  "teamId": 1,
  "startTime": "2025-02-15 10:00:00",
  "endTime": "2025-02-15 11:30:00",
  "description": "Client Demo",
  "room": "Boardroom"
}
```
- **Response (201 Created)**:
```json
{
  "teamId": 1,
  "startTime": "2025-02-15T08:00:00.000Z",
  "endTime": "2025-02-15T09:30:00.000Z",
  "description": "Client Demo",
  "room": "Boardroom",
  "id": 5
}
```

### Frontend Implementation
I have implemented the React frontend using the standard Redux pattern.

#### Files Created
- **[package.json](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/frontend/package.json)**: React, Redux, Axios, MUI.
- **Src Structure**:
    - **[src/api/index.js](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/frontend/src/api/index.js)**: API service functions.
    - **[src/redux](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/frontend/src/redux)**: `store.js`, `actions.js`, `reducers.js`, `action-types.js` implementing state management.
    - **[src/components](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/frontend/src/components)**:
        - `TeamSelect.js`: Dropdown to select team.
        - `MeetingList.js`: Table displaying meetings (formatted dates).
        - `AddMeetingForm.js`: Form to schedule new meetings (with validation, error highlighting, and SnackBar).
    - **[src/App.js](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/frontend/src/App.js)**: Connects Redux state to components and handles layout.
    - **[src/index.js](file:///Users/aslamjj/Documents/Workspace/Task%203/appointments-project/frontend/src/index.js)**: Entry point using `Provider` and `ThemeProvider`.

### User Flow
1.  **Initial Load**: The app fetches the list of Development Teams from the backend and displays them in a dropdown.
2.  **Select Team**: When the user selects a team, the app fetches and displays the list of scheduled meetings for that team.
3.  **View Meetings**: Meetings are shown in a table with formatted Start/End times, Description, and Room.
4.  **Add Meeting**:
    -   User fills in the "Add New Meeting" form.
    -   Validates that all fields are present and `EndTime > StartTime`.
    -   **Success**: Shows green Snackbar "Meeting added successfully", clears form, and refreshes the list.
    -   **Error**: Shows red Snackbar with backend error message (e.g., specific validation error).

### Running the Project
1.  **Database**: Started MySQL via Docker Compose (`docker-compose up -d`) to handle port conflicts and auto-initialization.
    -   Connection: `localhost:3306`, User: `root`, No Password, DB: `Appointments`.
2.  **Backend**: Started with `npm start` (port 3000).
3.  **Frontend**: Started with `npm start` (port 3001).

### Preview
I have verified the application by launching it in a browser, adding a meeting, and confirming correct behavior.

![Appointments App Preview](/Users/aslamjj/.gemini/antigravity/brain/df1fbc14-f9b9-4dcc-9593-549230b29631/appointments_app_preview_1768849423145.webp)

### Bonus Features Implementation

#### Bonus A: Prevent Overlapping Meetings
- **Logic**: Implemented `Meeting.hasOverlap` method in Backend.
- **Rule**: `newStart < existingEnd AND newEnd > existingStart`.
- **Response**: Returns `409 Conflict` if overlap is detected.

#### Bonus B: Show Duration
- **Frontend**: Calculated duration (`endTime - startTime`) and added a "Duration" column to the meeting list (e.g., "1h 30m").

## Verification Results

### Bonus Features Verification
I performed 3 test cases to verify the overlap rules and duration display.

1.  **Allowed Meeting**: Added non-overlapping meeting. Success. Duration "1h 0m" displayed.
2.  **Partial Overlap**: Added meeting overlapping with existing one. **Blocked** with error "Meeting overlaps with an existing meeting".
3.  **Inside Overlap**: Added shorter meeting inside existing one. **Blocked** with error.

![Bonus Verification](/Users/aslamjj/.gemini/antigravity/brain/df1fbc14-f9b9-4dcc-9593-549230b29631/bonus_features_verification_1768850737551.webp)

### File Inspection

### File Inspection
- Verified that `create-schema.sql` contains correct `CREATE TABLE` statements and indexes.
- Verified that `seed.sql` contains valid `INSERT` statements with sample data.

### Build Verification
- **Backend**: Ran `npm run build` successfully, confirming that TypeScript configuration and source files are valid.
- **Frontend**: Ran `npm run build` successfully, confirming React components and Redux logic compile without errors.


- **development_teams**: Simple lookup table for teams.
- **meetings**: Stores the core schedule data.
  - `teamId` links to the team.
  - `startTime` and `endTime` define the slot.
  - Indexes on `(room, startTime, endTime)` and `(teamId, startTime, endTime)` allow unrelated meetings to be filtered out quickly when checking for double-bookings.
