import React from 'react'
import './addSForm.scss'
import TextField from '@mui/material/TextField';
//import { useFormControl } from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel'; 
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';



const AddstaffForm = () => {

  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  
  return (
    <form className='addStaff'>
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <InputLabel>Role</InputLabel>
        <FormControl required label="Required" variant="filled" sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={role}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Admin</MenuItem>
          <MenuItem value={20}>Teacher</MenuItem>
          <MenuItem value={30}>Receptionist</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={6}>
        <InputLabel>First Name</InputLabel>
          <TextField required id="filled-required" label="Required" variant="filled" size="small"   />
        </Grid>
        <Grid item xs={6}>
        <InputLabel>Last Name</InputLabel>
          <TextField required id="filled-required" label="Required" variant="filled" size="small"  />
        </Grid>
        <Grid item xs={12}>
        <InputLabel>Name in Full</InputLabel>
          <TextField required id="filled-required" label="Required" variant="filled" fullWidth size="small" />
        </Grid>
        <Grid item xs={12}>
        <InputLabel>Address</InputLabel>
          <TextField required id="filled-required" label="Required" variant="filled" fullWidth size="small" />
        </Grid>
        <Grid item xs={12}>
        <InputLabel>NIC</InputLabel>
          <TextField required id="filled-required" label="Required" variant="filled" size="small" />
        </Grid>
        <Grid item xs={6}>
        <InputLabel>Contact Number</InputLabel>
          <TextField required id="filled-required" label="Required" variant="filled" size="small" />
        </Grid>
        <Grid item xs={6}>
        <InputLabel>Alternate Contact Number</InputLabel>
          <TextField id="filled-basic" label="Optional" variant="filled"  size="small"/>
        </Grid>
        <Grid item xs={12}>
        <InputLabel>Email</InputLabel>
          <TextField required id="filled-required" label="Required" variant="filled" fullWidth  size="small"  />
        </Grid>
        <Grid item xs={6}>
        <InputLabel>Date of Birth</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="MM/DD/YYYY" size="small" />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
        <InputLabel>Gender</InputLabel>
          <RadioGroup row aria-label="gender" name="row-radio-buttons-group" className="radio-group" size="small">
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
        <InputLabel>Qualifications</InputLabel>
          <TextField
            id="multiline-qualification"
            label="Multiline"
            multiline
            rows={4}
            defaultValue=""
            variant="filled"
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  )
    
}

export default AddstaffForm
