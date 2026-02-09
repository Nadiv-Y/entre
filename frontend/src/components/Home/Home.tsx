import { useState } from "react";
import { TeamSelect } from "../TeamSelect/TeamSelect";
import { MeetingList } from "../MeetingList/MeetingList";
import "./Home.css";

export function Home() {
    const [selectedTeamId, setSelectedTeamId] = useState<number>(0);

    return (
        <div className="Home">
            <div className="hero-section">
                <div className="glass-card dropdown-container">
                    <TeamSelect onTeamChange={setSelectedTeamId} />
                </div>
            </div>
            
            {selectedTeamId > 0 ? (
                <div className="fade-in-up">
                    <MeetingList groupId={selectedTeamId} />
                </div>
            ) : (
                <div className="welcome-placeholder glass-card">
                    <span style={{ fontSize: "3rem" }}>👋</span>
                    <h2>Welcome to MeetApp</h2>
                    <p>Select a development team above to view their upcoming schedule.</p>
                </div>
            )}
        </div>
    );
}