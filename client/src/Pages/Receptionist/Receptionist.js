import React, { useEffect, useState } from 'react';
import './Receptionist.scss';
import { DbHeader } from '../../Components/DbHeader/DbHeader';
import Sidebar from '../../Components/Sidebar/Sidebar';
import SearchAdd from '../../Components/DSearchAdd/SearchAdd';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom'; 
import { Button } from '@mui/material';

const Receptionist = () => {
  
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
        const teacherResponse = await axios.get('http://localhost:3001/teacher', {
          include: { model: 'User', as: 'user' },
        });
  
        const receptionistResponse = await axios.get('http://localhost:3001/receptionist', {
          include: { model: 'User', as: 'user' },
        });
  
        const adminResponse = await axios.get('http://localhost:3001/admin', {
          include: { model: 'User', as: 'user' },
        });

        const usersData = [
          ...teacherResponse.data.map((teacher) => ({
            id: teacher.user.userId,
            name: teacher.name,
            contact: teacher.contacts[0]?.contactNumber || '',
            email: teacher.email,
            role: teacher.user.userType,
          })),
          ...receptionistResponse.data.map((receptionist) => ({
            id: receptionist.user.userId,
            name: receptionist.name,
            contact: receptionist.contacts[0]?.contactNumber || '',
            email: receptionist.email,
            role: receptionist.user.userType,
          })),
          ...adminResponse.data.map((admin) => ({
            id: admin.user.userId,
            name: admin.name,
            contact: admin.contacts[0]?.contactNumber || '',
            email: admin.email,
            role: admin.user.userType,
          })),
        ];
        setRows(usersData);
       
      }catch (error){
        console.error('Error fetching receptionists:', error);
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
          const userId = params.row.id;
          await axios.delete(`http://localhost:3001/user/${userId}`);
          setRows((prevRows) => prevRows.filter((row) => row.id !== userId));
        }catch(error){
          console.error('Error deleting user', error);
        }
      }

      const handleEdit = () => {
        // Navigate to the "editrecept" page passing the receptionist ID as a parameter
        navigate(`/editrecept/${params.row.id}`);
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
    { field: 'id', headerName: 'User Name', width: 120, headerClassName: 'header-cell' },
    { field: 'name', headerName: 'Name', width: 200, headerClassName: 'header-cell' },
    { field: 'contact', headerName: 'Contact NO', width: 150, headerClassName: 'header-cell' },
    { field: 'nic', headerName: 'NIC', width: 150, headerClassName: 'header-cell' },
    { field: 'email', headerName: 'Email', width: 200, headerClassName: 'header-cell' },
    { field: 'role', headerName: 'User Type', width: 150, headerClassName: 'header-cell' },
    iconColumn,
   ];
   
  

  return (
    <div className='receptionist'>
      <div className='one'>
        <DbHeader />
      </div>
      <div className='two'>
        <div className='two-one'>
          <Sidebar />
        </div>
        <div className='two-two'>
          <div className='shead'>
            <SearchAdd currentPage='receptionist' />
          </div>
          <div className='sbottom'>
            <div className='fbutton'><Button className='filter'> Filter by user type</Button></div>
            <div className='datatable'>
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
    </div>
  );
};

export default Receptionist;
