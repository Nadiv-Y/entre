import React, { useState } from 'react'
import TeamSelector from './TeamSelector'
import TeamsMeetings from './TeamsMeetings'
import ToAddMeeting from './ToAddMeeting'


export default function DisplayTeamMeetings() {
    const [selectedTeam, displaySelectedTeamMeetings] = useState('1')
    
    
  return (
    <div>
      <TeamSelector onSelect={displaySelectedTeamMeetings}/>
      <ToAddMeeting teamID={selectedTeam}/>
      <TeamsMeetings teamID={selectedTeam}/>
    </div>
  )
}
