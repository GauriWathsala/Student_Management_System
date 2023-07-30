// import React,{ useState }  from 'react'
// import { useNavigate } from 'react-router-dom';
// import './Regform.scss'
// import Grid from '@mui/material/Grid';
// import InputLabel from '@mui/material/InputLabel'; 
// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { Button } from '@mui/material';
// import dayjs from 'dayjs';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import axios from 'axios';

// function RegistrationFrom() {

//   const navigate = useNavigate();

//    // State variable to track form submission status
//    const [submitted, setSubmitted] = useState(false);
 
//   const handleCancel = () => {
//     navigate('/');
//   };

//    // State variable for form data
//    const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     fullName: '',
//     address: '',
//     nic: '',
//     dob: null,
//     contactNumber: '',
//     gender: '',
//     email: '',
//     profession: '',
//     preference: '',
//     country: '', 
//     score: '',
//   });
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };
//   const handleDOBChange = (date) => {
//     // Update the DOB field when the date picker value changes
//     setFormData((prevData) => ({ ...prevData, dob: date }));
//   };
   
//   const handleSubmit = (e) => {
//     e.preventDefault();

//    // Check if all required fields are filled
//    if (
//     formData.firstName &&
//     formData.lastName &&
//     formData.fullName &&
//     formData.address &&
//     formData.nic &&
//     formData.dob &&
//     formData.contactNumber &&
//     formData.gender &&
//     formData.email &&
//     formData.profession &&
//     formData.preference
//   ){
//     // console.log(formData);
//     navigate('/paymentmethod');
//   }  else{
//     alert('Please fill in all required fields.');
//   }
// } 
 
//   return (
//     <div className='registrationFrom'>
//       <div className='form-content'>
//       <form onSubmit={handleSubmit}>
//          <Grid container spacing={1}>
//         <Grid item xs={6} className='name-fields'>
//         <InputLabel>First Name</InputLabel>
//           <TextField 
//             required 
//             id="filled-required" 
//             label="Required" 
//             variant="filled" 
//             size="small"
//              fullWidth
//              name="firstName"
//              value={formData.firstName}
//              onChange={handleInputChange}
//              />
//              {/* {formData.errors && formData.errors.firstName && (
//                 <div className='error-message'>{formData.errors.firstName}</div>
//               )} */}
//         </Grid>
//         <Grid item xs={6} className='name-fields-right'>
//         <InputLabel>Last Name</InputLabel>
//           <TextField 
//           required 
//           id="filled-required" 
//           label="Required" 
//           variant="filled" 
//           size="small" 
//           fullWidth
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleInputChange}
//            />
//            {/* {formData.errors && formData.errors.lastName && (
//                 <div className='error-message'>{formData.errors.lastName}</div>
//               )} */}
//         </Grid>
       
//         <Grid item xs={12} className='full-name-field'>
//         <InputLabel>Full Name</InputLabel>
//           <TextField 
//           required 
//           id="filled-required" 
//           label="Required" 
//           variant="filled" 
//           size="small" 
//           fullWidth
//           name="fullName"
//           value={formData.fullName}
//           onChange={handleInputChange}
//            />
//            {/* {formData.errors && formData.errors.fullName && (
//                 <div className='error-message'>{formData.errors.fullName}</div>
//               )} */}
//         </Grid>
        
