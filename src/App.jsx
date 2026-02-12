import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PlayerSearch from "./components/PlayerSearch"; // adjust path if you put it directly in src
import PlayerPage from "./components/PlayerPage";
import './App.css';

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <Routes>
          {/* Redirect root to /players */}
          <Route path="/" element={<Navigate to="/players" replace />} />

          {/* Player Stats Page */}
          <Route path="/players" element={
            <>
              <div className="search-section">
                <PlayerSearch onPlayerSelect={setSelectedPlayer} />
              </div>
              {selectedPlayer && (
                <div className="stats-section">
                  <PlayerPage selectedPlayer={selectedPlayer} />
                </div>
              )}
            </>
          } />

          {/* Team Stats Page - placeholder for now */}
          <Route path="/teams" element={
            <div className="search-section">
              <h1>Team Stats</h1>
              <p>Team search coming soon...</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );



  {/*<div className="app-container">
      <div className="search-section">
        <PlayerSearch onPlayerSelect={setSelectedPlayer} />
      </div>
      {selectedPlayer && (<div className="stats-section">
        <PlayerPage selectedPlayer={selectedPlayer} />
      </div>)}
    </div>*/}


}

export default App;
