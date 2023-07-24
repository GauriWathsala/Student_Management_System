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
import TextField from '@mui/material/TextField';
import Receptionist from '../../Pages/Receptionist/Receptionist';
import AddstaffForm from '../Forms/AddstaffForm';
import { red } from '@mui/material/colors';
//import { AddstaffForm } from '../Forms/AddstaffForm';
import { makeStyles } from '@mui/material/styles';



const SearchAdd = ({currentPage}) => {
  const navigate = useNavigate ();

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
    
  
  //**************Dialogbox************************** */
  // State to manage the dialog visibility
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Function to handle opening the filter dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  // Function to handle closing the filter dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAddItem = () => {
    if (currentPage === 'receptionist') {
      
    } else if (currentPage === 'teacher') {
      alert ('moko')
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
                <button className='add' onClick={handleOpenDialog} >
                    <div className='sicon'><AddCircleIcon /></div>
                    <div className='btext'><span>Add</span></div>
                    </button>
            </div>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} className='dialogBox'>
        <DialogTitle>
          {currentPage === 'receptionist' ? <h2 style={{color:'#1eb2a6'}}>Add New Staff Member</h2>:"Tama Hadala Naa"}
        </DialogTitle>
        <DialogContent>
          {currentPage === 'receptionist' ? <AddstaffForm /> : 'hellow' }
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