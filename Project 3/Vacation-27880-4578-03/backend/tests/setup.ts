import dotenv from "dotenv";

// Load env vars
dotenv.config();

// Override DB_NAME for tests to avoid messing with development data?
// Ideally we should have a separate test DB: vacation_db_test
// process.env.DB_NAME = "vacations_test"; 
// Note: This requires the DB to exist. For now, we will run against the configured DB 
// but use transactions or cleanup if possible. 
// Given the limitations, we will proceed with the current DB configuration but rely on 
// creating new data (random registration) for tests.

// Mock console.log to reduce noise during tests?
// global.console.log = jest.fn();
