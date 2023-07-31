// import React from 'react'
// import './addSForm.scss'
// import TextField from '@mui/material/TextField';
// //import { useFormControl } from '@mui/material/FormControl';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import Grid from '@mui/material/Grid';
// import InputLabel from '@mui/material/InputLabel'; 
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import axios from 'axios';



// const AddstaffForm = ({ onCancel, onAdd }) => {

//   const handleSubmitForm =async (event) => {
//     event.preventDefault();
//     const formData =  {
//       firstname: event.target['firstname'].value,
//       lastname: event.target['lastname'].value,
//       fullname: event.target['fullname'].value,
//       address: event.target['address'].value,
//       nic: event.target['nic'].value,
//       dob: event.target['dob'].value,
//       email: event.target['email'].value,
//       qualifications: event.target['qualifications'].value,
//       gender: event.target['gender'].value,
//       contacts: event.target['contacts'].value
//     };
//     try {
//       const response = await axios.post('http://localhost:3001/teacher', formData);
//       console.log('Teacher added:', response.data);
//       onAdd(formData); // Optionally, you can update the state or take other actions after successful API call
//     } catch (error) {
//       console.error('Error adding teacher:', error);
//     }
    
   
//   };

//   const [role, setRole] = React.useState('');

//   const handleChange = (event) => {
//     setRole(event.target.value);
//   };

  
//   return (
//     <form className='addStaff'  onSubmit={handleSubmitForm}>
//       <Grid container spacing={2}>
//       {/* <Grid item xs={12}>
//         <InputLabel>Role</InputLabel>
//         <FormControl required label="Required" variant="filled" sx={{ m: 1, minWidth: 120 }} size="small">
//         <Select
//           labelId="demo-simple-select-filled-label"
//           id="demo-simple-select-filled"
//           value={role}
//           onChange={handleChange}
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           <MenuItem value={10}>Admin</MenuItem>
//           <MenuItem value={20}>Teacher</MenuItem>
//           <MenuItem value={30}>Receptionist</MenuItem>
//         </Select>
//       </FormControl>
//         </Grid> */}
//         <Grid item xs={6}>
//         <InputLabel>First Name</InputLabel>
//           <TextField required id="filled-required" label="Required" variant="filled" size="small" name='firstname'  />
//         </Grid>
//         <Grid item xs={6}>
//         <InputLabel>Last Name</InputLabel>
//           <TextField required id="filled-required" label="Required" variant="filled" size="small" name='lastname' />
//         </Grid>
//         <Grid item xs={12}>
//         <InputLabel>Name in Full</InputLabel>
//           <TextField required id="filled-required" label="Required" variant="filled" fullWidth size="small" name='fullname'/>
//         </Grid>
//         <Grid item xs={12}>
//         <InputLabel>Address</InputLabel>
//           <TextField required id="filled-required" label="Required" variant="filled" fullWidth size="small" name='address'/>
//         </Grid>
//         <Grid item xs={12}>
//         <InputLabel>NIC</InputLabel>
//           <TextField required id="filled-required" label="Required" variant="filled" size="small" name='nic'/>
//         </Grid>
//         <Grid item xs={6}>
//         <InputLabel>Contact Number</InputLabel>
//           <TextField required id="filled-required" label="Required" variant="filled" size="small" name='contacts'/>
//         </Grid>
//         <Grid item xs={6}>
//         <InputLabel>Alternate Contact Number</InputLabel>
//           <TextField id="filled-basic" label="Optional" variant="filled"  size="small" name='contacts'/>
//         </Grid>
//         <Grid item xs={12}>
//         <InputLabel>Email</InputLabel>
//           <TextField required id="filled-required" label="Required" variant="filled" fullWidth  size="small" name='email' />
//         </Grid>
//         <Grid item xs={6}>
//         <InputLabel>Date of Birth</InputLabel>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker label="MM/DD/YYYY" size="small"  name='dob'/>
//           </LocalizationProvider>
//         </Grid>
//         <Grid item xs={6}>
//         <InputLabel>Gender</InputLabel>
//           <RadioGroup row aria-label="gender" name="row-radio-buttons-group" className="radio-group" size="small" name='gender'>
//             <FormControlLabel value="female" control={<Radio />} label="Female" />
//             <FormControlLabel value="male" control={<Radio />} label="Male" />
           
//           </RadioGroup>
//         </Grid>
//         <Grid item xs={12}>
//         <InputLabel>Qualifications</InputLabel>
//           <TextField
//             id="multiline-qualification"
//             label="Multiline"
//             multiline
//             rows={4}
//             defaultValue=""
//             variant="filled"
//             fullWidth
//             name='qualifications'
//           />
//         </Grid>
//       </Grid>
//       <div className="form-buttons">
//         <button type="button" onClick={onCancel} variant="outlined">
//           Cancel
//         </button>
//         <button type="submit" variant="contained" color="primary">Add</button>
//       </div>
//     </form>
//   )
    
