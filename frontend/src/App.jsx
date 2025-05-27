import React, { useState } from 'react';
import axios from 'axios';
import './App.css'
import Navbar from "./navbar/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ChatBox from './pages/ChatBox';
import Room from './pages/Room'
import Home from './pages/Home'

function App() {

  return (
    <>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/chatbox" element={<ChatBox />} />
        <Route path="/about" element={<Room />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </>
  );
}

export default App
