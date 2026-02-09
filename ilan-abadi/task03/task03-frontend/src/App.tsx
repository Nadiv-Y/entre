import AddMeeting from './components/AddMeeting';
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css';
import DisplayTeamMeetings from './components/DisplayTeamMeetings';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <h1 className='text-primary display-1 mb-3'>MEETME</h1>
      <Routes>
        <Route path='/' element={<DisplayTeamMeetings/>}></Route>
        <Route path='/AddNewMeeting/:teamID' element={<AddMeeting/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
