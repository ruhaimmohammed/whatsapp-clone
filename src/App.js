import React, { useState, useRef } from "react"
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
      <Router>
       { window.innerWidth >= 700 && <Sidebar />}
        <Routes>
          
          {
            window.innerWidth <= 700 && <Route path="/" element={ <Sidebar />} /> 
          }

            <Route path="/rooms/:roomId" element={<Chat />} />
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
      </Router>
      </div>
      )}
    </div>
  );
}

export default App;
