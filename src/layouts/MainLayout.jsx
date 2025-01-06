import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ToastContainer } from 'react-toastify'
import Background from '../components/Background'
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function MainLayout() {
  return (
    <>
    <Background />
    < Analytics />
    < SpeedInsights />
    <Navbar />
    <Outlet/>
    <ToastContainer />
    </>
  )
}

export default MainLayout