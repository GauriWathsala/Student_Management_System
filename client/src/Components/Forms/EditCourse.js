import React,{ useState,useEffect } from 'react'
import TextField from '@mui/material/TextField';
import {Select,Button} from '@mui/material';
import './editcourse.scss'
const EditCourse = () => {

    // const [editedCourse, setEditedCourse] = useState({
    // courseDuration: course.courseDuration,
    // courseFee: course.courseFee,
    // });

  return (
    <div className='edit-course'>
        
        <TextField
        label="Course ID"
        className="text-fields"
        name="courseId"
        disabled
        id="outlined-disabled"
        size="small"
        />
       <div className='edit-field'>
        <TextField
        label="Course Name"
        className="text-fields"
        name='courseName'
        disabled
        id="outlined-disabled"
        size="small"
        />
        </div>
        <div className='edit-field'>
        <TextField
        className="text-fields"
        label="Course Duration"
        name="courseDuration"
        size="small"
        //value={editedCourse.courseDuration}
        //onChange={handleInputChange}
        required
        />  
        <Select className='text-fields'
        name='durationType'
        id='duration'
        //value={editedCourse.durationType}
        //onChange={handleInputChange}
        native  
        size="small"
      >
        <option value='Years'>Years</option>
        <option value='Months'>Months</option>
        <option value='Days'>Days</option>
        <option value='Hours'>Hours</option>
      </Select>
      </div>
      <div>
        <TextField
        className="text-fields"
        label="Course Fee"
        name="courseFee"
        id='fee'
        //value={editedCourse.courseFee}
        //onChange={handleInputChange}
        required
        size="small"
        />
</div>
    </div>
  )
}

export default EditCourse