import { useEffect, useState } from "react";
import { Meeting } from "../../models/meeting";
import dataService from "../../services/dataService";
import "./MeetingList.css";

function getRoomColor(roomName: string): string {
    if (roomName.includes("Yellow")) return "#F59E0B";
    if (roomName.includes("Blue")) return "#3B82F6";
    if (roomName.includes("Purple")) return "#8B5CF6";
    if (roomName.includes("Brown")) return "#78350F";
    if (roomName.includes("Green")) return "#10B981";
    return "#6B7280";
}

interface MeetingListProps {
    groupId: number;
}

export function MeetingList(props: MeetingListProps) {

    const [meetings, setMeetings] = useState<Meeting[]>([]);

    useEffect(() => {
        if (!props.groupId) {
            setMeetings([]);
            return;
        }

        dataService.getMeetingsByGroup(props.groupId)
            .then(meetings => setMeetings(meetings))
            .catch(err => alert("Error loading meetings: " + err.message));

    }, [props.groupId]);

    return (
        <div className="MeetingList">
            <h3>Meetings Schedule</h3>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Room</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {meetings.map(m => (
                        <tr key={m.meeting_id}>
                            <td>{m.meeting_description}</td>

                            <td>
                                <span style={{
                                    backgroundColor: getRoomColor(m.meeting_room) + "20",
                                    color: getRoomColor(m.meeting_room),
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    fontWeight: "bold",
                                    display: "inline-block"
                                }}>
                                    {m.meeting_room}
                                </span>
                            </td>

                            <td>{new Date(m.start_datetime).toLocaleString()}</td>
                            <td>{new Date(m.end_datetime).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}