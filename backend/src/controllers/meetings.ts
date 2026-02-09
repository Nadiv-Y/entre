import { Meeting } from '../models/meeting';

export const getMeetingsByGroup = async (groupId: number) => {
    if (!groupId || isNaN(groupId)) {
        throw new Error("Invalid Group ID");
    }
    return await Meeting.getAllByGroup(groupId);
};

export const addMeeting = async (meeting: any) => {
    if (!meeting.group_id || !meeting.start_datetime || !meeting.end_datetime || !meeting.meeting_room) {
        throw new Error("Missing required fields: group_id, dates, or room");
    }

    const start = new Date(meeting.start_datetime);
    const end = new Date(meeting.end_datetime);

    if (start >= end) {
        throw new Error("Meeting start time must be before end time");
    }

    const newMeeting = new Meeting(
        meeting.group_id,
        meeting.start_datetime,
        meeting.end_datetime,
        meeting.meeting_description,
        meeting.meeting_room
    );

    const savedMeeting = await newMeeting.insert();

    return savedMeeting;
};