import React,{ useState }  from 'react'
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

function RegistrationFrom() {
  

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
  // const validateNIC = () => {
  //   const { nic } = formData;
  //   const isValidLength = nic.length === 10 || nic.length === 12;
  //   const isValidFormat10Chars =  /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{4}$/g.test(nic);
  //   const isValidFormat12Chars =  /^\d{12}$/.test(nic);

  //   const dobYear = dayjs(formData.dob).format('YY');
  //   const isValidYear = nic.length !== 10 || (nic.slice(0, 2) === dobYear);
  //   const isValid = isValidLength && 
  //   ((nic.length === 10 && isValidFormat10Chars && isValidYear) ||(nic.length === 12 && isValidFormat12Chars));
  //   setIsNICValid(isValid);
  //   return isValid;

  // };
  const validateNIC = () => {
    const { nic } = formData;
    const isValidLength = nic.length === 10 || nic.length === 12;
    const isValidFormat10Chars = /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{4}$/g.test(nic);
    const isValidFormat12Chars = /^\d{12}$/.test(nic);

    if (nic.length === 10){
      const lastChar = nic.charAt(nic.length - 1);
      const isLastCharValid = lastChar === 'V' || lastChar === 'v';
      setIsNICValid(isValidLength && isValidFormat10Chars && isLastCharValid);
      return isValidLength && isValidFormat10Chars && isLastCharValid;
    }
    const dobYear = dayjs(formData.dob).format('YY');
    const isValidYear = nic.length !== 10 || (nic.slice(0, 2) === dobYear);

    // const isValid = isValidLength && (
    //   (nic.length === 10 && isValidFormat10Chars && isValidYear) ||
    //   (nic.length === 12 && isValidFormat12Chars)
    // );
    setIsNICValid(isValidLength && ((nic.length === 10 && isValidFormat10Chars && isValidYear) ||(nic.length === 12 && isValidFormat12Chars)));
    return isValidLength && ((nic.length === 10 && isValidFormat10Chars && isValidYear) || (nic.length === 12 && isValidFormat12Chars));
  };

//   const handleChange = (event) => {
//     setState({
//       ...state,
//       [event.target.name]: event.target.value,
//     });
 
//   if (event.target.name === "nic") {
//     validateNIC(event.target.value);
//   } else if (event.target.name === "email") {
//     validateEmail(event.target.value);
//   }
// };
//   const handleDateChange = (date) => {
//     setState({
//       ...state,
//       dob: date,
//     });
//     validateNIC(state.nic);
//   };
//   // const handleEmailChange = (event) => {
//   //   const { value } = event.target;
//   //   setState((prevState) => ({
//   //     ...prevState,
//   //     email: value,
//   //   }));
//   //   validateEmail(value);
//   // };
//   const handleNICChange = (event) => {
//     const { value } = event.target;
//     setState((prevState) => ({
//       ...prevState,
//       nic: value,
//     }));
//     validateNIC(value);
//   };

//   const validateNIC = (value) => {
//     const errors = { ...state.errors };
//     if (value.length === 10) {
//       if (!value.endsWith("V") && !value.endsWith("v")) {
//         errors.nic = "Invalid NIC format";
//       } else {
//         const birthYear = state.dob ? state.dob.format("YY") : null;
//         const nicYear = value.substring(0, 2);
//         if (birthYear !== nicYear) {
//           errors.nic = "NIC does not match birth year";
//         }else {
//           errors.nic = ""; // Clear the error if NIC is valid
//         }
//       }
//     } else if (value.length === 12) {
//       if (!/^\d+$/.test(value)) {
//         errors.nic = "Invalid NIC format";
//       } else {
//         const birthYear = state.dob ? state.dob.format("YYYY") : null;
//         const nicYear = value.substring(0, 4);
//         if (birthYear !== nicYear) {
//           errors.nic = "NIC does not match birth year";
//         }else {
//           errors.nic = ""; // Clear the error if NIC is valid
//         }
//       }
//     } else {
//       errors.nic = "Invalid NIC format";
//     }
//     setState({
//       ...state,
//       errors,
//     });
//   };
//   const validateEmail = (value) => {
//     const errors = { ...state.errors };
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(value)) {
//       errors.email = "Invalid email format";
//     }

//     setState({
//       ...state,
//       errors,
//     });
//   };

//   const validateForm = () => {
//     const errors = {};
//     // Validate each field
//     if (state.firstName.trim() === "") {
//       errors.firstName = "First Name cannot be empty";
//     }
//     if (state.lastName.trim() === "") {
//       errors.lastName = "Last Name cannot be empty";
//     }
//     if (state.fullName.trim() === "") {
//       errors.fullName = "Full Name cannot be empty";
//     }
//     if (state.address.trim() === "") {
//       errors.address = "Address cannot be empty";
//     }
//     if (state.nic.trim() === "") {
//       errors.nic = "NIC cannot be empty";
//     }
//     if (state.dob === null) {
//       errors.dob = "Date of Birth cannot be empty";
//     }
//     if (state.gender === "") {
//       errors.gender = "Gender cannot be empty";
//     }
//     if (state.contactNumber.trim() === "") {
//       errors.contactNumber = "Contact Number cannot be empty";
//     }
//     if (state.email.trim() === "") {
//       errors.email = "Email cannot be empty";
//     }
//     if (state.profession.trim() === "") {
//       errors.profession = "Profession cannot be empty";
//     }

//       // Validate NIC and Email
//       validateNIC();
//       validateEmail();
  
//       // Update the state with the errors
//       setState({
//         ...state,
//         errors,
//       });
  
//       // Return true if the form is valid (no errors)
//       return Object.keys(errors).length === 0;
//     };

//     const handleSubmit = (event) => {
//       event.preventDefault();
//       const isFormValid = validateForm();
//       if (isFormValid) {
//         // Submit the form or perform other actions
//         // ...
//       }
//     };

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
            //  value={state.firstName}
            //  onChange={handleChange}
            //  error={Boolean(state.errors.firstName)}
            //  helperText={state.errors.firstName} 
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
          // value={state.lastName}
          // onChange={handleChange}
          // error={Boolean(state.errors.lastName)}
          // helperText={state.errors.lastName}  
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
          // value={state.fullName}
          // onChange={handleChange}
          // error={Boolean(state.errors.fullName)}
          // helperText={state.errors.fullName} 
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
          // value={state.address}
          // onChange={handleChange}
          // error={Boolean(state.errors.address)}
          // helperText={state.errors.address}  
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
          />
           
        </Grid>
        <Grid item xs={6} className='name-fields-right' size="small" >
        <InputLabel>Date of Birth</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs} size="small">
            <DatePicker 
            label="MM/DD/YYYY" 
            size="small"  
            // value={state.dob}  
            name="dob" 
            // onChange={handleDateChange}  
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}className='gender-name-field' >
        <InputLabel>Gender</InputLabel>
          <RadioGroup row aria-label="gender" name="row-radio-buttons-group" className="radio-group" size="small"
          //  value={state.gender}
          // onChange={handleChange}
          // error={Boolean(state.errors.gender)}
          // helperText={state.errors.gender}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
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
          // value={state.contactNumber}
          // onChange={handleChange}
          // error={Boolean(state.errors.contactNumber)}
          // helperText={state.errors.contactNumber}
           />
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
          // value={state.email}
          // onChange={handleChange}
          // error={Boolean(state.errors.email)}
          // helperText={state.errors.email}
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
          // value={state.profession}
          // onChange={handleChange}
          // error={Boolean(state.errors.profession)}
          // helperText={state.errors.profession}
          />
        </Grid>
        <Grid item xs={12}>
        <Button id='next-button' type='submit'>NEXT</Button>
        </Grid>
        </Grid>
       </form>
    </div>
    
    </div>
  )
}

export default RegistrationFrom