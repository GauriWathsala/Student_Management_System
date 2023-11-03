// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Answersheet from './Answersheet';
// import EdiitExcelAndSave from './EditExcelAndSave';
// import Test from './Test';
// import { DbHeader } from '../../Components/DbHeader/DbHeader'


// const StudentExam = () => {
//   const { scheduleExamId } = useParams();
//   const [examDetails, setExamDetails] = useState(null);
//   const [studentExamData, setStudentExamData] = useState([]);
//   const navigate = useNavigate();
//   const [statusOptions, setStatusOptions] = useState(["Canceled", "Completed" , "Scheduled"]);
//   const [selectedStatus, setSelectedStatus] = useState("");


//   const displayedStudentIds = [];
 

//   useEffect(() => {
//     axios.get(`http://localhost:3001/scheduleExam/student-schedule-exams`)
//       .then(response => {
//         const data = response.data;
        
//         const filteredExamData = data.filter(exam => exam.scheduleId === parseInt(scheduleExamId));
//         setStudentExamData(filteredExamData);
//       })
//       .catch(error => {
//         console.error('Error fetching exam data:', error);
//       });

//     axios.get(`http://localhost:3001/scheduleExam`)
//       .then(response => {
//         const data = response.data;
//         const foundExam = data.find(exam => exam.scheduleExamId === parseInt(scheduleExamId));
//         setExamDetails(foundExam);
//         setSelectedStatus(foundExam.status);
//       })
//       .catch(error => {
//         console.error('Error fetching exam data:', error);
//       });
      
     
//   }, [scheduleExamId]);

//   const handleViewButtonClick = (studentId) => {
//     navigate(`/student-exam-details/${scheduleExamId}/${studentId}`);
//   };

//   const handleStatusUpdate = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:3001/scheduleExam/${scheduleExamId}`,
//         {
//           status: selectedStatus
//         }
//       );

//       if (examDetails) {
//         setExamDetails({ ...examDetails, status: selectedStatus });
//       }
//     } catch (error) {
//       console.error('Error updating exam status:', error);
//     }
//   };

//   const calculateAverageMarks = (studentId) => {
//     const studentModules = studentExamData.filter(
//       (studentExam) => ((studentExam.stuId === studentId) && (studentExam.status === 'Faced'))
//     );
  
//     if (studentModules.length === 0) {
//       return 0; 
//     }
  
//     const totalMarks = studentModules.reduce(
//       (total, studentExam) => total + parseFloat(studentExam.marks || 0), // Parse as float, default to 0 if marks are not available
//       0
//     );
  
//     const averageMarks = totalMarks / studentModules.length;
//     return averageMarks.toFixed(2); 
//   };
  

//   return (
//     <div>
//       <DbHeader />
//       {examDetails ? (
//         <div>
//             <Answersheet courseId={examDetails.courseId}/>
//           <h2>Exam Details</h2>
//           <p>Schedule Exam ID: {examDetails.scheduleExamId}</p>
//           <p>Date: {examDetails.date}</p>
//           <p>Duration: {examDetails.duration} minutes</p>
//           <p>Start Time: {examDetails.startTime}</p>
//           <p>Course ID: {examDetails.courseId}</p>
//           {/* <p>Status: {examDetails.status}</p> */}
//           <p>Status:
//             <select
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//             >
//               {statusOptions.map((statusOption) => (
//                 <option key={statusOption} value={statusOption}>
//                   {statusOption}
//                 </option>
//               ))}
//             </select>
//             <button onClick={handleStatusUpdate}>Update Status</button>
//           </p>
//           <EdiitExcelAndSave courseId={examDetails.scheduleExamId} />
        
//         </div>
//       ) : (
//         <p>Loading exam details...</p>
//       )}
   
//    <h2>Student Exam Data</h2>
// {studentExamData.length > 0 ? (
//   <table>
//     <thead>
//       <tr>
//         <th>Student ID</th>
//         <th>Average Marks</th>
//         <th></th>
//       </tr>
//     </thead>
//     <tbody>
//       {/* Create an array to keep track of displayed student IDs */}
      