//         <Grid item xs={12} className='address-name-field'>
//         <InputLabel>Address</InputLabel>
//           <TextField 
//           required 
//           id="filled-required" 
//           label="Required" 
//           variant="filled" 
//           size="small" 
//           fullWidth
//           name="address"
//           value={formData.address}
//           onChange={handleInputChange}
//           />
//           {/* {formData.errors && formData.errors.address && (
//                 <div className='error-message'>{formData.errors.address}</div>
//               )} */}
//         </Grid>
      
        
//         <Grid item xs={6} className='name-field'>
//         <InputLabel>NIC</InputLabel>
//           <TextField 
//           required 
//           id="filled-required" 
//           label="Required" 
//           variant="filled" 
//           size="small"  
//           name="nic"
//           value={formData.nic}
//           onChange={handleInputChange}
//           // error={!isNICValid}
//           // helperText={!isNICValid && 'Invalid NIC'}
//           // onBlur={validateNIC} 
//           fullWidth
//           />
//             {/* {formData.errors && formData.errors.nic && (
//                 <div className='error-message'>{formData.errors.nic}</div>
//               )} */}
//         </Grid>
//         <Grid item xs={6} className='name-fields-right' size="small" >
//         <InputLabel>Date of Birth</InputLabel>
//           <LocalizationProvider dateAdapter={AdapterDayjs} size="small" >
//             <DatePicker 
//             label="MM/DD/YYYY" 
//             size="small"  
//              name="dob" 
//              onChange={handleDOBChange}
//               value={formData.dob}
//               // onChange={(date) => handleInputChange({ target: { name: 'dob', value: date } })}
//             />
//              {/* {formData.errors && formData.errors. dob && (
//                 <div className='error-message'>{formData.errors. dob}</div>
//               )} */}
//           </LocalizationProvider>
//         </Grid>
//         <Grid item xs={6} className='contact-name-field' >
//         <InputLabel>Contact Number</InputLabel>
//           <TextField 
//           required 
//           id="filled-required" 
//           label="Required" 
//           variant="filled"  
//           size="small" 
//           name="contactNumber"
//           fullWidth
//           value={formData.contactNumber}
//           onChange={handleInputChange}
//            />
//             {/* {formData.errors && formData.errors.contactNumber && (
//                 <div className='error-message'>{formData.errors.contactNumber }</div>
//               )} */}
//         </Grid>
//         <Grid item xs={6}className='gender-name-field' >
//         <InputLabel>Gender</InputLabel>
//           <RadioGroup row aria-label="gender" name="row-radio-buttons-group" className="radio-group" 
//           onChange={handleInputChange} value={formData.gender}
//           //  value={selectedGender}  onChange={(e) => setSelectedGender(e.target.value)}
//           >
//             <FormControlLabel value="female" control={<Radio />} label="Female"  />
//             <FormControlLabel value="male" control={<Radio />} label="Male"   />
//             <FormControlLabel value="other" control={<Radio />} label="Other"  />
//           </RadioGroup>
//         </Grid>
      
//         <Grid item xs={12} className='email-name-field'>
//         <InputLabel>Email</InputLabel>
//           <TextField 
//           required 
//           id="filled-required" 
//           label="Required" 
//           variant="filled"   
//           fullWidth  
//           size="small"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//             />
//             {/* {formData.errors && formData.errors.email && (
//                 <div className='error-message'>{formData.errors.email }</div>
//               )}  */}
//         </Grid>
//         <Grid item xs={6} className='profession-name-field'>
//         <InputLabel>Profession</InputLabel>
//           <TextField 
//           required 
//           id="filled-required" 
//           label="Required" 
//           variant="filled"  
//           size="small" 
//           name="profession"
//           fullWidth
//           value={formData.profession}
//           onChange={handleInputChange}
//           />
//            {/* {formData.errors && formData.errors. profession && (
//                 <div className='error-message'>{formData.errors. profession }</div>
//               )}  */}
//         </Grid>
//         <Grid item xs={6} className='profession-name-field'>
//         <InputLabel>Preference</InputLabel>
//         <FormControl fullWidth variant="filled" size="small">
//           <Select
//             required
//             name="preference"
//             value={formData.preference}
//             onChange={handleInputChange}
//             label="Preference"
           
//           >
//       <MenuItem value="academic">Academic</MenuItem>
//       <MenuItem value="general">General</MenuItem>
//     </Select>
//     {/* {formData.errors && formData.errors.preference && (
//                   <div className='error-message'>{formData.errors.preference}</div>
//                 )} */}
//   </FormControl> 
//         </Grid>
//         <Grid item xs={6} className='profession-name-field'>
//         <InputLabel>Country</InputLabel>
//         <TextField 
//           id="filled-required" 
//           variant="filled"  
//           size="small" 
//           name="country"
//           fullWidth
//           // value={formData.country}
//           // onChange={handleInputChange}

