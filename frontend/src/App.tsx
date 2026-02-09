import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { AddMeeting } from './components/AddMeeting/AddMeeting';
import './App.css';

function App() {
  return (

    <div className="App">
      <header>
        <div className="logo-area">
          <span style={{ fontSize: "2rem", marginRight: "10px" }}>📅</span>
          <div>
            <h1>MeetApp</h1>
            <small style={{ color: "#6b7280", fontSize: "0.8rem" }}>Team Scheduler</small>
          </div>
        </div>

        <nav>
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/add" className="nav-link">Add Meeting</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddMeeting />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;