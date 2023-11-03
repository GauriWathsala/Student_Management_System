import React,{useEffect, useState } from 'react'
import './Student.scss'
import { DbHeader } from '../../Components/DbHeader/DbHeader'
import Sidebar from '../../Components/Sidebar/Sidebar'
import SearchAdd from '../../Components/DSearchAdd/SearchAdd'
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useNavigate}  from 'react-router-dom'
//import DeleteIcon from '@mui/icons-material/Delete';
//import Navbar from '../../Components/Navbar/Navbar'


const Student = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate ();

  const handleviewbtn = (stuId) =>{
    navigate(`/student/${stuId}`)
  }

  const blockicon = {
    field: 'block',
    headerName: '',
    width: 150,
    headerClassName: 'module-header',
    renderCell: (params) => {
      return (
        <div className='delete-module'>
          {/* <Button id="del-module" color="error" onClick={() => handleviewbtn(params.row.id)}> 
            VIEW
          </Button> */}
        </div>
      );
    }
  }

  const columns = [
    { field: 'id', headerName: 'Student ID', width: 100, headerClassName: 'module-header' },
    { field: 'name', headerName: 'Name', width: 175, headerClassName: 'module-header' },
    { field: 'contact', headerName: 'Contact No', width: 150, headerClassName: 'module-header' },
    { field: 'email', headerName: 'Email', width: 250, headerClassName: 'module-header' },
    { field: 'nic', headerName: 'NIC', width: 250, headerClassName: 'module-header' },
    { field: 'profession', headerName: 'Profession', width: 250, headerClassName: 'module-header' },
   
  
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
          nic :  student.nic,
          profession : student.profession
        }));
        setRows(formattedRows);
      }catch (error){
       console.error('Error fetching students:', error);
      }
    }
    fetchData();
   },[]);
  
const handlenavigate = () =>{
  navigate('/manualreg');
}


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
      
      <div className='title-button'>
        <div className='title-button-div'>
        <h1 id='module-title'> Students </h1>
        <Button id ='add' onClick={handlenavigate}> <AddCircleIcon />ADD STUDENT</Button>
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


