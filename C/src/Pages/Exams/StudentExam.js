import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Answersheet from './Answersheet';
import EdiitExcelAndSave from './EditExcelAndSave';


const StudentExam = () => {
  const { scheduleExamId } = useParams();
  const [examDetails, setExamDetails] = useState(null);
  const [studentExamData, setStudentExamData] = useState([]);
  const navigate = useNavigate();
  const [statusOptions, setStatusOptions] = useState(["Canceled", "Completed" , "Scheduled"]);
  const [selectedStatus, setSelectedStatus] = useState("");
 

  useEffect(() => {
    axios.get(`http://localhost:3001/scheduleExam/student-schedule-exams`)
      .then(response => {
        const data = response.data;
        const filteredExamData = data.filter(exam => exam.scheduleId === parseInt(scheduleExamId));
        setStudentExamData(filteredExamData);
      })
      .catch(error => {
        console.error('Error fetching exam data:', error);
      });

    axios.get(`http://localhost:3001/scheduleExam`)
      .then(response => {
        const data = response.data;
        const foundExam = data.find(exam => exam.scheduleExamId === parseInt(scheduleExamId));
        setExamDetails(foundExam);
        setSelectedStatus(foundExam.status);
      })
      .catch(error => {
        console.error('Error fetching exam data:', error);
      });
      
     
  }, [scheduleExamId]);

  const handleViewButtonClick = (studentId) => {
    navigate(`/student-exam-details/${studentId}`);
  };

  const handleStatusUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/scheduleExam/${scheduleExamId}`,
        {
          status: selectedStatus
        }
      );

      if (examDetails) {
        setExamDetails({ ...examDetails, status: selectedStatus });
      }
    } catch (error) {
      console.error('Error updating exam status:', error);
    }
  };

  const calculateAverageMarks = (studentId) => {
    const studentModules = studentExamData.filter(
      (studentExam) => studentExam.stuId === studentId && studentExam.status === 'Faced'
    );

    if (studentModules.length === 0) {
      return 0; 
    }

    const totalMarks = studentModules.reduce(
      (total, studentExam) => total + parseFloat(studentExam.marks),
      0
    );

    const averageMarks = totalMarks / studentModules.length;
    return averageMarks.toFixed(2); 
  };

  return (
    <div>
      {examDetails ? (
        <div>
            <Answersheet courseId={examDetails.courseId}/>
          <h2>Exam Details</h2>
          <p>Schedule Exam ID: {examDetails.scheduleExamId}</p>
          <p>Date: {examDetails.date}</p>
          <p>Duration: {examDetails.duration} minutes</p>
          <p>Start Time: {examDetails.startTime}</p>
          <p>Course ID: {examDetails.courseId}</p>
          {/* <p>Status: {examDetails.status}</p> */}
          <p>Status:
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
            <button onClick={handleStatusUpdate}>Update Status</button>
          </p>
          <EdiitExcelAndSave courseId={examDetails.scheduleExamId} />
        </div>
      ) : (
        <p>Loading exam details...</p>
      )}
   

      <h2>Student Exam Data</h2>
      {studentExamData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th> Average Marks</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {studentExamData.map(studentExam => (
              <tr key={studentExam.Id}>
                <td>{studentExam.stuId}</td>
                <td>{/* Add the average marks here */}</td>
                <td>
                  <button onClick={() => handleViewButtonClick(studentExam.stuId)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No student exam data available.</p>
      )}
    </div>
  );
};

export default StudentExam;