//           />
//            {/* {formData.errors && formData.errors.country && (
//                 <div className='error-message'>{formData.errors.country}</div>
//               )} */}
//         </Grid>
//         <Grid item xs={6} className='profession-name-field'>
//         <InputLabel>Requred Score</InputLabel>
//         <TextField 
//           id="filled-required" 
//           variant="filled"  
//           size="small" 
//           name="score"
//           fullWidth
//           // value={formData.score}
//           // onChange={handleInputChange}
//           />
//           {/* {formData.errors && formData.errors.score && (
//                 <div className="error-message">{formData.errors.score}</div>
//               )} */}
//         </Grid>
//         <Grid item xs={12}>
//         <Button id='cancel-button' type='button' className='reg-button'  onClick={handleCancel}>CANCEL</Button>
//         <Button id='next-button' type='submit' className='reg-button' >PROCEED TO PAYMENT</Button>
//         </Grid>
//         </Grid>
//        </form>
//     </div>
    
//     </div>
//   )
// }

// export default RegistrationFrom



import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import axios from 'axios';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    fullname: '',
    address: '',
    nic: '',
    dob: null,
    email: '',
    contactNo: '',
    gender: '',
    preference: '',
    country: '',
    profession: '',
    reqiredScore: '',
  });

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/student');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDOBChange = (date) => {
    setFormData((prevData) => ({ ...prevData, dob: date }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isDuplicateNIC = (nic) => {
    return students.some((student) => student.nic === nic);
  };

  const validateNIC = (nic) => {
    if (nic.length === 10) {
      return /^[0-9]{9}[Vv]$/.test(nic);
    } else if (nic.length === 12) {
      return /^[0-9]{12}$/.test(nic);
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      formData.firstname &&
      formData.lastname &&
      formData.fullname &&
      formData.address &&
      formData.nic &&
      formData.dob &&
      formData.contactNo &&
      formData.gender &&
      formData.email &&
      formData.profession
    ) {
      if (!validateEmail(formData.email)) {
        alert('Invalid email format. Please enter a valid email address.');
        return;
      }

      if (!validateNIC(formData.nic)) {
        alert('Invalid NIC format. NIC should have 10 or 12 characters with appropriate format.');
        return;
      }

      if (isDuplicateNIC(formData.nic)) {
        alert('This NIC is already registered. Please enter a different NIC.');
        return;
      }

      console.log('Form Data:', formData);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="firstname"
            name="firstname"
            label="First Name"
            value={formData.firstname}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="lastname"
            name="lastname"
            label="Last Name"
            value={formData.lastname}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="fullname"
            name="fullname"
            label="Full Name"
            value={formData.fullname}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="address"
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="nic"
            name="nic"
            label="NIC"
            value={formData.nic}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              required
              fullWidth
              id="dob"
              name="dob"
              label="Date of Birth"
              value={formData.dob}
              onChange={handleDOBChange}
              sx={{ marginBottom: 2 }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="contactNo"
            name="contactNo"
            label="Contact Number"
            value={formData.contactNo}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <RadioGroup
            required
            row
            aria-label="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </Grid>
        <Grid item xs={6}>
          <RadioGroup
            required
            row
            aria-label="preference"
            name="preference"
            value={formData.preference}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          >
            <FormControlLabel value="academic" control={<Radio />} label="Academic" />
            <FormControlLabel value="general" control={<Radio />} label="General" />
          </RadioGroup>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="country" name="country" label="Country" value={formData.country} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="profession" name="profession" label="Profession" value={formData.profession} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="reqiredScore" name="reqiredScore" label="Required Score" value={formData.reqiredScore} onChange={handleInputChange} />
        </Grid>
      </Grid>
      <Button type="submit" color="primary">
        Proceed to Payment
      </Button>
    </Box>
  );
}













