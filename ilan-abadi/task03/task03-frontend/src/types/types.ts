export interface TeamData{
    team_id: string,
    team_name: string
}

export interface TeamSelectorProps{
    onSelect: (theTeam: { teamID: string; teamName: string }) => void
}


export interface TeamSelectorStat{
    onSelect: (teamId: string) => void
}

export interface MeetingData{
    meeting_id?: number,
    team_id: string,
    from: string,
    to: string,
    description: string,
    room: string
}

export interface AddMeetingState{
    team_id: string,
    from: string,
    to: string,
    description: string,
    room: string
}

export interface TeamState{
    teams: TeamData[],
    loading: boolean,
    error: string
}

export interface MeetingState{
    meetings: MeetingData[],
    loading: boolean,
    error: string
}

export interface PostingState{
    newMeetingID: string,
    loading: boolean,
    error: string
}

export type toAddmeetBut = {
    teamID: string
}

export interface ForDisplay{
    teamID: string,
    teamName: string
}