import { useState } from 'react'
import './App.css'
import AppRoutes from './routes'
import SideBar from './components/SideBar'
import TopBar from './components/TopBar'

function App() {

  return (
    <>
    <div className='flex'>
      <SideBar />
      <div>
        <TopBar />
        <AppRoutes />
      </div>
    </div>
    </>
  )
}

export default App
