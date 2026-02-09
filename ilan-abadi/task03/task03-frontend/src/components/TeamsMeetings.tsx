import React, { useEffect, useState } from 'react'
import { MeetingData, MeetingState } from '../types/types'
import axios from 'axios'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Duration from './Duration'

export default function TeamsMeetings({teamID}:{teamID: string}) {
    const [meetings, displayMeetings] = useState<MeetingState>({
        meetings: [],
        loading: false,
        error: ''
    })

    useEffect(() => {
        console.log("Fetching meetings for team:", teamID);
        async function fetchMeetings(){
            try {
                displayMeetings((prevData) =>({
                    ...prevData,
                    loading: true,
                    error: ''
                }))

                const res = await axios.get<MeetingData[]>(`http://localhost:3888/meetings/${teamID}`)

                displayMeetings({
                    meetings: res.data,
                    loading: false,
                    error: ''
                })

            } catch (err: any) {
                displayMeetings({
                    meetings: [],
                    loading: false,
                    error: err.message
                })
                
            }
        }
        fetchMeetings()
    },[teamID])

  return (
    <div>
      <Container>
        <Row>
            {meetings.meetings.length === 0 ?
            <Col><p className='fs-2 text-danger'>This team currently has no meetings scheduled</p></Col>:
            meetings.meetings.map(meeting =>
                <Col md={6} lg={4} xs={6} key={meeting.meeting_id}>
                    <Card className='mt-2 mb-3 border border-2 border-primary rounded-5 shadow bg-light'>
                        <Card.Body className='d-flex flex-column align-items-center'>
                            <Card.Text className='fs-4'>Meeting will take place in the</Card.Text>
                            <Card.Text className='fs-3'>{meeting.room}</Card.Text>
                            <Card.Text className='fs-4'>From: {meeting.from}</Card.Text>
                            <Card.Text className='fs-4'>To: {meeting.to}</Card.Text>
                            <Card.Text className='fs-4'>Duration: {Duration(meeting.from, meeting.to)}</Card.Text>
                            <Card.Text className='fs-4'>Meeting description:</Card.Text>
                            <Card.Text className='fs-4'>{meeting.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </Row>
      </Container>
    </div>
  )
}
