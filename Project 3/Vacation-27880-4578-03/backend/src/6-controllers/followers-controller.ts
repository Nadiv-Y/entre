import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import followersLogic from "../5-logic/followers-logic";
import cyber from "../2-utils/cyber";

const router = express.Router();

router.post("/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.header("authorization");
        const token = authHeader?.substring(7) || "";
        const user = cyber.getUserFromToken(token);
        const vacationId = +request.params.vacationId;

        await followersLogic.follow(user!.id, vacationId);
        response.status(201).send("Followed");
    }
    catch (err) {
        next(err);
    }
});

router.delete("/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.header("authorization");
        const token = authHeader?.substring(7) || "";
        const user = cyber.getUserFromToken(token);
        const vacationId = +request.params.vacationId;

        await followersLogic.unfollow(user!.id, vacationId);
        response.status(204).send();
    }
    catch (err) {
        next(err);
    }
});

export default router;
