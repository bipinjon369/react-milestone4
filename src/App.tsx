import { useState } from 'react'
import './App.css'
import AppRoutes from './routes'
import SideBar from './components/SideBar'
import TopBar from './components/TopBar'

function App() {
  // Handler to set the search text
  const [searchText, setSearchText] = useState('');
  const updateSearchText = (text: string) => {
    setSearchText(text);
  }
  return (
    <>
    <div className='flex h-screen'>
      <SideBar />
      <div className='flex-1'>
        <TopBar handleSearchText={updateSearchText}/>
        <AppRoutes searchText={searchText}/>
      </div>
    </div>
    </>
  )
}

export default App
