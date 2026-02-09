import { Meetings } from "../models/meetings"

export const createNewMeeting = async (
    team_id: number,
    from: string,
    to: string,
    description: string,
    room: string) => {
        if(await Meetings.meetingExists(team_id, from, to)){
            throw new Error('This team already has a meeting scheduled for this time.')
        }
    return await Meetings.insertMeeting(team_id, from, to, description, room)
}

export const getMeetings = async (teamID: number) => {
    return await Meetings.getTeamMeetings(teamID)
}