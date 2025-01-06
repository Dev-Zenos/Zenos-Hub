import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = ({ onLoad }) => {
  const [mode, setMode] = useState('Clans');
const navigate = useNavigate();

useEffect(() => {
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
      </div>
    </div>
  );
};

  
export default Header;