import React from 'react';
import './coursegrid.scss';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState,useEffect } from 'react';
//import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
//import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
//import TextField from '@mui/material/TextField'
import EditCourse from '../Forms/EditCourse';
//import { styled } from '@mui/material/styles';

const CourseGrid = ({ course, onDelete }) => {
    const [isViewDialogOpen, setViewDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    
    const [modules, setModules] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);

    useEffect(() => {
        
      const fetchCourseDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/course/${course.courseId}`);
          setSelectedCourse(response.data);
        } catch (error) {
          console.error('Error fetching course details:', error);
        }
      };
      if (course) {
        fetchCourseDetails();
      }
    }, [course]);

    const fetchModulesAndTeachers = async () => {
      try {
        const moduleIdsInCourse = selectedCourse.modules.map((module) => module.moduleId);
        const modulesResponse = await axios.get('http://localhost:3001/module');
        const teacherResponse = await axios.get('http://localhost:3001/teacher');
  
        // Merge the teacher details with the modules
        const modulesWithTeacher = modulesResponse.data.filter((module) =>
          moduleIdsInCourse.includes(module.moduleId)
        );
  
        const teacherMap = new Map();
        teacherResponse.data.forEach((teacher) => {
          teacherMap.set(teacher.teacherId, {
            firstname: teacher.firstname,
            lastname: teacher.lastname,
          });
        });
  
        const modulesWithTeacherDetails = modulesWithTeacher.map((module) => {
          const teacherDetails = teacherMap.get(module.teacherId);
          return {
            ...module,
            teacher: teacherDetails ? teacherDetails : null,
          };
        });
  
        setModules(modulesWithTeacherDetails);
      } catch (error) {
        console.error('Error fetching modules and teacher details:', error);
      }
    };

  
    //*******************Dialog box for View***************** */
    const handleOpenViewDialog = () => {
        setViewDialogOpen(true);
        fetchModulesAndTeachers();
      };

      const handleCloseViewDialog = () => {
        setViewDialogOpen(false);
      };
    //**************************Dialog box for delete************* */
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
      
      //***********************Dialog box for edit**************** */
      const handleOpenEditDialog = () => {
        setEditDialogOpen(true);
      };
    
      const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
      };
   

    return (
    <div className="course-grid-container">
        {course ? ( 
        <div className='course-grid'>
             <div className='content'>
             <h3>{course.courseName}</h3>
                <p>Duration: {course.courseDuration} {course.durationType}</p>
                <p>Fee: {course.courseFee}  </p> 
                <div className='vedbitton'>
                <Button  id ="view" onClick={handleOpenViewDialog}>View Course</Button>
                <Button  id ="edit" onClick={handleOpenEditDialog}>Edit Course</Button>
                </div>
                <Button id="delete" onClick={handleOpenDeleteDialog} startIcon={<DeleteIcon />} color="error">
                    Delete Course
                </Button>
                </div>
       {/* **************************View Button****************************** */}
     
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
           
          {/* ****************************Delete Button*********************** */}

           <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
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

      {/* **************************Edit Button Dialog*********************** */}
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogContent>
              {/* Pass the selected course details to EditCourse */}
              {selectedCourse && (
              <EditCourse 
              course={selectedCourse}
              handleCloseEditDialog={handleCloseEditDialog} />)}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog} color="primary">
                Close
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