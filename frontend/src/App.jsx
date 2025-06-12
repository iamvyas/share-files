import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from "./navbar/Navbar";
import ChatBox from './pages/ChatBox';
import Room from './pages/Room';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Navbar /> {/*inside Router so that navigation works lol*/}
      <Routes>
        <Route path="/chatbox" element={<ChatBox />} />
        <Route path="/room/:room" element={<ChatBox />} /> {/* Dynamic room path */}
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} /> {/* Optional: default to home */}
      </Routes>
    </Router>
  );
}

export default App;