// }

// export default AddstaffForm









// import React from 'react';
// import './addSForm.scss';
// import TextField from '@mui/material/TextField';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import Grid from '@mui/material/Grid';
// import InputLabel from '@mui/material/InputLabel'; 
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import axios from 'axios';

// const AddstaffForm = ({ onCancel, onAdd }) => {
//   const handleSubmitForm = async (event) => {
//     event.preventDefault();
//     const formData = {
//       firstname: event.target['firstname'].value,
//       lastname: event.target['lastname'].value,
//       fullname: event.target['fullname'].value,
//       address: event.target['address'].value,
//       nic: event.target['nic'].value,
//       dob: event.target['dob'].value,
//       email: event.target['email'].value,
//       qualifications: event.target['qualifications'].value,
//       gender: event.target['gender'].value,
//       contacts: event.target['contacts'].value,
//     };
//     try {
//       const response = await axios.post('http://localhost:3001/teacher', formData);
//       console.log('Teacher added:', response.data);
//       onAdd(formData); // Optionally, you can update the state or take other actions after a successful API call
//     } catch (error) {
//       console.error('Error adding teacher:', error);
//     }
//   };

//   const [role, setRole] = React.useState('');

//   const handleChange = (event) => {
//     setRole(event.target.value);
//   };

//   return (
//     <form className='addStaff' onSubmit={handleSubmitForm}>
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <InputLabel>First Name</InputLabel>
//           <TextField required id="filled-required" label="Required" variant="filled" size="small" name='firstname' />
//         </Grid>
//         <Grid item xs={6}>
//           <InputLabel>Last Name</InputLabel>
//           <TextField required id="filled-required" label="Required" variant="filled" size="small" name='lastname' />
//         </Grid>
//         <Grid item xs={12}>
//           <InputLabel>Name in Full</InputLabel>
//           <TextField required id="filled-required" label="Required" variant="filled" fullWidth size="small" name='fullname' />
//         </Grid>
//         <Grid item xs={12}>
//           <InputLabel>Address</InputLabel>
//           <TextField required id="filled-required" label="Required" variant="filled" fullWidth size="small" name='address' />
//         </Grid>
//         <Grid item xs={12}>
//           <InputLabel>NIC</InputLabel>
//           <TextField required id="filled-required" label="Required" variant="filled" size="small" name='nic' />
//         </Grid>
//         <Grid item xs={6}>
//           <InputLabel>Contact Number</InputLabel>
//           <TextField required id="filled-required" label="Required" variant="filled" size="small" name='contacts' />
//         </Grid>
//         {/* <Grid item xs={6}>
//           <InputLabel>Alternate Contact Number</InputLabel>
//           <TextField id="filled-basic" label="Optional" variant="filled" size="small" name='alternateContacts' />
//         </Grid> */}
//         <Grid item xs={12}>
//           <InputLabel>Email</InputLabel>
//           <TextField required id="filled-required" label="Required" variant="filled" fullWidth size="small" name='email' />
//         </Grid>
//         <Grid item xs={6}>
//           <InputLabel>Date of Birth</InputLabel>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker label="MM/DD/YYYY" size="small" name='dob' />
//           </LocalizationProvider>
//         </Grid>
//         <Grid item xs={6}>
//           <InputLabel>Gender</InputLabel>
//           <RadioGroup row aria-label="gender"  className="radio-group" size="small" name='gender'>
//             <FormControlLabel value="female" control={<Radio />} label="Female" />
//             <FormControlLabel value="male" control={<Radio />} label="Male" />
//           </RadioGroup>
//         </Grid>
//         <Grid item xs={12}>
//           <InputLabel>Qualifications</InputLabel>
//           <TextField
//             id="multiline-qualification"
//             label="Multiline"
//             multiline
//             rows={4}
//             defaultValue=""
//             variant="filled"
//             fullWidth
//             name='qualifications'
//           />
//         </Grid>
//       </Grid>
//       <div className="form-buttons">
//         <button type="button" onClick={onCancel} variant="outlined">
//           Cancel
//         </button>
//         <button type="submit" variant="contained" color="primary">
//           Add
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddstaffForm;





// import React, { useState } from 'react';
// import axios from 'axios';

// const AddTeacherForm = () => {
//   const [formData, setFormData] = useState({
//     teacherId: 'T0989',
//     firstname: '',
//     lastname: '',
//     fullname: '',
//     address: '',
//     nic: '',
//     dob: '',
//     email: '',
//     qualifications: '',
//     gender: '',
//     contact: '', // Store contact number as a string directly
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await axios.post('http://localhost:3001/teacher', formData);
//       alert('Teacher created successfully!');
//       setFormData({
       
