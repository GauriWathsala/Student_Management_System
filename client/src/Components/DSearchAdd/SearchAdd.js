import React from 'react'
import './searchadd.scss'
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate} from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button'; 
import { useState } from 'react';
import AddstaffForm from '../Forms/AddstaffForm';
import EastIcon from '@mui/icons-material/East';


const SearchAdd = ({currentPage}) => {
  const navigate = useNavigate ();
  let showEastIcon = currentPage === 'course';
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
  let showIcon = false;

  if (currentPage === 'staff' || currentPage === 'student') {
    buttonText = 'Add';
    showIcon = true;
  } else if (currentPage === 'course') {
    buttonText = 'Modules';
    showIcon = false;
  }
    
  
  //**************Dialogbox************************** */
  // State to manage the dialog visibility
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Function to handle opening the filter dialog
  const handleOpenDialog = () => {
    if (currentPage === 'course'){
      navigate('/module');
    }else {
      setDialogOpen(true);
    }
    
  };

  // Function to handle closing the filter dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className='searchadd'>
        <div className='swrapper'>
            <div className='searchbar'>
                <SearchIcon />
                <input type='text' placeholder='Search' />
            </div>
            <div className='addbutton'>
                <button className='add' onClick={handleOpenDialog} >
                    <div className='sicon'> {showIcon && <AddCircleIcon />}</div>
                    <div className='btext'><span>{buttonText}</span>
                    {showEastIcon && <EastIcon />}</div>
                    </button>
            </div>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} className='dialogBox'>
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
      </Dialog>
        </div>
    </div>
  )
}

export default SearchAdd