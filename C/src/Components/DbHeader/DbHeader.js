import React ,  { useState, useContext } from 'react'
import './dbheader.scss'
import SearchIcon from '@mui/icons-material/Search';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListIcon from '@mui/icons-material/List';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { AuthContext } from '../../helpers/AuthContext';

export const DbHeader = () => {

  const {authState} = useContext(AuthContext)

  return (
    <div className='dbheader'>
        <div className='wrapper'>
            <div className='head-left'>
                <div className='logo'> <img className = 'ge' src='/Images/logo.png' /> </div>
                <div className='side-text'>
                <h1>GIFTED EDUCATION</h1>
                <span>INSTITUTE of IELTS & CAE</span>
                </div>
            </div> 
            <div className='head-right'>
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
          <div className='ditem'>
            <lable>{authState.username}</lable>
          </div>
        </div> 
        
       
        </div>
        
        
    </div>
  )
}
