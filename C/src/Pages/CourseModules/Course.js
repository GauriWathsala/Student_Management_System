import React,{ useEffect, useState } from 'react'
import './Course.scss';
import { DbHeader } from '../../Components/DbHeader/DbHeader';
import Sidebar from '../../Components/Sidebar/Sidebar';
import SearchAdd from '../../Components/DSearchAdd/SearchAdd';
import { Button,Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CourseGrid from '../../Components/Grid/CourseGrid';
import axios from 'axios';


const Course = () => {

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
  const [newCourse, setNewCourse] = useState({
    courseName: '',
    courseFee: '',
    courseDuration: '',
    durationType: 'Hours',
  });
  const [validationErrors, setValidationErrors] = useState({});


useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await axios.get('http://localhost:3001/course');
            setCourses(response.data);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching courses:', error);
            setIsLoading(false);
          }
        };
        fetchCourses();
      }, []);

      const handleDelete = async (courseId) => {
        try{
          await axios.delete(`http://localhost:3001/course/${courseId}`);
          setCourses((prevCourses) => prevCourses.filter((course) => course.courseId !== courseId));
        }catch(error){
          console.error('Error deleting course:', error);
        }
      }

      const handleOpenDialog = () => {
        setOpenDialog(true);
      };

      const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewCourse({
          courseName: '',
          courseFee: '',
          courseDuration: '',
          durationType: 'Hours',
        });
        setValidationErrors({});
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse((prevCourse) => ({
          ...prevCourse,
          [name]: value,
        }));
      };

      const validateInputs = () => {
        const errors = {};
    
        if (!newCourse.courseName.trim()) {
          errors.courseName = 'Course Name cannot be empty';
        }
    
        if (!newCourse.courseFee.trim()) {
          errors.courseFee = 'Course Fee cannot be empty';
        }
    
        if (!newCourse.courseDuration.trim()) {
          errors.courseDuration = 'Course Duration cannot be empty';
        }
    
        setValidationErrors(errors);
    
        return Object.keys(errors).length === 0;
      };
      const handleAddCourse = async () => {
        if (!validateInputs()) {
          return;
        }
    
        try {
          // Send a POST request to add the new course to the server
          await axios.post('http://localhost:3001/course', newCourse);
    
          // Close the dialog box and reset the form
          handleCloseDialog();
    
          // Refresh the course data after adding the new course
          const response = await axios.get('http://localhost:3001/course');
          setCourses(response.data);
        } catch (error) {
          console.error('Error adding course:', error);
        }
      };
    
    
  return (
    <div className='course'>
        <div className='.main-top-header'>
        <DbHeader />
        </div>
        <div className='bottom-page'>
        <div className='side-bar'>
        <Sidebar />
        </div>
        <div className='search-bar'>
        <div className='seach-button-component'>
        <div className='search-add'> 
        <SearchAdd currentPage='course' />
        </div>
           </div>
          <div className='title-button'>
          <div className='title-button-div'>
            <h1 id='course-title'> Courses</h1>
            <Button id='add-course-button' onClick={handleOpenDialog}> ADD COURSE</Button>
            </div>
            </div>
            <div className='coursedetails'> 
            <div className='grids'>
            {courses.map((course) => (
                <CourseGrid key={course.courseId} course={course} onDelete={handleDelete} />
              ))}
            </div>
           </div>
          </div>
        </div>
    {/* Add Course Dialog */}
  <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Add Course</DialogTitle>
      <DialogContent className='course-add-fields'>
      <TextField className='text-fields'
      label='Course Name'
      name='courseName'
      value={newCourse.courseName}
      onChange={handleInputChange}
    
      required
      error={!!validationErrors.courseName}
      helperText={validationErrors.courseName}
    />
    <TextField className='text-fields'
      label='Course Fee'
      name='courseFee'
      value={newCourse.courseFee}
      onChange={handleInputChange}
      
      required
      error={!!validationErrors.courseFee}
      helperText={validationErrors.courseFee}
    />
    <TextField className='text-fields'
      label='Course Duration'
      name='courseDuration'
      value={newCourse.courseDuration}
      onChange={handleInputChange}
      
      required
      error={!!validationErrors.courseDuration}
      helperText={validationErrors.courseDuration}
    />
    <FormControl fullWidth required>
      
      <Select className='text-fields'
        name='durationType'
        value={newCourse.durationType}
        onChange={handleInputChange}
        native  // Set this to use native input instead of Material-UI components for the dropdown
      >
        <option value='Years'>Years</option>
        <option value='Months'>Months</option>
        <option value='Days'>Days</option>
        <option value='Hours'>Hours</option>
      </Select>
    </FormControl>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog}>Cancel</Button>
    <Button onClick={handleAddCourse} color='primary'>
      Add
    </Button>
  </DialogActions>
</Dialog>
    </div>
  )
}

export default Course 