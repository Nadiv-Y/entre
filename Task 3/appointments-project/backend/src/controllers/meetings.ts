import { Meeting } from '../models/meeting';

export const getByTeamId = async (teamId: number) => {
    return await Meeting.selectByTeamId(teamId);
};

export const add = async (
    teamId: number,
    startTime: string,
    endTime: string,
    description: string,
    room: string
) => {
    // Basic Validation
    if (!teamId || !startTime || !endTime || !description || !room) {
        throw new Error('Missing required fields');
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Invalid date format');
    }

    if (end <= start) {
        throw new Error('endTime must be after startTime');
    }

    const hasOverlap = await Meeting.hasOverlap(teamId, start, end);
    if (hasOverlap) {
        throw new Error('Meeting overlaps with an existing meeting');
    }

    const newMeeting = new Meeting(teamId, start, end, description, room);
    const savedMeeting = await newMeeting.insert();
    return savedMeeting;
};
