import React,{ useState,useEffect } from 'react'
import TextField from '@mui/material/TextField';
import {Select,Button,Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './editcourse.scss'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';



const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

const EditCourse = ({ course, onInputChange, disableCourseId, disableCourseName }) => {

  const [modules, setModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedModulesInDialog, setSelectedModulesInDialog] = useState([]);


  useEffect(() => {
    const fetchModules = async () => {
      try {
        const modulesResponse = await axios.get('http://localhost:3001/module');
        const teacherResponse = await axios.get('http://localhost:3001/teacher');

         // Merge the teacher details with the modules
         const modulesWithTeacher = modulesResponse.data.map((module) => {
            const teacher = teacherResponse.data.find((t) => t.teacherId === module.teacherId);
            return {
              ...module,
              teacher: teacher ? `${teacher.firstname} ${teacher.lastname}` : null,
            };
          });

        setModules(modulesWithTeacher);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };
    fetchModules();
  }, []);

//   const handleAddModule = () => {
//     const moduleIds = selectedModules.map((module) => module.moduleId);
//     axios.post('http://localhost:3001/course', {
//       courseName: 'courseId', 
//       moduleIds,
//     })
//     .then((response) => {
//       // Handle success
//       console.log('Modules added to the course:', response.data);
//       // Clear the selected modules after adding them to the course
//       setSelectedModules([]);
//     })
//     .catch((error) => {
//       // Handle error
//       console.error('Error adding modules to the course:', error);
//     });
//   };
const handleAddModule = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleModuleSelect = (moduleId) => {
    setSelectedModules((prevSelectedModules) => {
        const isModuleSelected = prevSelectedModules.some((module) => module.moduleId === moduleId);
        if (isModuleSelected) {
          // Module is already selected, remove it from the selectedModules state
          return prevSelectedModules.filter((module) => module.moduleId !== moduleId);
        } else {
          // Module is not selected, add it to the selectedModules state
          return [...prevSelectedModules, modules.find((module) => module.moduleId === moduleId)];
        }
      });
  };

  const handleModuleSelectInDialog = (moduleId) => {
    setSelectedModulesInDialog((prevSelectedModules) =>
      prevSelectedModules.some((module) => module.moduleId === moduleId)
        ? prevSelectedModules.filter((module) => module.moduleId !== moduleId)
        : [...prevSelectedModules, modules.find((module) => module.moduleId === moduleId)]
    );
  };

  const handleAddSelectedModules = async () => {
    try {
        // Get the moduleIds of the selected modules
        const moduleIds = selectedModulesInDialog.map((module) => module.moduleId);
    
        // Create an array to store the selected modules with their teacher information
        const selectedModulesWithTeacher = [];
    
        // Make an API call for each selected module to fetch the teacher information
        for (const moduleId of moduleIds) {
          const response = await axios.get(`http://localhost:3001/teacher/${moduleId}`);
          const moduleWithTeacher = response.data;
          selectedModulesWithTeacher.push(moduleWithTeacher);
   };
   setSelectedModules([...selectedModules, ...selectedModulesWithTeacher]);
   const updatedSelectedModules = [...selectedModules, ...selectedModulesWithTeacher];
    //const updatedCourse = { ...course, modules: updatedSelectedModules };
   handleDialogClose();
   console.log('Selected modules to add:',selectedModulesWithTeacher);

   const moduleIdsToAdd = selectedModulesWithTeacher.map((module) => module.moduleId);
      await axios.post(`http://localhost:3001/course/${course.courseId}`, {
        moduleIds: moduleIdsToAdd,
      });
      console.log('Selected modules added to the course:', moduleIdsToAdd);
      //onInputChange(null, updatedCourse);
} catch (error) {
    console.error('Error fetching selected modules with teacher details:', error);
  }
};

return (
    <div className='edit-course'>
        
        <TextField
        label="Course ID"
        className="text-fields"
        name="courseId"
        value={course.courseId}
        disabled = {disableCourseId}
        id="outlined-disabled"
        size="small"
        onChange={onInputChange}
        />
       <div className='edit-field'>
        <TextField
        label="Course Name"
        className="text-fields"
        name='courseName'
        value={course.courseName}
        disabled={disableCourseName}
        id="outlined-disabled"
        size="small"
        onChange={onInputChange}
        />
        </div>
        <div className='edit-field'>
        <TextField
        className="text-fields"
        label="Course Duration"
        name="courseDuration"
        value={course.courseDuration}
        size="small"
        onChange={onInputChange}
       
        />  
        <Select className='text-fields'
        name='durationType'
        id='duration'
        native  
        size="small"
        value={course.durationType}
        onChange={onInputChange}
      >
        <option value='Years'>Years</option>
        <option value='Months'>Months</option>
        <option value='Days'>Days</option>
        <option value='Hours'>Hours</option>
      </Select>
      </div>
      <div className='edit-field'>
        <TextField
        label="Course Fee"
        name="courseFee"
        id='fee'
        size="small"
        value={course.courseFee}
        onChange={onInputChange}
        />
        </div>

        <Grid item xs={6} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Modules
          </Typography>
          <Demo>
            <List dense className='list'>
              {selectedModules.map((module) => (
                <ListItem  key={module.moduleId} className='list-item'>
                 <ListItemText className='list-text'
                   primary={module.moduleId}
                    secondary={module.teacher ? `Teacher: ${module.teacher}` : null}
                  /> 
                  <ListItemIcon className='list-icon'>
                  <RemoveCircleIcon  id='remove' onClick={() => handleModuleSelect(module.moduleId)}/>
                 </ListItemIcon>

                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
            <Button
                id="add-module"
                startIcon={<AddCircleIcon />}
                onClick={handleAddModule}
            >Add Module
            </Button>
            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Select Modules</DialogTitle>
        <DialogContent>
          <List dense>
            {modules.map((module) => (
              <ListItem key={module.moduleId}>
                <ListItemIcon>
                  <Checkbox
                    checked={selectedModulesInDialog.some((m) => m.moduleId === module.moduleId)}
                    onClick={() => handleModuleSelectInDialog(module.moduleId)}
                  />
                </ListItemIcon>
                <ListItemText primary={module.moduleId} />
              </ListItem>
            ))}
          </List>
          </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddSelectedModules} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCourse