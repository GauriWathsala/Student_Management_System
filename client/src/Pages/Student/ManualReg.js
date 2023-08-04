// import React, { useState,useEffect }from 'react'
// import './manualreg.scss'
// import { useNavigate } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import { Button } from '@mui/material';
// import Welcomeheader from '../../Components/Registration/Welcomeheader';
// import axios from 'axios';

// function ManualReg() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//       firstname : '', lastname :'', fullname: '', address:'',nic:'',dob :'',contactNo:'',gender :'',email:'',
//         profession :'', preference:'', country:'',requiredScore:'',
//     });

//     const handleCancel = () => {
//         navigate('/student');
//       };

//       const [submitButtonText, setSubmitButtonText] = useState("Add Student");

//       const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//       };
    

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:3001/student', formData);
//             console.log(response.data);
//             window.alert('Student registered successfully!');
//             // setFormData ({
//               console.log("form data -> ", formData);
//               await axios.post(apiEndpoint, formData);
//               alert(`${userType} created successfully!`);
//               setFormData({
//                 firstname : '', lastname :'', fullname: '', address:'',nic:'',dob :'',contactNo:'',gender :'',email:'',
//         profession :'', preference:'', country:'',requiredScore:''
//               });
            
//         }catch (error) {
//             console.error('Error registering student:', error);
//             window.alert('Error registering student. Please try again later.');
//         }
//     }

//   return (
//     <div className='manualReg'>
//         <div className='welcome-header'>
//         <Welcomeheader />
//         </div>
//         <h1 className='topic'>STUDENT REGISTRATION</h1>
//          <div className='form-content'>
           
//          <form onSubmit={handleFormSubmit} >
//          <Grid container spacing={1}>
//          <Grid item xs={6} className='name-fields'>
//         <InputLabel>First Name</InputLabel>
//           <TextField 
//             required 
//             id="filled-required" 
//             label="Required" 
//             variant="filled" 
//             size="small"
//             fullWidth
//             name="firstname"
//             onChange={handleChange}
//             value={formData.firstname}
//              />
//            </Grid>
//            <Grid item xs={6} className='name-fields'>
//             <InputLabel>Last Name</InputLabel>
//             <TextField 
//             required 
//             id="filled-required" 
//             label="Required" 
//             variant="filled" 
//             size="small"
//             fullWidth
//             name="lastname"
//             onChange={handleChange}
//             value={formData.lastname}
//              />
//            </Grid>
//            <Grid item xs={12} className='name-fields'>
//             <InputLabel>Full Name</InputLabel>
//             <TextField 
//             required 
//             id="filled-required" 
//             label="Required" 
//             variant="filled" 
//             size="small"
//             fullWidth
//             name="fullname"
//             onChange={handleChange}
//             value={formData.fullname}
//              />
//            </Grid>
//            <Grid item xs={12} className='name-fields'>
//             <InputLabel>Address</InputLabel>
//             <TextField 
//             required 
//             id="filled-required" 
//             label="Required" 
//             variant="filled" 
//             size="small"
//             fullWidth
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//              />
//            </Grid>
//            <Grid item xs={6} className='name-fields'>
//             <InputLabel>NIC</InputLabel>
//             <TextField 
//             required 
//             id="filled-required" 
//             label="Required" 
//             variant="filled" 
//             size="small"
//             fullWidth
//             name="nic"
//             onChange={handleChange}
//             value={formData.nic}
//              />
//            </Grid>
//            <Grid item xs={6} className='name-fields-right' size="small" >
//             <InputLabel>Date of Birth</InputLabel>
//           <LocalizationProvider dateAdapter={AdapterDayjs} size="small" >
//             <DatePicker 
//             label="MM/DD/YYYY" 
//             size="small"  
//             name="dob" 
//             onChange={handleChange}
//             value={formData.dob}
//            />
//             </LocalizationProvider>
//             </Grid>
//             <Grid item xs={6} className='name-fields'>
//             <InputLabel>Contact No</InputLabel>
//             <TextField 
//             required 
//             id="filled-required" 
//             label="Required" 
//             variant="filled" 
//             size="small"
//             fullWidth
//             name="contactNo"
//             onChange={handleChange}
//             value={formData.contactNo}
//              />
//            </Grid>
//            <Grid item xs={6}className='gender-name-field' >
//             <InputLabel>Gender</InputLabel>
//             <RadioGroup row aria-label="gender" name="gender" className="radio-group" onChange={handleChange}  value={formData.gender}
//             >
//             <FormControlLabel value="female" control={<Radio />} label="Female"  />
//             <FormControlLabel value="male" control={<Radio />} label="Male"   />
        
