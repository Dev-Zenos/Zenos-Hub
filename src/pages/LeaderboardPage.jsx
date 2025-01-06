import React from 'react';
import Header from '../components/Header';
import { useParams, useLoaderData } from 'react-router-dom';
import LeaderboardBox from '../components/LeaderboardBox';

const MainComponent = () => {
  const handleLoad = (mode, date) => {
    console.log(`Loading ${mode} data for ${date}`);
    // Implement your load function here
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <Header onLoad={handleLoad} />
      <div style={{ marginTop: '20px' }}>
        <LeaderboardBox />
      </div>
    </div>
  );
};

export default MainComponent;