//         firstname: '',
//         lastname: '',
//         fullname: 'fghj',
//         address: '',
//         nic: '',
//         dob: '',
//         email: '',
//         qualifications: '',
//         gender: 'Male',
//         contact: '', // Clear contact number as well
//       });
//     } catch (error) {
//       console.error('Failed to create teacher:', error);
//       alert('Failed to create teacher. Please try again later.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         First Name:
//         <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Last Name:
//         <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Full Name:
//         <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Address:
//         <input type="text" name="address" value={formData.address} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         NIC:
//         <input type="text" name="nic" value={formData.nic} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Date of Birth:
//         <input type="text" name="dob" value={formData.dob} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Email:
//         <input type="text" name="email" value={formData.email} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Qualifications:
//         <input
//           type="text"
//           name="qualifications"
//           value={formData.qualifications}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Gender:
//         <select name="gender" value={formData.gender} onChange={handleChange}>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//         </select>
//       </label>
//       <br />
//       <label>
//         Contact Number:
//         <input
//           type="text"
//           name="contactNumber"
//           value={formData.contactNumber}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <button type="submit">Add Teacher</button>
//     </form>
//   );
// };

// export default AddTeacherForm;

import React, { useState } from 'react';
import axios from 'axios';

const AddTeacherForm = () => {
  const [formData, setFormData] = useState({
    teacherId: 'T0989',
    firstname: '',
    lastname: '',
    fullname: '',
    address: '',
    nic: '',
    dob: '',
    email: '',
    qualifications: '',
    gender: '',
    contactNumber: '', // Store contact number as a string directly
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/teacher', formData);
      alert('Teacher created successfully!');
      setFormData({
        firstname: '',
        lastname: '',
        fullname: '',
        address: '',
        nic: '',
        dob: '',
        email: '',
        qualifications: '',
        gender: 'Male',
        contactNumber: '', // Clear contact number as well
      });
    } catch (error) {
      console.error('Failed to create teacher:', error);
      alert('Failed to create teacher. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
      </label>
      <br />
      <label>
        Full Name:
        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
      </label>
      <br />
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </label>
      <br />
      <label>
        NIC:
        <input type="text" name="nic" value={formData.nic} onChange={handleChange} />
      </label>
      <br />
      <label>
        Date of Birth:
        <input type="text" name="dob" value={formData.dob} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Qualifications:
        <input
          type="text"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <br />
      <label>
        Contact Number:
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Add Teacher</button>
    </form>
  );
};

export default AddTeacherForm;














// // TeacherForm.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const TeacherForm = () => {
//   const [formData, setFormData] = useState({
    // teacherId: "T6666",
    // firstname: '',
    // lastname: '',
    // fullname: "John Doe",
    // address: '',
    // nic: '',
    // dob: '',
    // email: '',
    // qualifications: '',
    // gender: 'Male', // Default value
    // contacts: ['0718084933'],
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Send the data to the backend using Axios
//     axios
//     .post('http://localhost:3001/teacher/create', formData)
//     .then((response) => {
//       console.log('Data submitted successfully:', response.data);
//       // Handle success here, if needed
//     })
//     .catch((error) => {
//       console.error('Error submitting data:', error);
//       // Handle error here, if needed
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="firstname">First Name:</label>
//       <input
//         type="text"
//         id="firstname"
//         name="firstname"
//         value={formData.firstname}
//         onChange={handleChange}
//         required
//       />

//       <label htmlFor="lastname">Last Name:</label>
//       <input
//         type="text"
//         id="lastname"
//         name="lastname"
//         value={formData.lastname}
//         onChange={handleChange}
//         required
//       />

//       <label htmlFor="address">Address:</label>
//       <input
//         type="text"
//         id="address"
//         name="address"
//         value={formData.address}
//         onChange={handleChange}
//         required
//       />

//       <label htmlFor="nic">NIC:</label>
//       <input
//         type="text"
//         id="nic"
//         name="nic"
//         value={formData.nic}
//         onChange={handleChange}
//         required
//       />

//       <label htmlFor="dob">Date of Birth:</label>
//       <input
//         type="date"
//         id="dob"
//         name="dob"
//         value={formData.dob}
//         onChange={handleChange}
//         required
//       />

//       <label htmlFor="email">Email:</label>
//       <input
//         type="email"
//         id="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />

//       <label htmlFor="qualifications">Qualifications:</label>
//       <input
//         type="text"
//         id="qualifications"
//         name="qualifications"
//         value={formData.qualifications}
//         onChange={handleChange}
//         required
//       />

//       <label htmlFor="gender">Gender:</label>
//       <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//         <option value="Other">Other</option>
//       </select>

//       <label htmlFor="contacts">Contacts:</label>
//       <input
//         type="text"
//         id="contacts"
//         name="contacts"
//         value={formData.contacts}
//         onChange={handleChange}
//         required
//       />

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default TeacherForm;


