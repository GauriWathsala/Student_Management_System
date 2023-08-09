
import React , { useEffect, useState }  from 'react';
import { useLocation } from 'react-router-dom';
import OnlinePay from './OnlinePay';
import './PaymentMethod.scss'
import Welcomeheader from './Welcomeheader';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const PaymentMethod = () => {
  const location = useLocation();
  const formData = location.state?.formData || null;
  const [registrationFee, setRegistrationFee] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/fees')
      .then((response) => {
        const registrationFeeData = response.data.find(fee => fee.feeType === 'Registration Fee');
        if (registrationFeeData) {
        setRegistrationFee(registrationFeeData.amount);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  if (!formData) {
    return <div>No form data available.</div>;
  }

  // Function to handle the registration process
  const handleRegister = () => {
    fetch('http://localhost:3001/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
       console.log('form',data);
        // alert('Student registered successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while registering the student.');
      });
  };

 

  return (
    <div className='payment-method'>
      <Welcomeheader />
      <div className='stu-details'>
        
       <div className='list-points form-data-container'>
        <h2>Student Details</h2>
         <p className='points'>
            <strong>First Name : </strong>
            <TextField
              id="firstname"
              name="firstname"
              disabled
              size="small"
              value={formData.firstname}
              className='FormData'
              style={{ marginLeft: '35px'}}
            />
          </p>
        <p className='points'>
          <strong>Last Name :</strong> 
          <TextField
              //fullWidth
              id="lastname"
              name="lastname"
              disabled
              size="small"
              value={formData.lastname}
              className='FormData'
              style={{ marginLeft: '40px'}}
            />
        </p>
        <p className='points'>
          <strong>Full Name :</strong>
          <TextField
             id="fullname"
              name="fullname"
              disabled
              size="small"
              value={formData.fullname}
              className='FormData'
              style={{ marginLeft: '45px'}}
            /> 
        </p>
        <p className='points'>
          <strong>Address :</strong>
          <TextField
             id="address"
              name="address"
              disabled
              size="small"
              value= {formData.address}
              className='FormData'
              style={{ marginLeft: '55px'}}
            /> 
        </p>
        <p className='points'>
          <strong>NIC :</strong>
          <TextField
             id="nic"
              name="nic"
              disabled
              size="small"
              value= {formData.nic}
              className='FormData'
              style={{ marginLeft: '90px'}}
            /> 
        </p>
        <p className='points'>
          <strong>Gender :</strong>
          <TextField
             id="gender"
              name="gender"
              disabled
              size="small"
              value={formData.gender}
              className='FormData'
              style={{ marginLeft: '65px'}}
            />  
        </p>
        <p className='points'>
          <strong>Contact No :</strong> 
          <TextField
             id="contactNo"
              name="contactNo"
              disabled
              size="small"
              value= {formData.contactNo}
              className='FormData'
              style={{ marginLeft: '35px'}}
            /> 
        </p>
        <p className='points'>
          <strong>Email :</strong>
          <TextField
             id="email"
              name="email"
              disabled
              size="small"
              value={formData.email}
              className='FormData'
              style={{ marginLeft: '75px'}}
            />  
        </p>
        <p className='points'>
          <strong>Profession :</strong>
          <TextField
             id="profession"
              name="profession"
              disabled
              size="small"
              value=  {formData.profession}
              className='FormData'
              style={{ marginLeft: '40px'}}
            />  
        </p>
        <p className='points'>
          <strong>Preference :</strong> 
          <TextField
             id="preference"
              name="preference"
              disabled
              size="small"
              value= {formData.preference}
              className='FormData'
              style={{ marginLeft: '38px'}}
            /> 
        </p>
        <p className='points'>
          <strong>Country :</strong>
          <TextField
             id="country"
              name="country"
              disabled
              size="small"
              value= {formData.country}
              className='FormData'
              style={{ marginLeft: '60px'}}
            />  
        </p>
        <p className='points'>
          <strong>Required Score :</strong> 
          <TextField
             id="requiredScore"
              name="requiredScore"
              disabled
              size="small"
              value= {formData.requiredScore}
              className='FormData'
              style={{ marginLeft: '5px'}}
            /> 
        </p>
       </div>
        <div className='online-pay'>
          <span id='feeAmountTitle'> Registration Fee  </span>
          <TextField
            required
            fullWidth
            id="registrationFee"
            name="registrationFee"
            disabled
            size="small"
            value=  {`Rs. ${registrationFee}`}
           />
           <div className='online-box'>
         <OnlinePay/>
         </div>
       </div>
     </div>
  <button onClick={handleRegister} className='register-button'>REGISTER</button>
  
    </div>
  );
};

export default PaymentMethod;

