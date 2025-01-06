import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import KirkaJSmodule from 'kirkajs';
import { parse } from 'dotenv';
import Spinner from './Spinner'; 
import { toast } from 'react-toastify';
import { GiCrystalShine } from "react-icons/gi";

const KirkaJS = new KirkaJSmodule();

const LeaderboardBox = () => {
    const navigate = useNavigate();
    const { date } = useParams();
    const [loading, setLoading] = useState(true);
    const [leaderboardData, setLeaderboardData] = useState([
        { rank: "Rank", name: "Name", score: "Score" },
        { rank: 1, name: 'Gay4JasonMomoa', score: 102873, level: 25 },
        { rank: 2, name: 'king', score: 83631, level: 15 },
        { rank: 3, name: 'enzoprokawaii', score: 76605, level: 25 },
        { rank: 4, name: 'ZG-GRF5', score: 71928, level: 15 },
        { rank: 5, name: 'DefNotNay', score: 65675, level: 10 },
    ]);

    useEffect(() => {
        const data = async () => {
            try {
                console.log("trying to load data");
                setLoading(true);
                const API_URL = 'https://backend-api-2l08.onrender.com';
                const res = await fetch("https://backend-api-2l08.onrender.com/dailylb?date=" + date);
                const data = await res.json();
                const parsedData = JSON.parse(data);
                if(parsedData.error){
                    toast.error(parsedData.error);
                    return navigate('/');
                }
                setLeaderboardData(parsedData.results);
                console.log(leaderboardData);
            } catch(err) {
                console.error("Error Loading Data", err);
            } finally {
                console.log("Loaded")
                setLoading(false);
            }     
        }; 
        data();
    }, [date]);

    const boxStyle = {
        width: '1000px',
        backgroundColor: 'rgba(31, 41, 55, 0.7)',
        borderRadius: '8px',
        padding: '20px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0 8px',
    };

    const rowStyle = {
        backgroundColor: 'rgba(75, 85, 99, 0.5)',
        cursor: 'pointer',
    };

    const cellStyle = {
        padding: '12px',
        textAlign: 'left',
        transition: 'font-size 0.2s, background-color 0.2s',
        fontSize: '1.2em',
        fontWeight: 'bold',
    };

    const handleRowClick = (name) => {
        navigate(`/pv/${name}`);
    };

    const handleRowHover = (e) => {
        const row = e.currentTarget;
        Array.from(row.children).forEach(cell => {
            cell.style.fontSize = '1.3em';
            cell.style.backgroundColor = 'rgba(75, 85, 99, 1)';
        });
    };

    const handleRowLeave = (e) => {
        const row = e.currentTarget;
        Array.from(row.children).forEach(cell => {
            cell.style.fontSize = '1.2em';
            cell.style.backgroundColor = 'transparent';
        });
    };

    return (
        <div style={boxStyle}>
        { loading ? <Spinner loading={loading}/> :
            <table style={tableStyle}>
                <tbody>
                    {leaderboardData.map((player, index) => (
                        <tr 
                            key={player.userId} 
                            style={rowStyle} 
                            onClick={() => handleRowClick(player.userId)}
                            onMouseEnter={handleRowHover}
                            onMouseLeave={handleRowLeave}
                        >
                            <td style={{...cellStyle, width: '10%', color: ['#FFD700', '#C0C0C0', '#CD7F32'][index] || 'white'}}>
                                {index+1}
                            </td>
                            <td style={{...cellStyle, width: '50%'}}>
                                {player.name}
                            </td>
                            <td style={{...cellStyle, width: '10%'}}>
                                {player.scores.toLocaleString('en-US')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        }
        </div>
    );
};

export default LeaderboardBox;