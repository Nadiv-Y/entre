import request from "supertest";
import app from "../src/app";
import cyber from "../src/2-utils/cyber";
import { describe, it, expect, beforeAll } from "@jest/globals";
import Role from "../src/4-models/Role";

const prefix = "/api/admin/vacations";

describe("Admin Integration Tests", () => {
    let userToken: string;
    let adminToken: string;
    let createdVacationId: number;

    beforeAll(async () => {
        // Create normal user token
        const user = { id: 999, firstName: "U", lastName: "S", username: "u", role: Role.User };
        userToken = cyber.getNewToken(user as any);

        // Create admin token (Forged)
        const admin = { id: 888, firstName: "A", lastName: "D", username: "a", role: Role.Admin };
        adminToken = cyber.getNewToken(admin as any);
    });

    it("POST /vacations - Forbidden for normal user", async () => {
        const response = await request(app)
            .post(prefix)
            .set("Authorization", `Bearer ${userToken}`)
            .field("destination", "Mars")
            .field("description", "Red planet")
            .field("fromDate", "2030-01-01")
            .field("toDate", "2030-01-05")
            .field("price", 10000)
            .attach("image", Buffer.from("fakeimage"), "mars.jpg");

        // 403 Forbidden or 401 Unauthorized depending on middleware
        // Typically Admin middleware returns 403 usually.
        expect([401, 403]).toContain(response.status);
    });

    it("POST /vacations - Allowed for admin", async () => {
        const response = await request(app)
            .post(prefix)
            .set("Authorization", `Bearer ${adminToken}`)
            // Need multipart for image
            .field("destination", "Test Dest")
            .field("description", "Test Desc")
            .field("fromDate", "2025-01-01")
            .field("toDate", "2025-01-10")
            .field("price", 1000)
            .attach("image", Buffer.from("fakeimagecontent"), "test.jpg");

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        createdVacationId = response.body.id;
    });

    it("PUT /vacations/:id - Allowed for admin", async () => {
        if (!createdVacationId) return; // Skip if create failed

        const response = await request(app)
            .put(`${prefix}/${createdVacationId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .field("destination", "Test Dest Updated")
            .field("description", "Test Desc Updated")
            .field("fromDate", "2025-01-01")
            .field("toDate", "2025-01-10")
            .field("price", 1200)
            .attach("image", Buffer.from("fakeimagecontent"), "test.jpg");

        expect(response.status).toBe(200);
        expect(response.body.destination).toBe("Test Dest Updated");
    });

    it("DELETE /vacations/:id - Allowed for admin", async () => {
        if (!createdVacationId) return;

        const response = await request(app)
            .delete(`${prefix}/${createdVacationId}`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(204); // No Content
    });
});
