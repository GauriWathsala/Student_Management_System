import React, { useState } from 'react';
import Modal from 'react-modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './dropdownbutton.scss'
import AddstaffForm from '../../Components/Forms/AddstaffForm';

Modal.setAppElement('#root');

const DropdownButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    if (option === 'Teacher') {
      setShowFormDialog(true);
    } else {
      // Replace this with the functionality you want for other options
      console.log(`Clicked option: ${option}`);
    }
  };

  const handleCloseFormDialog = () => {
    setShowFormDialog(false);
  };

  const handleAddStaff = () => {
    // Add your desired functionality here to handle the "Add" button click
    // For example, you can save the form data or make an API call.
    setShowFormDialog(false); // Close the modal after adding staff.
  };


  const dropdownOptions = ['Admin', 'Teacher', 'Receptionist'];

  return (
    <div className='drop-down-button'>
        <div className='add-button'>
        <button onClick={toggleDropdown} id='dro-dow-but' > <AddCircleIcon /> ADD</button>
        </div>
    
      {showDropdown && (
        <div className="dropdown">
          {dropdownOptions.map((option, index) => (
            <button key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Modal Dialog Box for Teacher Form */}
      <Modal isOpen={showFormDialog} onRequestClose={handleCloseFormDialog}  contentLabel="Teacher Form">
        <h2>Teacher Form</h2>
        <AddstaffForm onCancel={handleCloseFormDialog} onAdd={handleAddStaff} />
        <button onClick={handleCloseFormDialog} onAdd={handleAddStaff}>Close</button>
      </Modal>
    </div>
  );
};

export default DropdownButton;
