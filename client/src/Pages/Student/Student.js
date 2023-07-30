import React,{useEffect, useState } from 'react'
import './Student.scss'
import { DbHeader } from '../../Components/DbHeader/DbHeader'
import Sidebar from '../../Components/Sidebar/Sidebar'
import SearchAdd from '../../Components/DSearchAdd/SearchAdd'
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
//import DeleteIcon from '@mui/icons-material/Delete';
//import Navbar from '../../Components/Navbar/Navbar'


const Student = () => {
  const [rows, setRows] = useState([]);

  const blockicon  = {
    field: 'block',
    headerName: '',
    width: 150,
    headerClassName: 'module-header',
    renderCell: (params) => {
      return (
        <div className='delete-module'>
          <Button id="del-module"   color="error">
                    BLOCK
          </Button>
        </div>
      );
    }
  }

  const columns = [
    { field: 'id', headerName: 'Student ID', width: 100, headerClassName: 'module-header' },
    { field: 'name', headerName: 'Name', width: 175, headerClassName: 'module-header' },
    { field: 'contact', headerName: 'Contact No', width: 150, headerClassName: 'module-header' },
    { field: 'email', headerName: 'Email', width: 250, headerClassName: 'module-header' },
    { field: 'course', headerName: 'Course', width: 100, headerClassName: 'module-header' ,
    renderCell: (params) => {
      if (params.row.course === 'allocateButton'){
        return (
          <Button id="allocateButton"  color="primary" 
          // onClick={() => handleAllocateCourse(params.row)}
          >
            Allocate
          </Button>
        );
      } else{
        return (
          <div className='allocated-course'>
            <span>{params.row.student}</span>
          </div>
        );
      }
     
    }},
    { field: 'status', headerName: 'Status', width: 125, headerClassName: 'module-header' },
    blockicon,
  
   ];

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/student');
        const student = response.data;
        const formattedRows = student.map((student) => ({
          id: student.stuId,
          name : `${student.firstname} ${student.lastname}`,
          contact: student.contactNo ,
          email : student.email,
          course : student.courseId ? student.courseId : 'allocateButton',
        }));
        setRows(formattedRows);
      }catch (error){
       console.error('Error fetching students:', error);
      }
    }
    fetchData();
   },[]);
  return (
    <div className='student'> 
      <div className='main-header'>
      <DbHeader /> 
      </div>
      <div className='bottom-header'>
      <div className='side-bar'>
      <Sidebar />
      </div>
      <div className='search-bar'>
      <div className='seach-button-component'>
      <div className='search-add'>
      <SearchAdd currentPage='student'/>
      </div>
      </div>
      <div className='title-button'>
        <div className='title-button-div'>
        <h1 id='module-title'> Students </h1>
        <Button id ='add' >Filter by ID</Button>
        </div>
        </div>
        <div className='main-content'>
        <div className='all-modules'>
        <DataGrid className='moduledata'
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 15]}
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
export default Student


