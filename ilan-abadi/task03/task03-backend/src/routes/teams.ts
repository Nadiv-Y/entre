import { Request, Response, Router } from "express";
import { getAllTeams } from "../controllers/teams";

const router = Router()

router.get('/', async(req: Request, res: Response) => {
    try {
        const teams = await getAllTeams()
        res.json(teams).status(200).send(teams)
    } catch (error) {
        res.status(500).send('Error fetching teams')
    }
})

export default router