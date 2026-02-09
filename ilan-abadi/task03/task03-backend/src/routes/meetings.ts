import { Request, Response, Router } from "express";
import { createNewMeeting, getMeetings } from "../controllers/meetings";

const router = Router()

router.get('/:teamID', async(req: Request, res: Response) => {
    try {
        const meetings = await getMeetings(Number(req.params.teamID))
        meetings.length !==0 ? res.json(meetings) : res.status(404).send('This team has no meetings')
    } catch (error) {
        res.status(500).send("Error fetching team's meetings")
    }
})

router.post('/', async(req: Request, res: Response) => {
    try {
        const {team_id, from, to, description, room} = req.body
        const newMeeting = await createNewMeeting(Number(team_id), from, to, description, room)
        res.status(201).json(newMeeting)
        console.log('New meeting has been scheduled.');
        
    } catch (error: any) {
        if(error.message.includes('already')){
            res.status(400).send(error.message)
        }else{
            res.status(500).send('Internal server error')
            console.log(error.message);
            
        }
    }
})

export default router