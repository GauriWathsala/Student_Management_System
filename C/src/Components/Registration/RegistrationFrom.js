import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';
import './registrationform.scss'




const RegistrationForm = () => {
  const navigate = useNavigate ();
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
    requiredScore: '',
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
;

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

  const handleSubmit =  async (e) => {
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

      // navigate('/paymentmethod',{ state: { formData: formData } });
      navigate('/paymentmethod', { state: { formData: formData } }); 

    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handlenavigate = () =>{
    navigate('/');
  }

  return (
    
    <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }} noValidate autoComplete="off">
      <div className='form-fields'>
      <Grid container spacing={2}>
        <Grid item xs={4.5}>
          <TextField
            required
            fullWidth
            id="firstname"
            name="firstname"
            label="First Name"
            value={formData.firstname}
            onChange={handleInputChange}
           
          />
        </Grid>
        <Grid item xs={4.5}>
          <TextField
            required
            fullWidth
            id="lastname"
            name="lastname"
            label="Last Name"
            value={formData.lastname}
            onChange={handleInputChange}
           
          />
        </Grid>
        <Grid item xs={9}>
          <TextField
            required
            fullWidth
            id="fullname"
            name="fullname"
            label="Full Name"
            value={formData.fullname}
            onChange={handleInputChange}
           
          />
        </Grid>
        <Grid item xs={9}>
          <TextField
            required
            fullWidth
            id="address"
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleInputChange}
           
          />
        </Grid> <br/>
        <Grid item xs={4.5}>
          <TextField
            required
            fullWidth
            id="nic"
            name="nic"
            label="NIC"
            value={formData.nic}
            onChange={handleInputChange}
        
          />
        </Grid>
        <Grid item xs={4.5}>
  <TextField
    required
    fullWidth
    id="dob"
    name="dob"
    type="date"
    label="Date of Birth"
    value={formData.dob}
    onChange={handleInputChange}
    InputLabelProps={{
      shrink: true, 
    }}
  />
</Grid>
        <Grid item xs={9}>
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            
          />
        </Grid>
        <Grid item xs={4.5}>
          <TextField
            required
            fullWidth
            id="contactNo"
            name="contactNo"
            label="Contact Number"
            value={formData.contactNo}
            onChange={handleInputChange}
          
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
           
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
           
          </RadioGroup>
        </Grid>
        <Grid item xs={4.5}>
          <TextField 
          fullWidth 
          id="profession" 
          name="profession" 
          label="Profession" 
          value={formData.profession} 
          onChange={handleInputChange}
          required />
        </Grid>
        <Grid item xs={6}>
          <RadioGroup
            required
            row
            aria-label="preference"
            name="preference"
            value={formData.preference}
            onChange={handleInputChange}
           >
            <FormControlLabel value="academic" control={<Radio />} label="Academic" />
            <FormControlLabel value="general" control={<Radio />} label="General" />
          </RadioGroup>
        </Grid>
      
        <Grid item xs={4.5}>
          <TextField 
          fullWidth 
          id="country" 
          name="country" 
          label="Targeted Country" 
          value={formData.country} 
          onChange={handleInputChange} />
        </Grid>
       
        <Grid item xs={4.5}>
          <TextField 
          fullWidth 
          id="requiredScore" 
          name="requiredScore" 
          label="Required Score" 
          value={formData.requiredScore} 
          onChange={handleInputChange} />
        </Grid>
      </Grid>
      </div>
      <div className='cancel-payment-button'>
      <Button onClick={handlenavigate} className='Cancel'> CANCEL</Button>
      <Button type="submit" color="primary"   className='Proceed-To-Payment'>
      
        Proceed to Payment
      </Button>
      </div>
    </Box>
    
  );
}

export default RegistrationForm;

















