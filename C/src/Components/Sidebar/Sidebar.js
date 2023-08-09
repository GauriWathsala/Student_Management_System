import React from 'react'
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Face4Icon from '@mui/icons-material/Face4';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const Sidebar = () => {
    return (
      <div className='sidebar'>
        {/* <div className='top'>
            <span className='logo'><img className = 'ge' src='/Images/logo.png' /> </span> 
            </div>
            <hr /> */}
        <div className='center'>
        <ul>
                <p className='stitle'>MAIN</p> 
                <li> <Link to = '/dashboard' className='dash-to-page'> <DashboardIcon className='dicon' /> <span>Dashboard</span></Link> </li>

                <p className='stitle'> User Management</p> 
                <li> <Link to = '/student' className='dash-to-page'> <SchoolIcon className='dicon'/> <span>  Student</span> </Link> </li>
                <li> <Link to = '/staff' className='dash-to-page'><Face4Icon className='dicon'  /> <span>Staff </span></Link> </li>
               

                <p className='stitle'>Institute Management</p> 
                <li><Link to = '/course' className='dash-to-page'> <LibraryBooksIcon className='dicon' /> <span>Courses & Modules</span></Link> </li>
                <li> <MenuBookIcon className='dicon' /> <span>Books</span> </li>
                <li> <EditNoteIcon className='dicon'/> <span>Exams</span> </li>
                <li> <NotificationsIcon className='dicon' /> <span>Notifications</span> </li>
                <li><FingerprintIcon className='dicon' /> <span>Attendance</span></li>

                <p className='stitle'>Pofile Management</p> 
                <li> <AccountCircleIcon className='dicon' /> <span>Profile</span> </li>
                <li> <LogoutIcon className='dicon' /> <span>Logout</span> </li>
            </ul>
        </div>
        <div className='bottom'>
          <div className='coloroption'> 
          <DarkModeIcon className='modeicon'/>
          <LightModeIcon className='modeicon'/>
          </div>
          
        </div>
      </div>
      
    )
  }
  
  export default Sidebar
  