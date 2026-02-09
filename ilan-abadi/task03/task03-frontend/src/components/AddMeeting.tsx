import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap'
import { AddMeetingState, PostingState } from '../types/types'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

export default function AddMeeting() {
  const { teamID } = useParams() as { teamID: string };
  const [meetingInputs, setMeetingInputs] = useState<AddMeetingState>({
    'team_id': '',
    'from': '',
    'to': '',
    'description': '',
    'room': ''
  })
  
  
  const setMeetingData = (inputChange: ChangeEvent<HTMLInputElement>) => {
    const name = inputChange.target.name
    const value = inputChange.target.value
    setMeetingInputs(prevData => ({...prevData, [name]: value}))
  }
  const setSelect = (inputChange: ChangeEvent<HTMLSelectElement>) => {
    const name = inputChange.target.name
    const value = inputChange.target.value
    setMeetingInputs(prevData => ({...prevData, [name]: value})) 
  }

  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

    const [postingState, setPostingState] = useState<PostingState>({
    newMeetingID: '',
    loading: false,
    error: ''
  })
  useEffect(()=>{
    setMeetingInputs(prev =>({
      ...prev,
      team_id: teamID
    }))
  },[teamID])

  const schedule = async () => {
    if (!meetingInputs.from || !meetingInputs.to || !meetingInputs.description || !meetingInputs.room)
      return alert('Please fill all fields')

    if (new Date(meetingInputs.to) <= new Date(meetingInputs.from))
      return alert('End time must be later than start time')

    try {
      setPostingState({
        newMeetingID: '',
        loading: true,
        error: ''
      })

      const res = await axios.post('http://localhost:3888/meetings', meetingInputs)

      setPostingState({
        newMeetingID: res.data,
        loading: false,
        error: ''
      })
      setMessage('Meeting scheduled successfully!')
      setIsError(false)
      console.log('Meeting created:', res.data)

    } catch (err: any) {
      setPostingState({
        newMeetingID: '',
        loading: false,
        error: err.message
      })
      setMessage('Failed to schedule meeting')
      setIsError(true)
      console.error('Error:', err)
    }
  }
  console.log(meetingInputs);
  
  return (
    <div>
        <div className='col-lg-6 mx-auto'>
          {message&&(
            <p className={`fs-3 text-center ${isError ? 'text-danger' : 'text-success'}`}>
              {message}
            </p>
          )}
         <Link to='/'><p className='f4 text-primary'>Go Back To Teams</p></Link>
         <Form className='d-flex-col justify-contant-center text-start p-3'>
          <FormGroup as={Row} className='mt-4' controlId='date-time'>
            <Col>
              <Form.Label className='fs-4'>From</Form.Label>
              <Form.Control
               type='datetime-local' className='py-2 fs-3'
               name='from' value={meetingInputs.from}
               onChange={setMeetingData}>
               </Form.Control>
            </Col>
            <Col>
              <Form.Label className='fs-4'>To</Form.Label>
              <Form.Control
               type='datetime-local' className='py-2 fs-3'
               name='to' value={meetingInputs.to}
               onChange={setMeetingData}>
               </Form.Control>
            </Col>
          </FormGroup>
          <FormGroup className='mt-4' controlId='description'>
            <Form.Label className='fs-4'>Description:</Form.Label>
            <Form.Control
             type='text' className='py-2 fs-3'
             name='description' value={meetingInputs.description}
             onChange={setMeetingData}>
            </Form.Control>
          </FormGroup>
          <FormGroup className='mt-4' controlId='room'>
            <Form.Label className='fs-4'>Room:</Form.Label>
            <Form.Select
              className='py-2 fs-3'
              name='room'
              value={meetingInputs.room}
              onChange={setSelect}>
              <option value=''></option>
              <option value='white-room'>White Room</option>
              <option value='red-room'>Red Room</option>
              <option value='green-room'>Green Room</option>
              <option value='blue-room'>Blue Room</option>
              <option value='yellow-room'>Yellow Room</option>
            </Form.Select>
          </FormGroup>
          <div className='d-grid mt-3'>
            <Button
               type='button'
               variant='primary block py-3 my-2 fs-3'
               onClick={schedule}>schedule new meeting
            </Button>
          </div>
         </Form>
        </div>
    </div>
  )
}
