import request from "supertest";
import app from "../src/app";
import { describe, it, expect, beforeAll } from "@jest/globals";

const prefix = "/api/follows";

describe("Followers Integration Tests", () => {
    let userToken: string;
    let vacationId: number;

    beforeAll(async () => {
        // Register user
        const user = { firstName: "F", lastName: "L", username: `follower_${Date.now()}`, password: "p" };
        userToken = (await request(app).post("/api/auth/register").send(user)).body;

        // Get a vacation ID
        const vacRes = await request(app)
            .get("/api/vacations")
            .set("Authorization", `Bearer ${userToken}`);

        if (vacRes.body && vacRes.body.length > 0) {
            vacationId = vacRes.body[0].id;
        }
    });

    it("POST /follows/:id - Follow vacation", async () => {
        if (!vacationId) {
            console.warn("No vacation found to test follow");
            return;
        }

        const response = await request(app)
            .post(`${prefix}/${vacationId}`)
            .set("Authorization", `Bearer ${userToken}`);

        expect([200, 201]).toContain(response.status);
    });

    it("DELETE /follows/:id - Unfollow vacation", async () => {
        if (!vacationId) return;

        const response = await request(app)
            .delete(`${prefix}/${vacationId}`)
            .set("Authorization", `Bearer ${userToken}`);

        expect([200, 204]).toContain(response.status);
    });
});
