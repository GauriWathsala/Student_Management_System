
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';



const Answersheet = ({ courseId }) => {
  const [courseModules, setCourseModules] = useState([]);
  const [courseStudents, setCourseStudents] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/course`)
      .then(response => {
        const course = response.data.find(course => course.courseId === courseId);
        if (course) {
          setCourseModules(course.modules);
        }
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });

    axios.get(`http://localhost:3001/student`)
      .then(response => {
        const students = response.data.filter(student => student.courseId === courseId);
        setCourseStudents(students);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, [courseId]);

const downloadExcel = () => {
    const data = [
      ['StuId', 'Module Id', 'Status', 'Marks'],
      ...courseStudents.flatMap(student => {
        const studentRows = [];
        for (const module of courseModules) {
          studentRows.push([student.stuId, module.moduleId, 'Not Faced', '']);
        }
        // Add an empty row as a separator
        // studentRows.push(['', '', '', '']);
        return studentRows;
      }),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Answersheet');
  
    const fileName = `Answersheet_${courseId}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };
  return (
    <div>
      <p>Answersheet</p>
      <p>Course ID: {courseId}</p>
      <p>Modules:</p>
      <ul>
        {courseModules.map(module => (
          <li key={module.moduleId}>{module.moduleId}</li>
        ))}
      </ul>

      <p>Students following this course:</p>
      <ul>
        {courseStudents.map(student => (
          <li key={student.stuId}>{student.stuId}</li>
        ))}
      </ul>
      <button onClick={downloadExcel}>Download Marks Allocation Document</button>
      {/* <button >Upload Marks Document</button> */}
      
    </div>
  );
};

export default Answersheet;

