import { useEffect, useState } from "react";
import { Team } from "../../models/team"; 
import dataService from "../../services/dataService"; 
import "./TeamSelect.css"; 

interface TeamSelectProps {
    onTeamChange: (groupId: number) => void;
}

export function TeamSelect(props: TeamSelectProps) {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        dataService.getAllTeams()
            .then(teamsFromServer => setTeams(teamsFromServer))
            .catch(err => alert("Error loading teams: " + err.message));
    }, []);

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedId = +event.target.value;
        props.onTeamChange(selectedId); 
    }

    return (
        <div className="TeamSelect">
            <label>Select Development Group: </label>
            <select onChange={handleChange} defaultValue="">
                <option value="" disabled>-- Select a Team --</option>
                {teams.map(t => (
                    <option key={t.group_id} value={t.group_id}>
                        {t.group_name}
                    </option>
                ))}
            </select>
        </div>
    );
}