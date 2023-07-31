import React, { useEffect, useState } from 'react';
import './Staff.scss';
import { DbHeader } from '../../Components/DbHeader/DbHeader';
import Sidebar from '../../Components/Sidebar/Sidebar';
import SearchAdd from '../../Components/DSearchAdd/SearchAdd';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom'; 
import { Button  ,Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import DropdownButton from '../Test/DropdownButton';


const Staff = () => {

   
  const [rows, setRows] = useState([]);

   const navigate = useNavigate();
   const [selectedRole, setSelectedRole] = useState('');
  

   

   const getRowStyle = (params) => {
 return {
      backgroundColor: params.rowIndex % 2 === 0 ? 'green' : 'white',
      color: params.rowIndex % 2 === 0 ? 'white' : 'black',
    };
  };

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/staff');
        const staff = response.data;
        const formattedRows = staff.map((staff) => ({
          id: staff.userId,
          name : `${staff.firstname} ${staff.lastname}`,
          contact: staff.contacts[0]?.contactNumber || '',
          email: staff.email,
          nic :staff.nic,
          role : staff.userType
        }));
        setRows(formattedRows);
      }catch (error){
 console.error('Error fetching staff:', error);
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
          await axios.delete(`http://localhost:3001/staff/${params.row.id}`);
          setRows((prevRows) => prevRows.filter((row) => row.id !== params.row.id));
        }catch(error){
          console.error('Error deleting staff:', error);
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
    { field: 'id', headerName: 'Staff ID', width: 120, headerClassName: 'header-cell' },
    { field: 'name', headerName: 'Name', width: 150, headerClassName: 'header-cell' },
    { field: 'contact', headerName: 'Contact NO', width: 150, headerClassName: 'header-cell' },
    { field: 'nic', headerName: 'NIC', width: 150, headerClassName: 'header-cell' },
    { field: 'email', headerName: 'Email', width: 200, headerClassName: 'header-cell' },
    { field: 'role', headerName: 'User Type', width: 100, headerClassName: 'header-cell' },
   // { field: 'gender', headerName: 'Gender', width: 100, headerClassName: 'header-cell' },
    iconColumn,
   ];
    return (
    <div className='staff'>
      <div className='one'>
        <DbHeader />
      </div>
      <div className='two'>
        <div className='two-one'>
          <Sidebar />
        </div>
        <div className='two-two'>
          <div className='shead'>
          <div className='searchbar'>
            <SearchIcon />
            <input type='text' placeholder='Search' />
            </div>
            <DropdownButton id='drop-down-component' />
            </div>
           
          <div className='sbottom'>
            <div className='ssbottom'>
              <div className='fbutton'>
                  <h1> Staff Members</h1>
                  <Button className='filter' > Filter by user type</Button>
              </div>
            </div>
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

export default Staff;
