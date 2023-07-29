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
import axios from 'axios';

function RegistrationFrom() {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('');
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
    preference: "",
    country: "",
    score: "",
    errors: {},
  });

  const [isNICValid, setIsNICValid] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value ,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredFields = ['firstName', 'lastName', 'fullName', 'address', 'nic', 'dob', 'gender', 'contactNumber', 'email', 'profession'];
    const hasEmptyFields = requiredFields.some((field) =>{
      const fieldValue = formData[field];
      return fieldValue === undefined || fieldValue === null ||(typeof fieldValue === 'string' && fieldValue.trim() === '');
    });
    if (hasEmptyFields) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        errors: {
          ...prevFormData.errors,
          ...requiredFields.reduce((acc, field) => {
            if (!prevFormData[field].trim()) {
              acc[field] = 'This field is required';
            }
            return acc;
          }, {}),
        },
      }));
    } 
    else if (validateNIC()) {
      try {
        const response = await axios.get('http://localhost:3001/student'); 
        const students = response.data;
        const isNICRegistered = students.some((student) => student.nic === formData.nic);
        if (isNICRegistered) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            errors: {
              ...prevFormData.errors,
              nic: 'This NIC is already registered as a student',
            },
          }));
       } else {
        console.log('Form submitted:', formData);
        navigate('/paymentmethod'); 
      
    }
  } catch (error) {
    console.error('Error fetching student details:', error);
    setFormData((prevFormData) => ({
      ...prevFormData,
      errors: {
        ...prevFormData.errors,
        nic: 'Error occurred while checking the NIC. Please try again later.',
      },
    }));
  }
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
             value={formData.firstName}
             onChange={handleInputChange}
             />
             {formData.errors && formData.errors.firstName && (
                <div className='error-message'>{formData.errors.firstName}</div>
              )}
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
          value={formData.lastName}
          onChange={handleInputChange}
           />
           {formData.errors && formData.errors.lastName && (
                <div className='error-message'>{formData.errors.lastName}</div>
              )}
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
          value={formData.fullName}
          onChange={handleInputChange}
           />
           {formData.errors && formData.errors.fullName && (
                <div className='error-message'>{formData.errors.fullName}</div>
              )}
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
          value={formData.address}
          onChange={handleInputChange}
          />
          {formData.errors && formData.errors.address && (
                <div className='error-message'>{formData.errors.address}</div>
              )}
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
            {formData.errors && formData.errors.nic && (
                <div className='error-message'>{formData.errors.nic}</div>
              )}
        </Grid>
        <Grid item xs={6} className='name-fields-right' size="small" >
        <InputLabel>Date of Birth</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs} size="small" >
            <DatePicker 
            label="MM/DD/YYYY" 
            size="small"  
             name="dob" 
              value={formData.dob}
              onChange={(date) => handleInputChange({ target: { name: 'dob', value: date } })}
            />
             {formData.errors && formData.errors. dob && (
                <div className='error-message'>{formData.errors. dob}</div>
              )}
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
          value={formData.contactNumber}
          onChange={handleInputChange}
           />
            {formData.errors && formData.errors.contactNumber && (
                <div className='error-message'>{formData.errors.contactNumber }</div>
              )}
        </Grid>
        <Grid item xs={6}className='gender-name-field' >
        <InputLabel>Gender</InputLabel>
          <RadioGroup row aria-label="gender" name="row-radio-buttons-group" className="radio-group" 
           value={selectedGender}  onChange={(e) => setSelectedGender(e.target.value)}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female"  />
            <FormControlLabel value="male" control={<Radio />} label="Male"   />
            <FormControlLabel value="other" control={<Radio />} label="Other"  />
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
          value={formData.email}
          onChange={handleInputChange}
            />
            {formData.errors && formData.errors.email && (
                <div className='error-message'>{formData.errors.email }</div>
              )} 
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
          value={formData.profession}
          onChange={handleInputChange}
          />
           {formData.errors && formData.errors. profession && (
                <div className='error-message'>{formData.errors. profession }</div>
              )} 
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
           
          >
      <MenuItem value="academic">Academic</MenuItem>
      <MenuItem value="general">General</MenuItem>
    </Select>
    {formData.errors && formData.errors.preference && (
                  <div className='error-message'>{formData.errors.preference}</div>
                )}
  </FormControl> 
        </Grid>
        <Grid item xs={6} className='profession-name-field'>
        <InputLabel>Country</InputLabel>
        <TextField 
          id="filled-required" 
          variant="filled"  
          size="small" 
          name="country"
          fullWidth
          value={formData.country}
          onChange={handleInputChange}

          />
           {formData.errors && formData.errors.country && (
                <div className='error-message'>{formData.errors.country}</div>
              )}
        </Grid>
        <Grid item xs={6} className='profession-name-field'>
        <InputLabel>Requred Score</InputLabel>
        <TextField 
          id="filled-required" 
          variant="filled"  
          size="small" 
          name="score"
          fullWidth
          value={formData.score}
          onChange={handleInputChange}
          />
          {formData.errors && formData.errors.score && (
                <div className="error-message">{formData.errors.score}</div>
              )}
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