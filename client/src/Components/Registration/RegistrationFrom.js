import React,{ useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import './Regform.scss'
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel'; 
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function RegistrationFrom() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/');
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    address: "",
    nic: "",
    dob: null,
    gender: "",
    contactNumber: "",
    email: "",
    profession: "",
    errors: {},
  });

  const [isNICValid, setIsNICValid] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateNIC()) {
      // Form is valid, handle form submission here
      console.log('Form submitted:', formData);
      // Replace the console.log with your form submission logic (e.g., sending data to the server)
    } else {
      setIsNICValid(false);
      
    }
  };
 

  
  const validateNIC = () => {
    const { nic } = formData;
    const isValidLength = nic.length === 10 || nic.length === 12;
    const isValidFormat10Chars = /^\d{9}[vV]$/.test(nic);
    const isValidFormat12Chars = /^\d{12}$/.test(nic);
    const isValid = isValidLength && (
      (nic.length === 10 && isValidFormat10Chars) ||
      (nic.length === 12 && isValidFormat12Chars)
    );
    setIsNICValid(isValid);
    return isValid;
  };
  


  return (
    <div className='registrationFrom'>
      <div className='form-content'>
      <form onSubmit={handleSubmit}>
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
             name="firstName"
           
             />
        </Grid>
        <Grid item xs={6} className='name-fields-right'>
        <InputLabel>Last Name</InputLabel>
          <TextField 
          required 
          id="filled-required" 
          label="Required" 
          variant="filled" 
          size="small" 
          fullWidth
          name="lastName"
           
           />
        </Grid>
       
        <Grid item xs={12} className='full-name-field'>
        <InputLabel>Full Name</InputLabel>
          <TextField 
          required 
          id="filled-required" 
          label="Required" 
          variant="filled" 
          size="small" 
          fullWidth
          name="fullName"
        
           />
        </Grid>
        
        <Grid item xs={12} className='address-name-field'>
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
      
        
        <Grid item xs={6} className='name-field'>
        <InputLabel>National Identity Card Number</InputLabel>
          <TextField 
          required 
          id="filled-required" 
          label="Required" 
          variant="filled" 
          size="small"  
          name="nic"
          value={formData.nic}
          onChange={handleInputChange}
          error={!isNICValid}
          helperText={!isNICValid && 'Invalid NIC'}
          onBlur={validateNIC} 
          fullWidth
          />
           
        </Grid>
        <Grid item xs={6} className='name-fields-right' size="small" fullWidth >
        <InputLabel>Date of Birth</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs} size="small" fullWidth>
            <DatePicker 
            label="MM/DD/YYYY" 
            size="small"  
             name="dob" 
             fullWidth
            
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} className='contact-name-field' >
        <InputLabel>Contact Number</InputLabel>
          <TextField 
          required 
          id="filled-required" 
          label="Required" 
          variant="filled" 
          size="small" 
          name="contactNumber"
          fullWidth
          
           />
        </Grid>
        <Grid item xs={6}className='gender-name-field' >
        <InputLabel>Gender</InputLabel>
          <RadioGroup row aria-label="gender" name="row-radio-buttons-group" className="radio-group" size="small"
         
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </Grid>
      
        <Grid item xs={12} className='email-name-field'>
        <InputLabel>Email</InputLabel>
          <TextField 
          required 
          id="filled-required" 
          label="Required" 
          variant="filled" 
          fullWidth  
          size="small"
          name="email"
          
            />
        </Grid>
        <Grid item xs={6} className='profession-name-field'>
        <InputLabel>Profession</InputLabel>
          <TextField 
          required 
          id="filled-required" 
          label="Required" 
          variant="filled"  
          size="small" 
          name="profession"
          fullWidth
          />
        </Grid>
        <Grid item xs={6} className='profession-name-field'>
        <InputLabel>Preference</InputLabel>
        <FormControl fullWidth variant="filled" size="small">
          <Select
            required
            name="preference"
            value={formData.preference}
            onChange={handleInputChange}
            label="Preference"
            fullWidth
          >
      <MenuItem value="academic">Academic</MenuItem>
      <MenuItem value="general">General</MenuItem>
    </Select>
  </FormControl> 
        </Grid>
        <Grid item xs={6} className='profession-name-field'>
        <InputLabel>Country</InputLabel>
        <TextField 
          id="filled-required" 
          variant="filled"  
          size="small" 
          name="profession"
          fullWidth
          
          />
        </Grid>
        <Grid item xs={6} className='profession-name-field'>
        <InputLabel>Requred Score</InputLabel>
        <TextField 
          id="filled-required" 
          variant="filled"  
          size="small" 
          name="score"
          fullWidth
         
          />
        </Grid>
        <Grid item xs={12}>
        <Button id='cancel-button' type='submit' className='reg-button'  onClick={handleCancel}>CANCEL</Button>
        <Button id='next-button' type='submit' className='reg-button'>PROCEED TO PAYMENT</Button>
        </Grid>
        </Grid>
       </form>
    </div>
    
    </div>
  )
}

export default RegistrationFrom