import React from 'react';
import './coursegrid.scss';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const CourseGrid = ({ course, onDelete }) => {
    const [isViewDialogOpen, setViewDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

    //   const confirmDelete = () => {
    //     onDelete(course.courseId);
    //     setDeleteDialogOpen(false);
    //   };
    

  return (
    <div className="course-grid-container">
        {course ? ( 
        <div className='course-grid'>
             <div className='content'>
             <h3>{course.courseName}</h3>
                <p>Duration: {course.courseDuration}</p>
                <p>Fee: {course.courseFee}</p> 
                <div className='vedbitton'>
                <Button  id ="view" onClick={handleOpenViewDialog}>View Course</Button>
                <Button  id ="edit">Edit Course</Button>
                </div>
                <Button id="delete" onClick={handleOpenDeleteDialog} startIcon={<DeleteIcon />} color="error">
                    Delete Course
                </Button>
                 </div>
       
     
      <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialog}>
        <DialogTitle>Course Details</DialogTitle>
        <DialogContent>
          <p>Name: {course.courseName}</p>
          <p>Duration: {course.courseDuration}</p>
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

      
        </div>
        ) : (
            <p>Loading...</p>
        )}
      
    </div>
  );
};

export default CourseGrid;