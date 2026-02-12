import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-logo">
                    <h1>NBA Stats Database</h1>
                </div>
                <div className="navbar-links">
                    <Link to="/players">Player Stats</Link>
                    <Link to="/teams">Team Stats</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;