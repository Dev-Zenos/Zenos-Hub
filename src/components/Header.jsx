import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Header = ({ onLoad }) => {
  const [mode, setMode] = useState('Daily');
  const [date, setDate] = useState('');
  const [pressed, setPressed] = useState(false);
const navigate = useNavigate();

useEffect(() => {
    if (mode !== 'Daily') {
        setDate('');
    }
}, [mode]);

  const headerStyle = {
    width: '1000px',
    height: '200px',
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
  };

  const toggleStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  };

  const linkClass = (isActive) => 
    isActive 
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  const inputStyle = {
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    width: '200px',
  };

  const goButtonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    marginLeft: '10px',
    cursor: 'pointer',
  };

  const handleGoClick = async() => {
    if(!pressed){
        setPressed(true);
        if (!date) {
          console.log('Error: Date field is empty');
          toast.error('Please select a date');
          return setPressed(false);
        }
        let dates = convertDateFormat(date);
        const API_URL = 'https://backend-api-2l08.onrender.com';
        const res = await fetch("https://backend-api-2l08.onrender.com/dailylb?date=" + dates);
        const data = await res.json();
        const parsedData = JSON.parse(data);
        //console.log(parsedData.results);
        if(parsedData.error){
            toast.error(parsedData.error);
            setPressed(false);
            return navigate('/leaderboard/daily/current');
        }
        navigate(`/leaderboard/${mode.toLowerCase()}/${dates}`);
        setPressed(false);  
        }
  };
  const buttonClick = (newMode) => {
    //console.log(newMode);  // This will log the new mode immediately

    if(newMode === 'Daily'){
        navigate("/leaderboard/daily/current");
    }
    else if(newMode === 'Clans'){
        navigate(`/leaderboard/clans`);
    }
    else if(newMode === 'Player'){
        navigate(`/leaderboard/player`);
    }
};;

  return (
    <div style={headerStyle}>
      <div style={titleStyle}>
        KIRKA LEADERBOARDS
      </div>
      <div>
        <div style={toggleStyle}>
          {['Daily', 'Clans', 'Player'].map((buttonMode) => (
            <button
            key={buttonMode}
            className={linkClass(mode === buttonMode)}
            onClick={() => buttonClick(buttonMode)}
        >
            {buttonMode}
        </button>
          ))}
        </div>
        { mode === 'Daily'? 
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
            placeholder="Select a date"
          />
          <button 
            onClick={handleGoClick}
            style={goButtonStyle}
          >
            {pressed? 'Loading...': 'Go'}
          </button>
        </div> : <></>
        }
      </div>
    </div>
  );
};

function convertDateFormat(dateStr) {
    // Split the input string by '-'
    const [year, month, day] = dateStr.split('-');
  
    // Convert the month and day to integers to remove leading zeros
    const formattedMonth = parseInt(month, 10);
    const formattedDay = parseInt(day, 10);
  
    // Return the formatted date string
    return `${formattedDay}-${formattedMonth}-${year}`;
  }
  
export default Header;