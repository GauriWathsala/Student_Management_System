import React, { useState } from 'react';
import Modal from 'react-modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button'; 
import './dropdownbutton.scss'
import AddstaffForm from '../../Components/Forms/AddstaffForm';

Modal.setAppElement('#root');

const DropdownButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
   
  };

  const handleCloseFormDialog = () => {
    setShowFormDialog(null);
  };

//   const handleAddStaff = (formData) => {
//     fetch('http://localhost:3001/teacher', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log('Teacher data saved:', data);
//       setShowFormDialog(false);
//     })
//     .catch((error) => {
//         console.error('Error saving teacher data:', error);
//         // Handle error here if necessary
//       });
// };


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
      <Modal isOpen={selectedOption === 'Teacher'} onRequestClose={handleCloseFormDialog}  contentLabel="Teacher Form">
        <h2>Teacher Form</h2>
        <AddstaffForm onCancel={handleCloseFormDialog}  />
        {/* <button onClick={handleCloseFormDialog}>Cancel</button>
        */}
      </Modal>
      <Modal isOpen={selectedOption === 'Admin'} onRequestClose={handleCloseFormDialog}  contentLabel="Admin Form">
        <h2>Admin Form</h2>
        <AddstaffForm onCancel={handleCloseFormDialog}  />
        {/* <button onClick={handleCloseFormDialog}>Cancel</button> */}
       
      </Modal>
      <Modal isOpen={selectedOption === 'Receptionist'} onRequestClose={handleCloseFormDialog}  contentLabel="Receptionist Form">
        <h2>Receptionist Form</h2>
        <AddstaffForm onCancel={handleCloseFormDialog}  />
        {/* <button onClick={handleCloseFormDialog}>Cancel</button> */}
      </Modal>
    </div>
  );
};

export default DropdownButton;