//       {studentExamData.map(studentExam => {
//         // Check if the student ID is already displayed
//         if (!displayedStudentIds.includes(studentExam.stuId)) {
//           // Mark the student ID as displayed
//           displayedStudentIds.push(studentExam.stuId);

//           // Calculate the average marks for this student
//           const averageMarks = calculateAverageMarks(studentExam.stuId);

//           return (
//             <tr key={studentExam.stuId}>
//               <td>{studentExam.stuId}</td>
//               <td>{averageMarks}</td>
//               <td>
//                 <button onClick={() => handleViewButtonClick(studentExam.stuId)}>
//                   View
//                 </button>
//               </td>
//             </tr>
//           );
//         } else {
//           // Return null for duplicate student IDs to skip rendering
//           return null;
//         }
//       })}
//     </tbody>
//   </table>
// ) : (
//   <p>No student exam data available.</p>
// )}

      

//     </div>
//   );
// };

// export default StudentExam;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Answersheet from './Answersheet';
import EdiitExcelAndSave from './EditExcelAndSave';
import Test from './Test';
import { DbHeader } from '../../Components/DbHeader/DbHeader'


const StudentExam = () => {
  const { scheduleExamId } = useParams();
  const [examDetails, setExamDetails] = useState(null);
  const [studentExamData, setStudentExamData] = useState([]);
  const navigate = useNavigate();
  const [statusOptions, setStatusOptions] = useState(["Canceled", "Completed" , "Scheduled"]);
  const [selectedStatus, setSelectedStatus] = useState("");


  const displayedStudentIds = [];
 

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
    navigate(`/student-exam-details/${scheduleExamId}/${studentId}`);
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

  const calculateAverageMarksForStudent = (studentId) => {
    const studentModules = studentExamData.filter(
      (studentExam) => studentExam.stuId === studentId && studentExam.status === 'Faced'
    );

    if (studentModules.length === 0) {
      return 0;
    }

    const totalMarks = studentModules.reduce(
      (total, studentExam) => total + parseFloat(studentExam.marks || 0),
      0
    );

    const averageMarks = totalMarks / studentModules.length;
    return averageMarks.toFixed(2);
  };

  const groupedStudentData = {};
  studentExamData.forEach((studentExam) => {
    if (!groupedStudentData[studentExam.stuId]) {
      groupedStudentData[studentExam.stuId] = [];
    }
    groupedStudentData[studentExam.stuId].push(studentExam);
  });
  

  return (
    <div>
      <DbHeader />
      {examDetails ? (
        <div>
            <Answersheet courseId={examDetails.courseId}/>
          <h2>Exam Details</h2>
          <table className="exam-details-table">
          <tbody>
            <tr>
              <td>Schedule Exam ID:</td>
              <td>{examDetails.scheduleExamId}</td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>{examDetails.date}</td>
            </tr>
            <tr>
              <td>Duration:</td>
              <td>{examDetails.duration} minutes</td>
            </tr>
            <tr>
              <td>Start Time:</td>
              <td>{examDetails.startTime}</td>
            </tr>
            <tr>
              <td>Course ID:</td>
              <td>{examDetails.courseId}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>
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
              </td>
            </tr>
          </tbody>
        </table>
          <EdiitExcelAndSave courseId={examDetails.scheduleExamId} />
        
        </div>
      ) : (
        <p>Loading exam details...</p>
      )}
   
   <h2>Student Exam Data</h2>
      {Object.keys(groupedStudentData).length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Average Marks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedStudentData).map((studentId) => {
              const averageMarks = calculateAverageMarksForStudent(studentId);

              return (
                <tr key={studentId}>
                  <td>{studentId}</td>
                  <td>{averageMarks}</td>
                  <td>
                    <button onClick={() => handleViewButtonClick(studentId)}>
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
  <p>No student exam data available.</p>
)}
      

    </div>
  );
};

export default StudentExam;




