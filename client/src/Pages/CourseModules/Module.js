import React, {useEffect, useState }from 'react'
import './module.scss'
import { DbHeader } from '../../Components/DbHeader/DbHeader';
import Sidebar from '../../Components/Sidebar/Sidebar';
import SearchAdd from '../../Components/DSearchAdd/SearchAdd';
import { Button } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';


const Module =() => {
  const [rows, setRows] = useState([]);

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
    fetchData();
   }, []);

   const deleteicon  = {
    field: 'delete',
    headerName: '',
    width: 150,
    headerClassName: 'module-header',
    renderCell: (params) => {

      const handleDelete = async () => {
        try{
          await axios.delete(`http://localhost:3001/module/${params.row.moduleId}`);
          setRows((prevRows) => prevRows.filter((row) => row.id !== params.row.moduleId));
        }catch(error){
          console.error('Error deleting modules:', error);
        }
      }
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
        <Button id="assign-button"  color="primary">
          Assign
        </Button>
      );
    }
  } },
    deleteicon,
  
   ];

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
        <Button id ='add'>ADD MODULES</Button>
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
    
   
   
    </div>
  )
}

export default Module