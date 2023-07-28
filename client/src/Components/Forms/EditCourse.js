
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

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));



const EditCourse = ({ course, handleCloseEditDialog }) => {

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  

  const [formValues, setFormValues] = useState({
    courseId: '',
    courseName: '',
    courseDuration: '',
    durationType: '',
    courseFee: '',
    modules : [],
  });

  useEffect(() => {
    const fetchModulesAndTeachers = async () => {
      try {
        const courseResponse = await axios.get(`http://localhost:3001/course/${course.courseId}`);
        const courseData = courseResponse.data;
        const moduleIdsInCourse = courseData.modules;
        console.log('Module IDs in Course:', moduleIdsInCourse);

        const modulesResponse = await axios.get('http://localhost:3001/module');
        console.log('All Modules:', modulesResponse.data);

        // Merge the teacher details with the modules
        const modulesWithTeacher = modulesResponse.data.filter((module) => 
        moduleIdsInCourse.includes(module.moduleId)
        );
        
         const teacherResponse = await axios.get('http://localhost:3001/teacher');
         const teacherMap = new Map();
         teacherResponse.data.forEach((teacher) => {
          teacherMap.set(teacher.teacherId, `${teacher.firstname} ${teacher.lastname}`);
        });

        //   const teacher = teacherResponse.data.find((t) => t.teacherId === module.teacherId);
        //   return {
        //     ...module,
        //     teacher: teacher ? `${teacher.firstname} ${teacher.lastname}` : null,
        //   };
        // );

        const modulesWithTeacherDetails = modulesWithTeacher.map((module) => {
          const teacherName = teacherMap.get(module.teacherId);
          return {
            ...module,
            teacher: teacherName ? teacherName : null,
          };
        });
        console.log('Modules with Teacher Details:', modulesWithTeacherDetails);
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          courseId: course.courseId,
          courseName: course.courseName,
          courseDuration: course.courseDuration,
          durationType: course.durationType,
          courseFee: course.courseFee,
          modules:modulesWithTeacherDetails,
        }));
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };
    if (course) {
      fetchModulesAndTeachers();
    }
  }, [course]);

  const handleRemoveModule = async (moduleId) => {
    try {
      // Send DELETE request to the server to remove the module from the course
      await axios.delete(`http://localhost:3001/course/${formValues.courseId}/modules/${moduleId}`);

      // Update the modules list in formValues after successful removal
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        modules: prevFormValues.modules.filter((module) => module.moduleId !== moduleId),
      }));
    } catch (error) {
      console.error('Error removing module:', error);
    }
  };

   // Handler for text field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };
  const handleSaveChanges = async () => {
    try {
      // Send the updated formValues to the server to save the changes
      await axios.put(`http://localhost:3001/course/${formValues.courseId}`, formValues);
      // Close the dialog or perform any other actions after successful update
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };


  const [openAddModulesDialog, setOpenAddModulesDialog] = useState(false);
  const [availableModules, setAvailableModules] = useState([]);

  useEffect(() => {
    const fetchAvailableModules = async () => {
      try {
        const modulesResponse = await axios.get('http://localhost:3001/module');
        const allModules = modulesResponse.data;
        const modulesNotInCourse = allModules.filter(
          (module) => !formValues.modules.some((existingModule) => existingModule.moduleId === module.moduleId)
        );
        setAvailableModules(modulesNotInCourse);
      } catch (error) {
        console.error('Error fetching available modules:', error);
      }
    };

    if (openAddModulesDialog) {
      fetchAvailableModules();
    }
  }, [openAddModulesDialog, formValues.modules]);

  const handleOpenAddModulesDialog = () => {
    setOpenAddModulesDialog(true);
  };

  const handleCloseAddModulesDialog = () => {
    setOpenAddModulesDialog(false);
  };
  const [selectedModules, setSelectedModules] = useState([]);

  const handleModuleCheckboxChange = (moduleId) => (e) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedModules((prevSelectedModules) => [...prevSelectedModules, moduleId]);
    } else {
      setSelectedModules((prevSelectedModules) => prevSelectedModules.filter((id) => id !== moduleId));
    }
  };
  const handleAddModules = async () => {
    try {
      // Send the selected modules to the server and update the course data
      const updatedModules = availableModules.filter((module) => selectedModules.includes(module.moduleId));
      const updatedCourse = {
        ...formValues,
        modules: [...formValues.modules, ...updatedModules],
      };
      await axios.put(`http://localhost:3001/course/${formValues.courseId}`, updatedCourse);
      setFormValues(updatedCourse);
      handleCloseAddModulesDialog();
    } catch (error) {
      console.error('Error adding modules:', error);
    }
  };

  return (
    <div className='edit-course'>
       <TextField
        label="Course ID"
        className="text-fields"
        name="courseId"
        id="outlined-disabled"
        size="small"
        disabled
        value={formValues.courseId}
      />
       <div className='edit-field'>
        <TextField
        label="Course Name"
        className="text-fields"
        name='courseName'
        id="outlined-disabled"
        size="small"
        disabled
        value={formValues.courseName}
        />
        </div>
        <div className='edit-field'>
        <TextField
        className="text-fields"
        label="Course Duration"
        name="courseDuration"
        size="small"
        value={formValues.courseDuration}
        onChange={handleFieldChange}
        />
        <Select className='text-fields'
        name='durationType'
        id='duration'
        native  
        size="small"
        value={formValues.durationType}
        onChange={handleFieldChange}
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
        value={formValues.courseFee}
        onChange={handleFieldChange}
        />
        </div> 
        <Grid item xs={6} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Modules
          </Typography>
          <Demo>
            <List dense={dense}>
              {formValues.modules.map((module, index) =>{
                return (
                  <ListItem key={index}>
                 <ListItemText
                    primary={module.moduleId}
                    secondary={module.teacher ? `Teacher: ${module.teacher}` : null}
                  />
                  <ListItemIcon>
                <RemoveCircleIcon id = "remove" onClick={() => handleRemoveModule(module.moduleId)}/>
                </ListItemIcon>
                </ListItem>
                )})}
            </List>
          </Demo>
        </Grid>
        <Button
          id="add-module"
          startIcon={<AddCircleIcon />}
          onClick={handleOpenAddModulesDialog}
          >Add Module
          </Button>

          <Dialog open={openAddModulesDialog} onClose={handleCloseAddModulesDialog}>
        <DialogTitle>Add Modules to Course</DialogTitle>
        <DialogContent>
          <List dense={dense}>
            {availableModules.map((module) => (
              <ListItem key={module.moduleId}>
                <ListItemIcon>
                  <Checkbox
                    checked={selectedModules.includes(module.moduleId)}
                    onChange={handleModuleCheckboxChange(module.moduleId)}
                  />
                   </ListItemIcon>
                <ListItemText primary={module.moduleId} secondary={module.moduleName} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModulesDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddModules} color="primary">
            Add Modules
          </Button>
        </DialogActions>
      </Dialog>
          <div>
        <Button variant="contained" color="primary" onClick={handleSaveChanges}>
        Save Changes
      </Button>
      </div>
    </div>
  )
}

export default EditCourse