
import React, { useState } from 'react';
import { Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddstaffForm from '../../Components/Forms/AddstaffForm';


const DropdownButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('Add Staff Member');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDialogOpen(true);
    handleMenuClose();
    // Set the dialog title based on the selected option
    if (option === 'Teacher') {
      setDialogTitle('Add Teacher');
    } else if (option === 'Receptionist') {
      setDialogTitle('Add Receptionist');
    } else if (option === 'Admin') {
      setDialogTitle('Add Admin');
    }
  };

 

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedOption(null);
    setDialogTitle('Add Staff Member');
  };

  return (
    <div className='staff'>
      <Button onClick={handleMenuOpen}>Add</Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleOptionSelect('Teacher')}>Teacher</MenuItem>
        <MenuItem onClick={() => handleOptionSelect('Receptionist')}>Receptionist</MenuItem>
        <MenuItem onClick={() => handleOptionSelect('Admin')}>Admin</MenuItem>
      </Menu>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {selectedOption && <AddstaffForm userType={selectedOption} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DropdownButton;
