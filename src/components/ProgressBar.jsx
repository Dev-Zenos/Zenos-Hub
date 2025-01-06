import React, { useState } from 'react';

const ProgressBar = ({ progress, text }) => {

  const containerStyle = {
    width: '750px', // Increased width a bit
    height: '35px', // Increased height a bit for better visibility
    backgroundColor: 'transparent',
    border: '3px solid rgba(17, 24, 39, 0.7)',
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative',
  };

  const fillStyle = {
    height: '100%',
    backgroundColor: 'rgba(17, 24, 39, 0.7)',
    width: `${progress}%`,
    transition: 'width 0.25s ease-in-out',
    borderRadius: '1px',
  };

  const textStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    fontWeight: 'bold',
    zIndex: 1,
  };

  return (
    <div className='absolute left-[300px] top-[200px]'>
      <div style={containerStyle}>
        <div style={fillStyle} />
        <div style={textStyle}>{`${text} xp (${Math.round(progress)}%)`}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
