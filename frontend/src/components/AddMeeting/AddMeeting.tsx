import { useEffect, useState } from "react";
import { Team } from "../../models/team";
import { Meeting } from "../../models/meeting";
import dataService from "../../services/dataService";
import "./AddMeeting.css";

export function AddMeeting() {
    
    const [teams, setTeams] = useState<Team[]>([]);
    const [meeting, setMeeting] = useState<Partial<Meeting>>({
        group_id: 0,
        start_datetime: "",
        end_datetime: "",
        meeting_description: "",
        meeting_room: ""
    });

    useEffect(() => {
        dataService.getAllTeams()
            .then(t => setTeams(t))
            .catch(err => alert(err.message));
    }, []);

    function handleChange(args: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const value = args.target.value;
        const name = args.target.name;
        setMeeting(prev => ({ ...prev, [name]: value }));
    }

    async function send(event: React.FormEvent) {
        event.preventDefault();
        try {
            const meetingToSend = { ...meeting, group_id: Number(meeting.group_id) } as Meeting;
            await dataService.addMeeting(meetingToSend);
            alert("Meeting added successfully!");
        } catch (err: any) {
            alert("Error: " + (err.response?.data || err.message));
        }
    }

    return (
        <div className="AddMeeting">
            <h3>Add New Meeting</h3>
            <form onSubmit={send}>

                <label>Group:</label>
                <select name="group_id" onChange={handleChange} required defaultValue="">
                    <option value="" disabled>Select Group</option>
                    {teams.map(t => <option key={t.group_id} value={t.group_id}>{t.group_name}</option>)}
                </select>

                <label>Start Time:</label>
                <input type="datetime-local" name="start_datetime" onChange={handleChange} required />

                <label>End Time:</label>
                <input type="datetime-local" name="end_datetime" onChange={handleChange} required />

                <label>Description:</label>
                <input type="text" name="meeting_description" onChange={handleChange} required placeholder="e.g. Daily Standup" />

                <label>Room:</label>
                <select name="meeting_room" onChange={handleChange} required defaultValue="">
                    <option value="" disabled>Select Room</option>
                    <option value="Yellow Room">Yellow Room</option>
                    <option value="Blue Room">Blue Room</option>
                    <option value="Purple Room">Purple Room</option>
                    <option value="Brown Room">Brown Room</option>
                    <option value="Green Room">Green Room</option>
                </select>

                <button type="submit">Add Meeting</button>
            </form>
        </div>
    );
}