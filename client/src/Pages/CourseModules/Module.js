import React, {useEffect, useState }from 'react'
import './module.scss'
import { DbHeader } from '../../Components/DbHeader/DbHeader';
import Sidebar from '../../Components/Sidebar/Sidebar';
import SearchAdd from '../../Components/DSearchAdd/SearchAdd';
import { Button , Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Radio, RadioGroup} from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { TextField } from '@mui/material';


const Module =() => {
  const [rows, setRows] = useState([]);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const [showAssignTeacherDialog, setShowAssignTeacherDialog] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');

//*************************Get module details to table****************** */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/module');
        const module = response.data;
        const formattedRows = module.map((module) => ({
          id: module.moduleId,
          name : module.moduleName,
          teacher: module.teacherId ? module.teacherId : 'assignButton',
        }));
        setRows(formattedRows);
      }catch (error){
       console.error('Error fetching modules:', error);
      }
    }
  //********************************get teacher id to the table*********************** */
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/teacher');
        const teachersData = response.data;
        setTeachers(teachersData);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchData();
    fetchTeachers();
   }, []);

   //******************************Add delete button to each row******************** */
   const deleteicon  = {
    field: 'delete',
    headerName: '',
    width: 150,
    headerClassName: 'module-header',
    renderCell: (params) => {
      const handleDelete = () => {
        setModuleToDelete(params.row);
        setShowConfirmationDialog(true);
      };

        return (
        <div className='delete-module'>
          <Button id="del-module" onClick={handleDelete} tartIcon={<DeleteIcon />} color="error">
                    DELETE MODULE
          </Button>
        </div>
      );
    }
  }

 

   const columns = [
    { field: 'id', headerName: 'Module ID', width: 100, headerClassName: 'module-header' },
    { field: 'name', headerName: 'Module Name', width: 150, headerClassName: 'module-header' },
    { field: 'teacher', headerName: 'Teacher', width: 150, headerClassName: 'module-header',
  renderCell: (params) => {
    if (params.row.teacher === 'assignButton'){
      return (
        <Button id="assign-button"  color="primary" onClick={() => handleAssignTeacher(params.row)}>
          Assign
        </Button>
      );
    } else{
      return (
        <div className='assigned-teacher'>
          <span>{params.row.teacher}</span>
          <RemoveCircleIcon
            style={{ color: 'red', marginLeft: '8px', cursor: 'pointer' }}
            onClick={() => handleUnassignTeacher(params.row)}
          />
        </div>
      );
    }
   
  } },
    deleteicon,
  
   ];

  //**************************Delete module************************* */ 
  const handleDeleteConfirmation = async () => {
    try {
      await axios.delete(`http://localhost:3001/module/${moduleToDelete.id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== moduleToDelete.id));
      setShowConfirmationDialog(false);
      setModuleToDelete(null);
    } catch (error) {
      console.error('Error deleting modules:', error);
    }
  };


  const handleAssignTeacher = (module) => {
    setModuleToDelete(module);
    setShowAssignTeacherDialog(true);
  };

//*********************Unassign teacher********************* */
  const handleUnassignTeacher = async (module) => {
    try {
      await axios.put(`http://localhost:3001/module/${module.id}/unassign`);

      // Refresh the module data after unassigning the teacher
      const response = await axios.get('http://localhost:3001/module');
      const modules = response.data;
      const formattedRows = modules.map((module) => ({
        id: module.moduleId,
        name: module.moduleName,
        teacher: module.teacherId ? module.teacherId : 'assignButton',
      }));
      setRows(formattedRows);
    } catch (error) {
      console.error('Error unassigning teacher:', error);
    }
  };

//***********************************Assign Teacher****************** */
  const handleAssignTeacherConfirmation = async () => {
    try {
      await axios.put(
        `http://localhost:3001/module/${moduleToDelete.id}/teacher/${selectedTeacherId}`
      );
      setShowAssignTeacherDialog(false);
      setSelectedTeacherId(null);

    // Refresh the module data after assigning the teacher
    const response = await axios.get('http://localhost:3001/module');
    const modules = response.data;
    const formattedRows = modules.map((module) => ({
      id: module.moduleId,
      name: module.moduleName,
      teacher: module.teacherId ? module.teacherId : 'assignButton',
    }));
    setRows(formattedRows);
  } catch (error) {
    console.error('Error assigning teacher:', error);
  }
};   

//******************************Add modules********************* */
const handleAddModule = async () => {
  try {
    // Send a POST request to add the new module to the server
    const response = await axios.post('http://localhost:3001/module', {
      moduleName: newModuleName,
    });

    // Update the table with the newly added module
    const newModule = response.data;
    setRows((prevRows) => [
      ...prevRows,
      {
        id: newModule.moduleId,
        name: newModule.moduleName,
        teacher: newModule.teacherId ? newModule.teacherId : 'assignButton',
      },
    ]);
     // Close the dialog box
     setOpenAddDialog(false);
     setNewModuleName('');
   } catch (error) {
     console.error('Error adding module:', error);
   }
 };


  return (
    <div className='module'>
      <div className='main-header'headerrr>
         <DbHeader /> 
      </div>
    <div className='bottom-header'>
    <div className='side-bar'>
       <Sidebar />
    </div>
    <div className='search-bar'>
      <div className='seach-button-component'> 
      <div className='search-add'>
      <SearchAdd currentPage='module'/>
      </div>
      
      </div>
      <div className='title-button'>
        <div className='title-button-div'>
        <h1 id='module-title'> Modules </h1>
        <Button id ='add' onClick={() => setOpenAddDialog(true)}>ADD MODULES</Button>
        </div>
        </div>
       <div className='main-content'>
        <div className='all-modules'>
        <DataGrid className='moduledata'
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                //checkboxSelection
                headerClassName='table-header'
               
              />
        </div>
        
      </div>
      </div>
    </div>
    <Dialog open={showConfirmationDialog} onClose={() => setShowConfirmationDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this module?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmationDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirmation} color='error'>DELETE</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showAssignTeacherDialog}
        onClose={() => setShowAssignTeacherDialog(false)}
      >
        <DialogTitle>Assign Teacher</DialogTitle>
        <DialogContent>
          <RadioGroup
            value={selectedTeacherId}
            onChange={(e) => setSelectedTeacherId(e.target.value)}
          >
            {teachers.map((teacher) => (
              <FormControlLabel
                key={teacher.teacherId}
                value={teacher.teacherId}
                control={<Radio />}
                label={teacher.teacherId}
              />
            ))}

        </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAssignTeacherDialog(false)}>Cancel</Button>
          <Button onClick={handleAssignTeacherConfirmation} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    
    {/* Add Module dialog */}
    <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Module</DialogTitle>
        <DialogContent>
          <TextField
            label='Module Name'
            value={newModuleName}
            onChange={(e) => setNewModuleName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddModule} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
   
    </div>
  )
}

export default Module