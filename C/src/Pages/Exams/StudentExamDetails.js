import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentExamDetails = () => {
    const [examDetails, setExamDetails] = useState([]);
    const { stuId } = useParams(); 

    useEffect(() => {
       axios.get('http://localhost:3001/scheduleExam/student-schedule-exams')
          .then(response => {
            // Filter data for the specific student
            const studentDetails = response.data.filter(detail => detail.stuId === stuId);
            setExamDetails(studentDetails);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, [stuId]);

  return (
    <div>
    <h1>Student Exam Details</h1>
    <ul>
      {examDetails.map(detail => (
        <li key={detail.Id}>
          <p>Status: {detail.status}</p>
          <p>Marks: {detail.marks}</p>
          <p>Module ID: {detail.moduleId}</p>
          {/* You can add more details here */}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default StudentExamDetails