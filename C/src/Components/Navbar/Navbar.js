import React from 'react'
import './Navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListIcon from '@mui/icons-material/List';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function Navbar() {
  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input type='text' placeholder='Search...' />
          <SearchIcon />
        </div>
        <div className='dbitems'>
        <div className='ditem'>
            <FullscreenIcon className='icond' />
          </div>
          <div className='ditem'>
            <DarkModeIcon className='icond' />
          </div>
          <div className='ditem'>
            <ListIcon className='icond' />
          </div>
          <div className='ditem'>
            <NotificationsIcon className='icond' />
          </div>
          <div className='ditem'>
            <AccountCircleOutlinedIcon className='icond'/>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Navbar