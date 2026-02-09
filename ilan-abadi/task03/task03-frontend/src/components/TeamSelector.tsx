import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, FormSelect } from 'react-bootstrap'
import { TeamData, TeamSelectorStat, TeamState } from '../types/types'

export default function TeamSelector({onSelect}:TeamSelectorStat){
    const [teamsList, setTeamsList] = useState<TeamState>({
        teams: [],
        loading: false,
        error: ''
    })

    useEffect(() => {
        async function fetchTeamsData(){
            try {
                setTeamsList((prevList) => ({
                    ...prevList,
                    loading: true,
                    error: ''
                }))

                const res = await axios.get<TeamData[]>('http://localhost:3888/teams')

                setTeamsList({
                    teams: res.data,
                    loading: false,
                    error: ''
                })
                    
            } catch (err: any) {
                setTeamsList({
                    teams: [],
                    loading: false,
                    error: err.message
                })
            }
        }
        fetchTeamsData()
    },[])

    const changeTeam = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedID = e.target.value
        onSelect(selectedID)
        
}
  return (
    <div className='col-lg-6 mx-auto'>
      <h2>displaying meetings for</h2>
      <Form className='d-flex-col justify-contant-center text-start p-3'>
        <div>{teamsList.loading && 'Loading...'}</div>
        <div>{teamsList.error}</div>
        <FormSelect className='py-2 fs-1 text-center' onChange={changeTeam}>
            {teamsList.teams.map(team => 
                <option key={team.team_id} value={team.team_id}>
                    {team.team_name}
                </option>
            )}
        </FormSelect>
      </Form>
    </div>
  )
}
