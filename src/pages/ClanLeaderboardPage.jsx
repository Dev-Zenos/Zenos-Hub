import React from 'react';
import Header from '../components/HeaderClan';
import { useParams, useLoaderData } from 'react-router-dom';
import LeaderboardBox from '../components/ClanLeaderboardBox';

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