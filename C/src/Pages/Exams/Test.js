import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = ({ courseId }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student data from the API
    axios.get('http://localhost:3001/student')
      .then(response => {
        // Filter students based on the courseId
        const filteredStudents = response.data.filter(student => student.courseId === courseId);
        setStudents(filteredStudents);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, [courseId]);

  return (
    <div>
      <h2>Test Component</h2>
      <p>Course ID: {courseId}</p>

      <h2>Students Following Course</h2>
      <ul>
        {students.map(student => (
          <li key={student.stuId}>
            <p>Student ID: {student.stuId}</p>
            
            {/* Add other student details you want to display */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;

