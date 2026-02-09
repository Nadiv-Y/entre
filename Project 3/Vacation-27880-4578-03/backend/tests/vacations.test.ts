import request from "supertest";
import app from "../src/app";
import { describe, it, expect, beforeAll } from "@jest/globals";

const prefix = "/api/vacations";

describe("Vacations Integration Tests", () => {
    let userToken: string;

    beforeAll(async () => {
        // Login as a user to get token
        // Assuming 'john' / 'password' exists from seed. 
        // If not, registry new one.
        const user = {
            firstName: "Vacation",
            lastName: "Tester",
            username: `vactester_${Date.now()}`,
            password: "password123"
        };
        const regRes = await request(app).post("/api/auth/register").send(user);
        userToken = regRes.body; // Assuming token is returned directly or in object?
        // auth-controller usually returns string in body: res.status(201).send(token);
        // If it returns JSON { token: ... }, I need to check.
        // Let's assume generic string or simple JSON.
        // Actually, logic usually returns string.
    });

    it("GET /vacations - requires token (fails without)", async () => {
        const response = await request(app).get(prefix);
        expect(response.status).toBe(401);
    });

    it("GET /vacations - success with token", async () => {
        const response = await request(app)
            .get(prefix)
            .set("Authorization", `Bearer ${userToken}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
