import React, { useState, useEffect } from "react";
import './PlayerPage.css'



function PlayerPage({ selectedPlayer }) {
    const [activeTab, setActiveTab] = useState("base");

    // Separate state for each stat type
    const [baseStats, setBaseStats] = useState([]);
    const [advancedStats, setAdvancedStats] = useState([]);
    const [playoffStats, setPlayoffStats] = useState([]);

    // Track loading/error for each
    const [baseLoading, setBaseLoading] = useState(false);
    const [advancedLoading, setAdvancedLoading] = useState(false);
    const [playoffLoading, setPlayoffLoading] = useState(false);

    const [baseError, setBaseError] = useState(null);
    const [advancedError, setAdvancedError] = useState(null);
    const [playoffError, setPlayoffError] = useState(null);

    // Track if data has been fetched (for lazy loading)
    const [baseFetched, setBaseFetched] = useState(false);
    const [advancedFetched, setAdvancedFetched] = useState(false);
    const [playoffFetched, setPlayoffFetched] = useState(false);

    if (!selectedPlayer) return null;

    // Fetch functions
    const fetchBaseStats = async () => {
        if (baseFetched) return; // already loaded
        setBaseLoading(true);
        setBaseError(null);
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/players/${selectedPlayer.player_id}/base-career-stats`
            );
            const data = await response.json();
            setBaseStats(data.base_career_stats || []);
            setBaseFetched(true);
        } catch (err) {
            console.error(err);
            setBaseError("Failed to load base career stats.");
        } finally {
            setBaseLoading(false);
        }
    };

    const fetchAdvancedStats = async () => {
        if (advancedFetched) return;
        setAdvancedLoading(true);
        setAdvancedError(null);
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/players/${selectedPlayer.player_id}/advanced-career-stats`
            );
            const data = await response.json();
            setAdvancedStats(data.advanced_career_stats || []);
            setAdvancedFetched(true);
        } catch (err) {
            console.error(err);
            setAdvancedError("Failed to load advanced career stats.");
        } finally {
            setAdvancedLoading(false);
        }
    };

    const fetchPlayoffStats = async () => {
        if (playoffFetched) return;
        setPlayoffLoading(true);
        setPlayoffError(null);
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/players/${selectedPlayer.player_id}/playoff-career-stats`
            );
            const data = await response.json();
            setPlayoffStats(data.playoff_career_stats || []);
            setPlayoffFetched(true);
        } catch (err) {
            console.error(err);
            setPlayoffError("Failed to load playoff career stats.");
        } finally {
            setPlayoffLoading(false);
        }
    };

    // Handle tab click - switch tab and fetch if needed
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === "base" && !baseFetched) fetchBaseStats();
        if (tab === "advanced" && !advancedFetched) fetchAdvancedStats();
        if (tab === "playoff" && !playoffFetched) fetchPlayoffStats();
    };

    // Render table helper
    const renderTable = (data, loading, error) => {
        if (loading) return <p className="loading-message">Loading...</p>;
        if (error) return <p className="error-message">{error}</p>;
        if (!data || data.length === 0) return <p className="no-data-message">No data available / No tab selected.</p>;

        return (
            <table className="stats-table">
                <thead>
                    <tr>
                        {Object.keys(data[0]).map((col) => (
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i}>
                            {Object.values(row).map((val, j) => (
                                <td key={j}>{val}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };


    // Then add this useEffect after all your useState declarations
    useEffect(() => {
        // Reset all state when selectedPlayer changes
        setActiveTab("base");
        setBaseStats([]);
        setAdvancedStats([]);
        setPlayoffStats([]);
        setBaseFetched(false);
        setAdvancedFetched(false);
        setPlayoffFetched(false);
        setBaseError(null);
        setAdvancedError(null);
        setPlayoffError(null);
    }, [selectedPlayer]);

    return (
        <div className="player-page">
            <div className="player-header">
                <h2>
                    {selectedPlayer.fname} {selectedPlayer.lname}
                </h2>
                <p>DOB: {selectedPlayer.dob}</p>
            </div>
            {/* Tab buttons */}
            <div className="tabs">
                <button
                    onClick={() => handleTabClick("base")}
                    className={'tab-button ${activeTab === "base" ? "active" : ""}'}
                >
                    Base Career Stats
                </button>
                <button
                    onClick={() => handleTabClick("advanced")}
                    className={'tab-button ${activeTab === "advanced" ? "active" : ""}'}
                >
                    Advanced Career Stats
                </button>
                <button
                    onClick={() => handleTabClick("playoff")}
                    className={'tab-button ${activeTab === "playoff" ? "active" : ""}'}
                >
                    Playoff Career Stats
                </button>
            </div>

            {/* Tab content */}
            {activeTab === "base" && renderTable(baseStats, baseLoading, baseError)}
            {activeTab === "advanced" && renderTable(advancedStats, advancedLoading, advancedError)}
            {activeTab === "playoff" && renderTable(playoffStats, playoffLoading, playoffError)}
        </div>
    );
}


export default PlayerPage;






/*import React, { useEffect, useState } from "react";

function PlayerPage({ selectedPlayer }) {
    const [activeTab, setActiveTab] = useState("base");
    
    const [baseStats, setBaseStats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch base career stats when the component mounts or selectedPlayer changes
    useEffect(() => {
        if (!selectedPlayer) return;

        const fetchBaseStats = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/players/${selectedPlayer.player_id}/base-career-stats`
                );
                const data = await response.json();
                setBaseStats(data.base_career_stats || []); // backend might return {stats: [...]} or just [...]
            } catch (err) {
                console.error(err);
                setError("Failed to load player stats.");
            } finally {
                setLoading(false);
            }
        };

        fetchBaseStats();
    }, [selectedPlayer]);

    if (!selectedPlayer) return null; // nothing to show

    return (
        <div>
            <h2>
                {selectedPlayer.fname} {selectedPlayer.lname}
            </h2>
            <p>DOB: {selectedPlayer.dob}</p>

            {loading && <p>Loading base career stats...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {baseStats.length > 0 && (
                <div>
                    <h3>Base Career Stats</h3>
                    <table border="1">
                        <thead>
                            <tr>
                                {Object.keys(baseStats[0]).map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {baseStats.map((row, i) => (
                                <tr key={i}>
                                    {Object.values(row).map((val, j) => (
                                        <td key={j}>{val}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default PlayerPage;
*/