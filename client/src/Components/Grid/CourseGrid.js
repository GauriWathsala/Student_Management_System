import React from 'react';
import './coursegrid.scss';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState,useEffect } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import TextField from '@mui/material/TextField'

const CourseGrid = ({ course, onDelete }) => {
    const [isViewDialogOpen, setViewDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [editedCourse, setEditedCourse] = useState({
      courseDuration: course.courseDuration,
      courseFee: course.courseFee,
    });
    const [modules, setModules] = useState([]);
    const [selectedModules, setSelectedModules] = useState(course.modules || []);

    useEffect(() => {
      const fetchModules = async () => {
        try {
          const response = await axios.get('http://localhost:3001/module');
          setModules(response.data);
        } catch (error) {
          console.error('Error fetching modules:', error);
        }
      };
      fetchModules();
    }, []);
  

    const handleOpenViewDialog = () => {
        setViewDialogOpen(true);
      };

      const handleCloseViewDialog = () => {
        setViewDialogOpen(false);
      };

      const handleOpenDeleteDialog = () => {
        setDeleteDialogOpen(true);
      };

      const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
      };

      const handleDelete = () => {
        setDeleteDialogOpen(true);
        onDelete(course.courseId);
      };
      const handleOpenEditDialog = () => {
        setEditDialogOpen(true);
      };
      const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setEditedCourse({
          courseDuration: course.courseDuration,
          courseFee: course.courseFee,
        });
      };

      const handleEditCourse = async () => {
        try {
          // Send a PUT request to update the course details
          await axios.put(`http://localhost:3001/course/${course.courseId}`, editedCourse);
    
          // Close the edit dialog box and refresh the course data after editing
          handleCloseEditDialog();
          
        } catch (error) {
          console.error('Error editing course:', error);
        }
      };

      const handleAddModule = (moduleId) => {
        setSelectedModules((prevModules) => [...prevModules, moduleId]);
      };
    
      const handleRemoveModule = (moduleId) => {
        setSelectedModules((prevModules) => prevModules.filter((mod) => mod.moduleId !== moduleId));
      };
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCourse((prevCourse) => ({
          ...prevCourse,
          [name]: value,
        }));
      };
    

    return (
    <div className="course-grid-container">
        {course ? ( 
        <div className='course-grid'>
             <div className='content'>
             <h3>{course.courseName}</h3>
                <p>Duration: {course.courseDuration} {course.durationType}</p>
                <p>Fee: {course.courseFee}  </p> 
                <div className="modules">
                <h4>Modules:</h4>
                <ul>
                {selectedModules.map((module) => (
                  <li key={module.moduleId}>
                    {module.moduleName}{' '}
                    <RemoveCircleIcon onClick={() => handleRemoveModule(module.moduleId)} />
                  </li>
                ))}
              </ul>
              <Button
                id="add-module"
                startIcon={<AddCircleIcon />}
                onClick={() => handleAddModule(modules[0].moduleId)}
              >
                Add Module
              </Button>
                  </div>
                <div className='vedbitton'>
                <Button  id ="view" onClick={handleOpenViewDialog}>View Course</Button>
                <Button  id ="edit" onClick={handleOpenEditDialog}>Edit Course</Button>
                </div>
                <Button id="delete" onClick={handleOpenDeleteDialog} startIcon={<DeleteIcon />} color="error">
                    Delete Course
                </Button>
                
                 </div>
       
     
      <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialog}>
        <DialogTitle>Course Details</DialogTitle>
        <DialogContent>
          <p>Name: {course.courseName}</p>
          <p>Duration: {course.courseDuration} {course.durationType}</p>
          <p>Fee: {course.courseFee}</p>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
            {/* <DialogTitle>Are you sure?</DialogTitle> */}
            <DialogContent>
              <p>Do you want to delete this course?</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog} color='primary'>
                Cancel
              </Button>
              <Button onClick={handleDelete} color='error'>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogContent>
              <TextField
                className="text-fields"
                label="Course Duration"
                name="courseDuration"
                value={editedCourse.courseDuration}
                onChange={handleInputChange}
                required
              />  
               <TextField
                className="text-fields"
                label="Course Fee"
                name="courseFee"
                value={editedCourse.courseFee}
                onChange={handleInputChange}
                 required
              />
               </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog}>Cancel</Button>
              <Button onClick={handleEditCourse} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
      
        </div>
        ) : (
            <p>Loading...</p>
        )}
      
    </div>
  );
};

export default CourseGrid;