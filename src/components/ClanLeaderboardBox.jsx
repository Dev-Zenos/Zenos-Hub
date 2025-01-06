import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import KirkaJSmodule from 'kirkajs';
import { parse } from 'dotenv';
import Spinner from './Spinner'; 
import { toast } from 'react-toastify';
import { FaCaretSquareUp, FaCaretSquareDown, FaArrowDown } from "react-icons/fa";
import Tooltip from './ToolTip'; 
//import dotenv


const API_URL = 'https://backend-api-2l08.onrender.com';

const KirkaJS = new KirkaJSmodule();

const LeaderboardBox = () => {
    const navigate = useNavigate();
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
                const res = await fetch("https://backend-api-2l08.onrender.com/clanlb");
                const data = await res.json();
                const parsedData = JSON.parse(data);
                if(parsedData.error){
                    toast.error(parsedData.error);
                    return navigate('/');
                }
                //add a object at index 0
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
    }, []);

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

    const emojiStyle = {
            padding: '4px',
            textAlign: 'left',
            transition: 'font-size 0.2s, background-color 0.2s',
            fontSize: '1.2em',
            fontWeight: 'bold',
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
                        <tr 
                            key={69420} 
                            style={rowStyle} 
                            onMouseEnter={handleRowHover}
                            onMouseLeave={handleRowLeave}
                        >
                            <td style={{...cellStyle, width: '10%', color: '#FFFFFF'}}>
                                {'Rank'}
                            </td>
                            <td style={{...cellStyle, width: '50%'}}>
                                {'Clan'}
                            </td>
                            <td style={{...cellStyle, width: '30%'}}>
                                {'Score'}
                            </td>
                            <td style={{...emojiStyle, width: '0%'}}>
                                <FaCaretSquareUp color='#00AB41' /> 
                            </td>
                            <td style={{...emojiStyle, width: '0%'}}>
                            <Tooltip text="Score Gained/Lost Today">
                                <span>Gain/Loss</span>
                            </Tooltip>

                            </td>
                            <td style={{...cellStyle, width: '10%'}}>
                                
                            </td>
                        </tr>
                    {leaderboardData.map((clan, index) => (
                        <tr 
                            key={clan.clanId} 
                            style={rowStyle} 
                            onMouseEnter={handleRowHover}
                            onMouseLeave={handleRowLeave}
                        >
                            <td style={{...cellStyle, width: '10%', color: ['#FFD700', '#C0C0C0', '#CD7F32'][index] || 'white'}}>
                                {index+1}
                            </td>
                            <td style={{...cellStyle, width: '50%'}}>
                                {clan.name}
                            </td>
                            <td style={{...cellStyle, width: '30%'}}>
                                {clan.scores.toLocaleString('en-US')}
                            </td>
                            <td style={{...emojiStyle, width: '0%'}}>
                                {clan.scoreDiff < 0 ? <FaCaretSquareDown color='red'/> : <FaCaretSquareUp color='#00AB41'/>}
                            </td>
                            <td style={{...emojiStyle, width: '0%'}}>
                                <Tooltip text="Score Gained/Lost Today">
                                    <span>{clan.scoreDiff.toLocaleString('en-US')}</span>
                                </Tooltip>
                            </td>
                            <td style={{...cellStyle, width: '10%'}}>
                                
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