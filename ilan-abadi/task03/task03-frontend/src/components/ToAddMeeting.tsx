import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toAddmeetBut } from '../types/types'

export default function ToAddMeeting({teamID}:toAddmeetBut) {
  return (
    <div>
      <Link to={`/AddNewMeeting/${teamID}`}>
          <Button
          variant='primary block py-3 my-2 fs-3'>Click to schedule a new meeting for this team
          </Button>
      </Link>
    </div>
  )
}
