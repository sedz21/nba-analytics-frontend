import React, { useState } from "react";
import './PlayerSearch.css';

function PlayerSearch({ onPlayerSelect }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [results, setResults] = useState(null);

    const count = results?.count ? Number(results.count) : 0;

    const handleSearch = async () => {
        console.log("Search clicked!");
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/players/search?first_name=${firstName}&last_name=${lastName}`
            );
            console.log("Response received:", response);
            const data = await response.json();
            console.log("Backend response:", data);

            if (data.count) {
                data.count = Number(data.count);
            }

            setResults(data);
            console.log("State after setResults:", data);
        } catch (error) {
            console.error("Error fetching player data:", error);
        }
    };

    return (
        <div className="player-search">
            <h1>NBA Player Search</h1>

            <div className="search-inputs">
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/*}
            <div className="debug-section">
                <strong>Debug JSON:</strong>
                <pre>{JSON.stringify(results, null, 2)}</pre>
            </div>
            */}

            {results && results.count !== undefined && (
                <div className="search-results">
                    {/* no players found */}
                    {results.count === 0 && <p>{results.message || "No players found"}</p>}

                    {/* single player found */}
                    {results.count === 1 && results.results && (
                        <div className="single-player">
                            <h2>{results.results[0].fname} {results.results[0].lname}</h2>
                            <p>DOB: {results.results[0].dob}</p>
                            <button onClick={() => onPlayerSelect(results.results[0])}>
                                View Player Stats
                            </button>
                        </div>
                    )}

                    {/* multiple players found */}
                    {results.count > 1 && Array.isArray(results.results) && (
                        <ul className="multiple-players">
                            {results.results.map((p) => (
                                <li key={p.player_id}>
                                    <span>{p.fname} {p.lname} (DOB: {p.dob})</span>
                                    <button onClick={() => onPlayerSelect(p)}>Select</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default PlayerSearch;



/*import React, { useState } from "react";
import './PlayerSearch.css'

function PlayerSearch({ onPlayerSelect }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [results, setResults] = useState(null);

    const count = results?.count ? Number(results.count) : 0;

    const handleSearch = async () => {
        console.log("Search clicked!");
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/players/search?first_name=${firstName}&last_name=${lastName}`
            );
            console.log("Response received:", response);
            const data = await response.json();
            console.log("Backend response:", data);

            // Ensure count is a number
            if (data.count) {
                data.count = Number(data.count);
            }

            setResults(data);
            console.log("State after setResults:", data);
        } catch (error) {
            console.error("Error fetching player data:", error);
        }
    };

    return (
        <div>
            <h1>NBA Player Search</h1>
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <div style={{ backgroundColor: "#eee", padding: "10px", marginTop: "10px" }}>
                <strong>Debug JSON:</strong>
                <pre>{JSON.stringify(results, null, 2)}</pre>
            </div>


            {results && results.count !== undefined && (
                <div>
                    {results.count === 0 && <p>{results.message || "No players found"}</p>}

                    {results.count === 1 && results.results && (
                        <div>
                            <h2>{results.results[0].fname} {results.results[0].lname}</h2>
                            <p>DOB: {results.results[0].dob}</p>
                            <button onClick={() => onPlayerSelect(results.results[0])}>
                                View Base Career Stats
                            </button>
                        </div>
                    )}

                    {results.count > 1 && Array.isArray(results.results) && (
                        <ul>
                            {results.results.map((p) => (
                                <li key={p.player_id}>
                                    {p.fname} {p.lname}
                                    <button onClick={() => onPlayerSelect(p)}>Select</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default PlayerSearch;
*/