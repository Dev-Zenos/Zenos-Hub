import React from 'react'
import { FaCalendar } from 'react-icons/fa'

function stats({stats}) {

    console.log((stats.stats.games*8)/(60 * 24));

    const roundBoxStyle1 = {
        position: 'absolute',
        transform: 'translate(0px, 0px)',
        backgroundColor: 'rgba(17, 24, 39)', // Equivalent to bg-gray-800 with 70% opacity
        zIndex: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '10px', // Increased value for more curved corners
    };

        const roundBoxStyle = {
            position: 'absolute',
            transform: 'translate(0px, 0px)',
            backgroundColor: 'rgba(17, 24, 39)', // Equivalent to bg-gray-800 with 70% opacity
            zIndex: 0,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            borderRadius: '10px', // Increased value for more curved corners
        };

        const roundBoxStyle2 = {
            alignItems: 'right',
        };
  return (
    <>
        <div style={roundBoxStyle1} className='text-[white] top-[10px] left-[22px] w-[100px] h-[75px]'>
            <span className='text-[18px] my-[3px]'>  K/D </span>
            <span className='text-[25px]'>  {round(stats.stats.kills/stats.stats.deaths, 2)} </span>
        </div>

        <div style={roundBoxStyle1} className='text-[white] top-[10px] left-[132px] w-[100px] h-[75px]'>
            <span className='text-[18px] my-[3px]'>  KPG </span>
            <span className='text-[25px]'>  {round(stats.stats.kills/stats.stats.games, 2)} </span>
        </div>

        <div style={roundBoxStyle1} className='text-[white] top-[95px] left-[22px] w-[210px] h-[75px]'>
            <span className='text-[18px] my-[3px]'>  Headshots </span>
            <span className='text-[25px]'>  {stats.stats.headshots.toLocaleString('en-US') + " (" + round((stats.stats.headshots/stats.stats.kills) * 100, 2) + "%)"} </span>
        </div>

        <div style={roundBoxStyle1} className='text-[white] top-[10px] left-[242px] w-[150px] h-[75px]'>
            <span className='text-[18px] my-[3px]'>  WinRate </span>
            <span className='text-[25px]'>  {round((stats.stats.wins/stats.stats.games) * 100, 2) + "%"} </span>
        </div>

        <div style={roundBoxStyle1} className='text-[white] top-[95px] left-[242px] w-[150px] h-[75px]'>
            <span className='text-[18px] my-[3px]'>  Games Played </span>
            <span className='text-[25px]'>  { stats.stats.games.toLocaleString('en-US') } </span>
        </div>

        <div style={roundBoxStyle1} className='text-[white] top-[10px] left-[402px] w-[210px] h-[75px]'>
            <span className='text-[18px] my-[3px]'>  Total Score </span>
            <span className='text-[25px]'>  { stats.stats.scores.toLocaleString('en-US') } </span>
        </div>

        <div style={roundBoxStyle1} className='text-[white] top-[95px] left-[402px] w-[210px] h-[75px]'>
            <span className='text-[18px] my-[3px]'>  Total Xp </span>
            <span className='text-[25px]'>  { stats.totalXp.toLocaleString('en-US') } </span>
        </div>

        <div style={roundBoxStyle1} className='text-[white] top-[10px] left-[622px] w-[100px] h-[75px]'>
            <span className='text-[18px] my-[3px]'>  Wins </span>
            <span className='text-[25px]'>  { stats.stats.wins.toLocaleString('en-US') } </span>
        </div>

        <div style={roundBoxStyle1} className='text-[white] top-[95px] left-[622px] w-[100px] h-[75px]'>
            <span className='text-[18px] my-[3px]'>  Losses </span>
            <span className='text-[25px]'>  { (stats.stats.games - stats.stats.wins).toLocaleString('en-US') } </span>
        </div>

        <div style={roundBoxStyle1} className='text-[white] top-[180px] left-[22px] w-[700px] h-[75px]'>
            <span className='text-[18px] my-[3px]'> Bio:  </span>
            <span className='text-[25px]'>  {stats.bio ? stats.bio : ""} </span>
        </div>

        <div style={roundBoxStyle} className='text-[white] top-[265px] left-[22px] w-[700px] h-[45px]'>
            <span className='text-[15px] flex items-center my-[10px] mx-[8px]'>
                <FaCalendar className='text-[23px] mr-[8px]'/> {formatAccountCreationDate(stats.createdAt)}
                <span style={roundBoxStyle2} className='mx-[25px]'> {formatPlaytime(stats.stats.games * 8)} </span>
            </span>
        </div>



    </>
  )
}

function formatAccountCreationDate(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Options for formatting the date
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
    };

    // Format the date with the specified options
    let formattedDate = "Created on " + date.toLocaleDateString('en-US', options);
    return `${formattedDate}`;
}

function formatPlaytime(minutes) {
    const days = Math.floor(minutes / 1440);  // 1440 minutes in a day
    const hours = Math.floor((minutes % 1440) / 60);  // remainder minutes converted to hours
    const mins = minutes % 60;  // remainder minutes

    let playtimeStr = "~";

    if (days > 0) {
        playtimeStr += `${days}d `;
    }
    if (hours > 0 || days > 0) {
        playtimeStr += `${hours}h `;
    }
    playtimeStr += `${mins}m of Playtime`;

    return playtimeStr;
}

function round(num, places) {
    if(places <= 0) return Math.round(num)
    return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
  }

export default stats