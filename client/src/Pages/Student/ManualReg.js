import React, { useState,useEffect }from 'react'
import './manualreg.scss'
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
        firstname : '', lastname :'', fullname: '', address:'',nic:'',dob :'',contactNo:'',gender :'',email:'',
        profession :'', preference:'', country:'',requiredScore:'',amount:'',payType:'',
    });

    const handleCancel = () => {
        navigate('/student');
      };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/student', formData);
            console.log(response.data);
            window.alert('Student registered successfully!');
            // setFormData ({

            // })
        }catch (error) {
            console.error('Error registering student:', error);
            window.alert('Error registering student. Please try again later.');
        }
    }

  return (
    <div className='manualReg'>
        <div className='welcome-header'>
        <Welcomeheader />
        </div>
        <h1 className='topic'>STUDENT REGISTRATION</h1>
         <div className='form-content'>
           
         <form onSubmit={handleFormSubmit} >
         <Grid container spacing={1}>
         <Grid item xs={6} className='name-fields'>
        <InputLabel>First Name</InputLabel>
          <TextField 
            required 
            id="filled-required" 
            label="Required" 
            variant="filled" 
            size="small"
            fullWidth
            name="firstname"
             />
           </Grid>
           <Grid item xs={6} className='name-fields'>
            <InputLabel>Last Name</InputLabel>
            <TextField 
            required 
            id="filled-required" 
            label="Required" 
            variant="filled" 
            size="small"
            fullWidth
            name="lastname"
             />
           </Grid>
           <Grid item xs={12} className='name-fields'>
            <InputLabel>Full Name</InputLabel>
            <TextField 
            required 
            id="filled-required" 
            label="Required" 
            variant="filled" 
            size="small"
            fullWidth
            name="fullname"
             />
           </Grid>
           <Grid item xs={12} className='name-fields'>
            <InputLabel>Address</InputLabel>
            <TextField 
            required 
            id="filled-required" 
            label="Required" 
            variant="filled" 
            size="small"
            fullWidth
            name="address"
             />
           </Grid>
           <Grid item xs={6} className='name-fields'>
            <InputLabel>NIC</InputLabel>
            <TextField 
            required 
            id="filled-required" 
            label="Required" 
            variant="filled" 
            size="small"
            fullWidth
            name="nic"
             />
           </Grid>
           <Grid item xs={6} className='name-fields-right' size="small" >
            <InputLabel>Date of Birth</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs} size="small" >
            <DatePicker 
            label="MM/DD/YYYY" 
            size="small"  
            name="dob" 
           />
            </LocalizationProvider>
            </Grid>
            <Grid item xs={6} className='name-fields'>
            <InputLabel>Contact No</InputLabel>
            <TextField 
            required 
            id="filled-required" 
            label="Required" 
            variant="filled" 
            size="small"
            fullWidth
            name="contactNo"
             />
           </Grid>
           <Grid item xs={6}className='gender-name-field' >
            <InputLabel>Gender</InputLabel>
            <RadioGroup row aria-label="gender" name="gender" className="radio-group" 
            >
            <FormControlLabel value="female" control={<Radio />} label="Female"  />
            <FormControlLabel value="male" control={<Radio />} label="Male"   />
            <FormControlLabel value="other" control={<Radio />} label="Other"  />
          </RadioGroup>
        </Grid>
            <Grid item xs={12} className='name-fields'>
            <InputLabel>Email</InputLabel>
            <TextField 
            required 
            id="filled-required" 
            label="Required" 
            variant="filled" 
            size="small"
            fullWidth
            name="email"
            />
           </Grid>
           <Grid item xs={6} className='name-fields'>
            <InputLabel>Profession</InputLabel>
            <TextField 
            required 
            id="filled-required" 
            label="Required" 
            variant="filled" 
            size="small"
            fullWidth
            name="profession"
            />
           </Grid>
           <Grid item xs={6}className='gender-name-field' >
            <InputLabel>Preference</InputLabel>
            <RadioGroup row aria-label="preference" name="preference" className="radio-group" 
            >
            <FormControlLabel value="academic" control={<Radio />} label="Academic"  />
            <FormControlLabel value="general" control={<Radio />} label="general"   />
            </RadioGroup>
        </Grid>
          
           <Grid item xs={6} className='name-fields'>
            <InputLabel>Country</InputLabel>
            <TextField 
           id="filled-required" 
           variant="filled" 
            size="small"
            fullWidth
            name="country"
            />
           </Grid>
           <Grid item xs={6} className='name-fields'>
            <InputLabel>Required Score</InputLabel>
            <TextField 
           id="filled-required" 
            variant="filled" 
            size="small"
            fullWidth
            name="requiredScore"
            />
           </Grid>
           <Grid item xs={6} className='name-fields'>
            <InputLabel>Amount</InputLabel>
            <TextField 
            required 
            id="filled-required" 
            label="Required" 
            variant="filled" 
            size="small"
            fullWidth
            name="amount"
            />
           </Grid>
           <Grid item xs={6} className='name-fields'>
            <InputLabel>Payment Type</InputLabel>
            <TextField 
            required 
            id="filled-required" 
            label="Required" 
            variant="filled" 
            size="small"
            fullWidth
            name="payType"
            />
           </Grid>
        <div className='buttons'>
        <Button id='cancel-button' onClick={handleCancel}> Cancel</Button>
        <Button id='next-button' type="submit"> Register</Button>
        </div>
        
         </Grid>
         </form>
         </div>
    </div>
  )
}

export default ManualReg