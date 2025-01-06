import React from 'react';


const boxStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1000px',
  height: '500px',
  backgroundColor: 'rgba(31, 41, 55, 0.7)', // Equivalent to bg-gray-800 with 70% opacity
  zIndex: -1,
  display: 'flex',
  flexDirection: 'column',
};

const SemiTranslucentBox = ({box= boxStyle}) => {

  return (
    <div style={box}>
    </div>
  );
};

export default SemiTranslucentBox;