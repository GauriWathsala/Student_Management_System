

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const EdiitExcelAndSave = ({ courseId }) => {
const [excelData, setExcelData] = useState([]);

const handleFileChange = (e) => {
const file = e.target.files[0];
const reader = new FileReader();

reader.onload = (event) => {
  const binaryData = event.target.result;
  const workbook = XLSX.read(binaryData, { type: 'binary' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  // Assuming the first row of the sheet contains headers
  const [headers, ...rows] = data;

  const formattedData = rows.map((row) => {
    return {
      stuId: row[0],
      moduleId: row[1],
      status: row[2],
      marks: row[3],
    };
  });

  setExcelData(formattedData);
};

reader.readAsBinaryString(file);
};

const handleDataSubmit = async () => {
try {
  if (excelData.length === 0) return;

  const postData = excelData.map((row) => ({
    scheduleId: courseId, // Assuming courseId is the scheduleId
    stuId: row.stuId,
    moduleId: row.moduleId,
    status: row.status,
    marks: row.marks !== "" ? row.marks : null,
  }));

  console.log("post",postData);
  await axios.post('http://localhost:3001/scheduleExam/student-schedule-exams', postData);

  alert('Data submitted successfully.');
} catch (error) {
  console.error('Error submitting data:', error);
  alert('Error submitting data.');
}
};

return (
<div>
  <h2>Upload Mark Sheet</h2>
  <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
  {excelData.length > 0 && (
    <table>
      <thead>
        <tr>
          <th>scheduleId</th>
          <th>Student ID</th>
          <th>Module ID</th>
          <th>Status</th>
          <th>Marks</th>
        </tr>
      </thead>
      <tbody>
        {excelData.map((row, index) => (
          <tr key={index}>
            <td>{courseId}</td>
            <td>{row.stuId}</td>
            <td>{row.moduleId}</td>
            <td>{row.status}</td>
            <td>{row.marks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
  <button onClick={handleDataSubmit}>Submit</button>
</div>
);
};

export default EdiitExcelAndSave;