//           </RadioGroup>
//         </Grid>
//             <Grid item xs={12} className='name-fields'>
//             <InputLabel>Email</InputLabel>
//             <TextField 
//             required 
//             id="filled-required" 
//             label="Required" 
//             variant="filled" 
//             size="small"
//             fullWidth
//             name="email"
//             onChange={handleChange}
//             value={formData.email}
//             />
//            </Grid>
//            <Grid item xs={6} className='name-fields'>
//             <InputLabel>Profession</InputLabel>
//             <TextField 
//             required 
//             id="filled-required" 
//             label="Required" 
//             variant="filled" 
//             size="small"
//             fullWidth
//             name="profession"
//             onChange={handleChange}
//             value={formData.profession}
//             />
//            </Grid>
//            <Grid item xs={6}className='gender-name-field' >
//             <InputLabel>Preference</InputLabel>
//             <RadioGroup row aria-label="preference" name="preference" className="radio-group" onChange={handleChange}  value={formData.preference}
//             >
//             <FormControlLabel value="academic" control={<Radio />} label="Academic"  />
//             <FormControlLabel value="general" control={<Radio />} label="general"   />
//             </RadioGroup>
//         </Grid>
          
//            <Grid item xs={6} className='name-fields'>
//             <InputLabel>Country</InputLabel>
//             <TextField 
//            id="filled-required" 
//            variant="filled" 
//             size="small"
//             fullWidth
//             name="country"
//             onChange={handleChange}
//             value={formData.country}
//             />
//            </Grid>
//            <Grid item xs={6} className='name-fields'>
//             <InputLabel>Required Score</InputLabel>
//             <TextField 
//            id="filled-required" 
//             variant="filled" 
//             size="small"
//             fullWidth
//             name="requiredScore"
//             onChange={handleChange}
//             value={formData.requiredScore}
//             />
//            </Grid>
//            <Grid item xs={6} className='name-fields'>
//             <InputLabel>Amount</InputLabel>
//             <TextField 
//             required 
//             id="filled-required" 
//             label="Required" 
//             variant="filled" 
//             size="small"
//             fullWidth
//             name="amount"
//             value={formData}
//             onChange={handleChange}
//             />
//            </Grid>
//            {/* <Grid item xs={6} className='name-fields'>
//             <InputLabel>Payment Type</InputLabel>
//             <TextField 
//             required 
//             id="filled-required" 
//             label="Required" 
//             variant="filled" 
//             size="small"
//             fullWidth
//             name="payType"
//             onChange={handleChange}
//             />
//            </Grid> */}
//         <div className='buttons'>
//         <Button id='cancel-button' onClick={handleCancel}> Cancel</Button>
//         <Button id='next-button' type="submit"> Register</Button>
//         </div>
        
//          </Grid>
//          </form>
//          </div>
//     </div>
//   )
// }

// export default ManualReg




// import React, { useState } from 'react';
// import './manualreg.scss';
// import { useNavigate } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import { Button } from '@mui/material';
// import Welcomeheader from '../../Components/Registration/Welcomeheader';
// import axios from 'axios';

// function ManualReg() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     fullname: '',
//     address: '',
//     nic: '',
//     dob: '',
//     contactNo: '',
//     gender: '',
//     email: '',
//     profession: '',
//     preference: '',
//     country: '',
//     requiredScore: '',
//   });

//   const handleCancel = () => {
//     navigate('/student');
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3001/student', formData);
//       console.log(response.data);
//       window.alert('Student registered successfully!');
//       setFormData({
//         firstname: '',
//         lastname: '',
//         fullname: '',
//         address: '',
//         nic: '',
//         dob: '',
//         contactNo: '',
//         gender: '',
//         email: '',
//         profession: '',
//         preference: '',
//         country: '',
//         requiredScore: '',
//       });
//     } catch (error) {
//       console.error('Error registering student:', error);
//       window.alert('Error registering student. Please try again later.');
//     }
//   };

//   return (
//     <div className='manualReg'>
//       <div className='welcome-header'>
//         <Welcomeheader />
//       </div>
//       <h1 className='topic'>STUDENT REGISTRATION</h1>
//       <div className='form-content'>
//         <form onSubmit={handleFormSubmit}>
//           <Grid container spacing={1}>
          

//             <div className='buttons'>
//               <Button id='cancel-button' onClick={handleCancel}>
//                 Cancel
//               </Button>
//               <Button id='next-button' type='submit'>
//                 Register
//               </Button>
//             </div>
//           </Grid>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ManualReg;



import React, { useState } from 'react';
import './manualreg.scss';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Button } from '@mui/material';
import Welcomeheader from '../../Components/Registration/Welcomeheader';
import axios from 'axios';

function ManualReg() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    fullname: '',
    address: '',
    nic: '',
    dob: '',
    contactNo: '',
    gender: '',
    email: '',
    profession: '',
    preference: '',
    country: '',
    requiredScore: '',
    amount: '',
  });

  const handleCancel = () => {
    navigate('/student');
  };

  const [submitButtonText, setSubmitButtonText] = useState('Add Student');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // const response = await axios.post('http://localhost:3001/student', formData);
      // console.log(response.data);
      // window.alert('Student registered successfully!');
      // setFormData ({
      console.log('form data -> ', formData);
      await axios.post(apiEndpoint, formData);
      alert(`${userType} created successfully!`);
      setFormData({
        firstname: '',
        lastname: '',
        fullname: '',
        address: '',
        nic: '',
        dob: '',
        contactNo: '',
        gender: '',
        email: '',
        profession: '',
        preference: '',
        country: '',
        requiredScore: '',
        amount: '',
      });
    } catch (error) {
      console.error('Error registering student:', error);
      window.alert('Error registering student. Please try again later.');
    }
  };

  // Define your API endpoint URL here
