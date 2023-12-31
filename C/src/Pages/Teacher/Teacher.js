import React, { useEffect, useState } from 'react';
import './teacher.scss';
import { DbHeader } from '../../Components/DbHeader/DbHeader';
import Sidebar from '../../Components/Sidebar/Sidebar';
import SearchAdd from '../../Components/DSearchAdd/SearchAdd';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom'; 

const Teacher = () => {
  
  const [rows, setRows] = useState([]);

   const navigate = useNavigate();

   const getRowStyle = (params) => {
    return {
      backgroundColor: params.rowIndex % 2 === 0 ? 'green' : 'white',
      color: params.rowIndex % 2 === 0 ? 'white' : 'black',
    };
  };

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/teacher');
        const teachers = response.data;
        const formattedRows = teachers.map((teacher) => ({
          id: teacher.teacherId,
          name: teacher.name,
          contact: teacher.contacts[0]?.contactNumber || '',
          email: teacher.email,
        }));
        setRows(formattedRows);
      }catch (error){
        console.error('Error fetching teacher:', error);
      }
    }
    fetchData();
   }, []);

  const iconColumn = {
    field: 'icons',
    headerName: '',
    width: 150,
    headerClassName: 'header-cell',
    renderCell: (params) => {
      const handleDelete = async () => {
        try{
          await axios.delete(`http://localhost:3001/teacher/${params.row.id}`);
          setRows((prevRows) => prevRows.filter((row) => row.id !== params.row.id));
        }catch(error){
          console.error('Error deleting teacher:', error);
        }
      }

      const handleEdit = () => {
        // Navigate to the "editrecept" page passing the receptionist ID as a parameter
        navigate(`/editTeacher/${params.row.id}`);
      };
      return (
        <div className='e-d-icons'>
          {/* Clicking BorderColorIcon will trigger handleEdit */}
          <BorderColorIcon onClick={handleEdit} className ='edicon' />
          {/* Clicking DeleteForeverIcon will trigger handleDelete */}
          <DeleteForeverIcon onClick={handleDelete} className ='edicon' />
        </div>
      );
    }
  }

  const columns = [
    { field: 'id', headerName: 'User ID', width: 150, headerClassName: 'header-cell' },
    { field: 'name', headerName: 'Name', width: 250, headerClassName: 'header-cell' },
    { field: 'contact', headerName: 'Contact NO', width: 200, headerClassName: 'header-cell' },
    { field: 'email', headerName: 'Email', width: 250, headerClassName: 'header-cell' },
    iconColumn,
   ];
   
  

  return (
    <div className='teacher'>
      <div className='one'>
        <DbHeader />
      </div>
      <div className='two'>
        <div className='two-one'>
          <Sidebar />
        </div>
        <div className='two-two'>
          <div className='shead'>
            <SearchAdd currentPage='teacher' />
          </div>
          <div className='sbottom'>
            <div className='List'>
              <DataGrid className='datagrid'
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                headerClassName='table-header'
                getRowStyle={getRowStyle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
