
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './answersheet.scss'


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
      
      <h2>Course ID: {courseId}</h2>
      <div className='module-student'>
      <p>Modules:</p>
      <table>
        <thead>
          <tr>
            <th>Module ID</th>
          </tr>
        </thead>
        <tbody>
          {courseModules.map(module => (
            <tr key={module.moduleId}>
              <td>{module.moduleId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Students following this course:</p>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
          </tr>
        </thead>
        <tbody>
          {courseStudents.map(student => (
            <tr key={student.stuId}>
              <td>{student.stuId}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <button onClick={downloadExcel}>Download Marks Allocation Document</button>
      {/* <button >Upload Marks Document</button> */}
      
    </div>
  );
};

export default Answersheet;

