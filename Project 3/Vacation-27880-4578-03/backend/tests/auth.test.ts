import request from "supertest";
import app from "../src/app";
import { describe, it, expect, beforeAll } from "@jest/globals";

const prefix = "/api/auth";

describe("Auth Integration Tests", () => {

    const uniqueUser = {
        firstName: "Test",
        lastName: "User",
        username: `testuser_${Date.now()}`,
        password: "password123"
    };

    it("POST /register - success", async () => {
        const response = await request(app)
            .post(`${prefix}/register`)
            .send(uniqueUser);

        expect(response.status).toBe(201);
        expect(typeof response.body).toBe("string"); // Token is returned as string
    });

    it("POST /register - fail missing field", async () => {
        const response = await request(app)
            .post(`${prefix}/register`)
            .send({ firstName: "Incomplete" });

        expect(response.status).toBe(400); // Bad Request
    });

    it("POST /register - fail username exists", async () => {
        // Register same user again
        const response = await request(app)
            .post(`${prefix}/register`)
            .send(uniqueUser);

        expect(response.status).toBe(400); // Or 409 Conflict if implemented, usually 400 'Username taken'
    });

    it("POST /login - success", async () => {
        const response = await request(app)
            .post(`${prefix}/login`)
            .send({
                username: uniqueUser.username,
                password: uniqueUser.password
            });

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined(); // Token string
    });

    it("POST /login - fail wrong password", async () => {
        const response = await request(app)
            .post(`${prefix}/login`)
            .send({
                username: uniqueUser.username,
                password: "wrongpassword"
            });

        expect(response.status).toBe(401); // Unauthorized
    });
});