const apiEndpoint = 'http://localhost:3001/student';

// Define your user type here (if applicable)
const userType = 'student';

  return (
    <div className='manualReg'>
      <div className='welcome-header'>
        <Welcomeheader />
      </div>
      <h1 className='topic'>STUDENT REGISTRATION</h1>
      <div className='form-content'>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={6} className='name-fields'>
              <InputLabel>First Name</InputLabel>
              <TextField
                required
                id='filled-required'
                label='Required'
                variant='filled'
                size='small'
                fullWidth
                name='firstname'
                onChange={handleChange}
                value={formData.firstname}
              />
            </Grid>
            <Grid item xs={6} className='name-fields'>
              <InputLabel>Last Name</InputLabel>
              <TextField
                required
                id='filled-required'
                label='Required'
                variant='filled'
                size='small'
                fullWidth
                name='lastname'
                onChange={handleChange}
                value={formData.lastname}
              />
            </Grid>
            <Grid item xs={12} className='name-fields'>
              <InputLabel>Full Name</InputLabel>
              <TextField
                required
                id='filled-required'
                label='Required'
                variant='filled'
                size='small'
                fullWidth
                name='fullname'
                onChange={handleChange}
                value={formData.fullname}
              />
            </Grid>
            <Grid item xs={12} className='name-fields'>
              <InputLabel>Address</InputLabel>
              <TextField
                required
                id='filled-required'
                label='Required'
                variant='filled'
                size='small'
                fullWidth
                name='address'
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} className='name-fields'>
              <InputLabel>NIC</InputLabel>
              <TextField
                required
                id='filled-required'
                label='Required'
                variant='filled'
                size='small'
                fullWidth
                name='nic'
                onChange={handleChange}
                value={formData.nic}
              />
            </Grid>
            <Grid item xs={6} className='name-fields-right' size='small'>
              <InputLabel>Date of Birth</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs} size='small'>
                <DatePicker
                  label='MM/DD/YYYY'
                  size='small'
                  name='dob'
                  onChange={(date) => handleChange({ target: { name: 'dob', value: date } })}
                
                  value={formData.dob}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} className='name-fields'>
              <InputLabel>Contact No</InputLabel>
              <TextField
                required
                id='filled-required'
                label='Required'
                variant='filled'
                size='small'
                fullWidth
                name='contactNo'
                onChange={handleChange}
                value={formData.contactNo}
              />
            </Grid>
            <Grid item xs={6} className='gender-name-field'>
              <InputLabel>Gender</InputLabel>
              <RadioGroup
                row
                aria-label='gender'
                name='gender'
                className='radio-group'
                onChange={handleChange}
                value={formData.gender}
              >
                <FormControlLabel value='female' control={<Radio />} label='Female' />
                <FormControlLabel value='male' control={<Radio />} label='Male' />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} className='name-fields'>
              <InputLabel>Email</InputLabel>
              <TextField
                required
                id='filled-required'
                label='Required'
                variant='filled'
                size='small'
                fullWidth
                name='email'
                onChange={handleChange}
                value={formData.email}
              />
            </Grid>
            <Grid item xs={6} className='name-fields'>
              <InputLabel>Profession</InputLabel>
              <TextField
                required
                id='filled-required'
                label='Required'
                variant='filled'
                size='small'
                fullWidth
                name='profession'
                onChange={handleChange}
                value={formData.profession}
              />
            </Grid>
            <Grid item xs={6} className='gender-name-field'>
              <InputLabel>Preference</InputLabel>
              <RadioGroup
                row
                aria-label='preference'
                name='preference'
                className='radio-group'
                onChange={handleChange}
                value={formData.preference}
              >
                <FormControlLabel value='academic' control={<Radio />} label='Academic' />
                <FormControlLabel value='general' control={<Radio />} label='General' />
              </RadioGroup>
            </Grid>

            <Grid item xs={6} className='name-fields'>
              <InputLabel>Country</InputLabel>
              <TextField
                id='filled-required'
                variant='filled'
                size='small'
                fullWidth
                name='country'
                onChange={handleChange}
                value={formData.country}
              />
            </Grid>
            <Grid item xs={6} className='name-fields'>
              <InputLabel>Required Score</InputLabel>
              <TextField
                id='filled-required'
                variant='filled'
                size='small'
                fullWidth
                name='requiredScore'
                onChange={handleChange}
                value={formData.requiredScore}
              />
            </Grid>
            <Grid item xs={6} className='name-fields'>
              <InputLabel>Amount</InputLabel>
              <TextField
                required
                id='filled-required'
                label='Required'
                variant='filled'
                size='small'
                fullWidth
                name='amount'
                value={formData.amount}
                onChange={handleChange}
                disabled
              />
            </Grid>
          </Grid>
          <div className='buttons'>
            <Button id='cancel-button' onClick={handleCancel}>
              Cancel
            </Button>
            <Button id='next-button' type='submit'>
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManualReg;
