import React from 'react'
import './searchadd.scss'
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation, useNavigate} from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button'; 
import { useState, useEffect, useRef  } from 'react';
import AddstaffForm from '../Forms/AddstaffForm';
import EastIcon from '@mui/icons-material/East';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ScheduleExamForm from '../../Pages/Exams/ScheduleExamForm';


const SearchAdd = ({currentPage ,showIcon}) => {
  const navigate = useNavigate ();
  const location = useLocation();
  let showEastIcon = currentPage === 'course';
  //const [selectedRole, setSelectedRole] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Styles for the Cancel and Add button
  const cancelButtonStyles = {
    backgroundColor: '#fff',
    border: '0.5px solid #1eb2a6',
    color: '#1eb2a6',
    };
    const addButtonStyles = {
      backgroundColor: '#1eb2a6',
      border: '0.5px solid #1eb2a6',
      color: '#fff',
      };

  //********************ADD Button Control in btext class div************** */   
  let buttonText = '';
 

  if (currentPage === 'staff' || currentPage === 'student') {
    buttonText = 'ADD';
    showIcon = true;
  } else if (currentPage === 'course') {
    buttonText = 'Modules';
    showIcon = false;
  } else if (currentPage === 'module') {
    buttonText = 'BACK';
    showIcon = true;
  }
  else if (currentPage === 'exams') {
    buttonText = 'Schedule Exams';
    showIcon = false;
  }
    

  const handleOpenDropdown = () => {
    if (currentPage === 'staff') {
      setDropdownOpen(true);
      console.log('Show the dropdown list');
    } else {
      // Handle other cases, navigate to other pages, etc.
      if (currentPage === 'course') {
        navigate('/module');
      } else if (currentPage === 'module') {
        navigate('/course');
      } else if (currentPage === 'student') {
        navigate('/manualreg');
      }
    }
  };
  const handleCloseDropdown = () => {
    setDropdownOpen(false);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
     // Add event listener for clicks outside the dropdown
     document.addEventListener('mousedown', handleOutsideClick);

     // Clean up the event listener when the component unmounts
     return () => {
       document.removeEventListener('mousedown', handleOutsideClick);
     };
   }, []);
  // Function to handle closing the filter dialog
  // const handleCloseDialog = () => {
  //   setDialogOpen(false);
  // };


  // Button click handler for opening the dialog
  const handleOpenDialog = () => {
    if (currentPage === 'exams') {
      setDialogOpen(true);
    } else {
      // Handle other cases
      // ...
    }
  };


  return (
    <div className='searchadd'>
        <div className='swrapper'>
            <div className='searchbar'>
                <SearchIcon />
                <input type='text' placeholder='Search' />
            </div>
            <div className='addbutton'>
            <button className={`add ${currentPage === 'module' ? 'back1' : ''} ${currentPage === 'course' ? 'module1' : ''}`} onClick={currentPage === 'staff' ? handleOpenDropdown : handleOpenDialog}>
                    <div className='sicon'> {showIcon && (currentPage === 'module' ? <ArrowBackIcon /> : <AddCircleIcon />)}</div>
                    <div className='btext'>
                    {buttonText}
                    {showEastIcon && currentPage !== 'module' && <EastIcon />}
                    {showEastIcon && currentPage === 'module' && <ArrowBackIcon />}
                    </div>
                    </button>
            </div>
           
            {/* <Dialog open={isDialogOpen} onClose={handleCloseDialog} className='dialogBox'>
        <DialogTitle>
          {currentPage === 'staff' ? <h2 style={{color:'#1eb2a6'}}>Add New Staff Member</h2>:"Tama Hadala Naa"}
        </DialogTitle>
        <DialogContent>
          {currentPage === 'staff' ? <AddstaffForm /> : 'hellow' }
        </DialogContent>
        <DialogActions>
          <Button style={cancelButtonStyles} onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
          <Button style={addButtonStyles} onClick={handleCloseDialog} color='primary'>
            Add 
          </Button>
        </DialogActions>
      </Dialog> */}
        </div>
          {/* Dropdown list for staff page */}
      {currentPage === 'staff' && isDropdownOpen && (
        <div className="dropdown">
          <ul>
            <li>Teacher</li>
            <li>Receptionist</li>
            <li>Admin</li>
          </ul>
        </div>
      )}

       {/* Dialog for scheduling exams */}
       <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)} className='dialogBox'>
          <DialogTitle>
            {currentPage === 'exams' ? <h2 style={{ color: '#1eb2a6' }}>Schedule Exam</h2> : 'Tama Hadala Naa'}
          </DialogTitle>
          <DialogContent>
            {currentPage === 'exams' ? <ScheduleExamForm /> : 'hellow'}
          </DialogContent>
          </Dialog>
    </div>
  )
}

export default SearchAdd