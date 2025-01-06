import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import NotFoundPage from './pages/NotFoundPage'
import Maintainence from './pages/Maintainence'
import LeaderBoard from './pages/LeaderboardPage'
import ClanLeaderBoard from './pages/ClanLeaderboardPage'
import PlayerLeaderBoard from './pages/PlayerLeaderboardPage'
import ProfileViewer from './pages/ProfileViewer'
import ProfileSearcher from './pages/ProfileSearcher'



const App = () => {




  
  const route = createBrowserRouter(
    createRoutesFromElements(
      // <Route path="/" element={<MainLayout />}>
      //   <Route path="/" element={<Maintainence />}></Route>
      //   <Route path="*" element={<Maintainence />} />
      // </Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} /> 
        <Route path="/leaderboard/daily/:date" element={<LeaderBoard />} />
        <Route path="/pv/:id" element={<ProfileViewer />} />
        <Route path="/pv" element={<ProfileSearcher />} />
        <Route path="/leaderboard/clans" element={<ClanLeaderBoard />} />
        <Route path="/leaderboard/player" element={<PlayerLeaderBoard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  )
  


  return (
   <RouterProvider router={route}/>
  )
}

export default App