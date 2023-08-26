import React, { useEffect, useState }  from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar';
import SearchAdd from '../../Components/DSearchAdd/SearchAdd';
import { DbHeader } from '../../Components/DbHeader/DbHeader';
import { useNavigate } from 'react-router-dom';
import './exams.scss'

import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios'; // Import Axios


const Exam = () => {

  const [scheduledExams, setScheduledExams] = useState([]);
  const [editedStatuses, setEditedStatuses] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/scheduleExam')
      .then(response => setScheduledExams(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleStatusChange = (scheduleExamId, newStatus) => {
    // Update the local state for edited statuses
    setEditedStatuses(prevStatuses => ({
      ...prevStatuses,
      [scheduleExamId]: newStatus,
    }));

    // Update the status in the backend
    axios
      .put(`http://localhost:3001/scheduleExam/${scheduleExamId}`, {
        status: newStatus,
      })
      .catch(error => console.error('Error updating status:', error));
  };
  

  return (
 <div className='exams'>
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
        <SearchAdd currentPage='exams' />
        </div>
        <div className='scheduled-exam-details'>
        <h1 id='exam-title'> Exams</h1>
        <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                     <TableCell>Date</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Start Time</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Course ID</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scheduledExams.map(exam => (
                      <TableRow key={exam.scheduleExamId}>
                        <TableCell>{exam.date}</TableCell>
                        <TableCell>{exam.duration} minutes</TableCell>
                        <TableCell>{exam.startTime}</TableCell>
                        <TableCell>{exam.status}</TableCell>
                        <TableCell>{exam.courseId}</TableCell>
                        <TableCell>
                          <Button variant="outlined" color="primary" onClick={() => navigate(`/student-exam/${exam.scheduleExamId}`)}>
                            VIEW
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
      </div>
        </div>
       </div>
       </div>
 </div>
  )
}

export default Exam