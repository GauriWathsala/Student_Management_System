import React , { useState, useContext }from 'react'
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
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useNavigate } from 'react-router-dom';

import AssessmentIcon from '@mui/icons-material/Assessment';
import { AuthContext } from "../../helpers/AuthContext";

const Sidebar = () => {

 
  // const [authState, setAuthState] = useState({
  //   username: '',
  //   id: 0,
  //   status: false,
  // });
  

  // const {setAuthState} = useContext (AuthContext)
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const userRole = authState.role;

  const Logout = () => {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('accessToken');
    setAuthState({
      username: '',
      id: 0,
      status: false,
      role: '', // Make sure to include the role in the state update if needed
    });
    navigate('/login');
  };
    return (
      <div className='sidebar'>
        {/* <div className='top'>
            <span className='logo'><img className = 'ge' src='/Images/logo.png' /> </span> 
            </div>
            <hr /> */}
        <div className='center'>
        <ul>
              {userRole === ' Admin' && <p className='stitle'>MAIN</p>}
              {userRole === ' Admin' && <li> <Link to = '/reports' className='dash-to-page'> <AssessmentIcon className='dicon' /> <span>Generate Reports</span></Link> </li>}

              {(userRole === ' Admin' || userRole === 'Teacher' || userRole === 'Receptionist') && <p className='stitle'> User Management</p> }
              {(userRole === ' Admin' || userRole === 'Teacher' || userRole === 'Receptionist') && <li> <Link to = '/student' className='dash-to-page'> <SchoolIcon className='dicon'/> <span>  Student</span> </Link> </li> }
              {(userRole === ' Admin' || userRole === 'Teacher' || userRole === 'Receptionist') && <li> <Link to = '/staff' className='dash-to-page'><Face4Icon className='dicon'  /> <span>Staff </span></Link> </li>}
               

              {(userRole === ' Admin' || userRole === 'Teacher' || userRole === 'Receptionist') && <p className='stitle'>Institute Management</p> }
              {(userRole === ' Admin' || userRole === 'Teacher' || userRole === 'Receptionist') &&  <li><Link to = '/course' className='dash-to-page'> <LibraryBooksIcon className='dicon' /> <span>Courses & Modules</span></Link> </li>}
              
              {(userRole === ' Admin' || userRole === 'Teacher' || userRole === 'Receptionist') && <li> <Link to = '/exams' className='dash-to-page'><EditNoteIcon className='dicon'/> <span>Exams</span> </Link> </li>}
              {(userRole === ' Admin' || userRole === 'Teacher' || userRole === 'Receptionist') &&  <li> <Link to = '/fees' className='dash-to-page'><MonetizationOnIcon className='dicon'/> <span>Fees & Payments</span></Link> </li>}
               
                

                <p className='stitle'>Pofile Management</p> 
                
                <li onClick={Logout}> <LogoutIcon className='dicon' /> <span>Logout</span> </li>
            </ul>
        </div>
       
      </div>
      
    )
  }
  
  export default Sidebar
  