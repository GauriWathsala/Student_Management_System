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
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';

const Receptionist = () => {

  //**************Dialogbox************************** */
  // // State to manage the dialog visibility
  // const [isFilterDialogOpen, setFilterDialogOpen] = useState(false);

  // // Function to handle opening the filter dialog
  // const handleOpenFilterDialog = () => {
  //   setFilterDialogOpen(true);
  // };

  // // Function to handle closing the filter dialog
  // const handleCloseFilterDialog = () => {
  //   setFilterDialogOpen(false);
  // };
  
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
          gender :teacher.gender,
          nic :teacher.nic,
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
          console.error('Error deleting receptionist:', error);
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
    //{ field: 'role', headerName: 'User Type', width: 150, headerClassName: 'header-cell' },
    { field: 'gender', headerName: 'Gender', width: 100, headerClassName: 'header-cell' },
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
            <div className='ssbottom'>
              <div className='fbutton'>
                  <h2> Staff Members</h2>
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
