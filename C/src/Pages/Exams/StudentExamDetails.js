// import React, { useState, useEffect } from 'react'
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const StudentExamDetails = () => {
//     const [examDetails, setExamDetails] = useState([]);
//     const { scheduleExamId,stuId } = useParams(); 

//     useEffect(() => {
//        axios.get('http://localhost:3001/scheduleExam/student-schedule-exams')
//           .then(response => {
//             // Filter data for the specific student
//             const studentDetails = response.data.filter(detail => (detail.stuId === stuId));
//             setExamDetails(studentDetails);
//             console.log(scheduleExamId)
//           })
//           .catch(error => {
//             console.error('Error fetching data:', error);
//           });
//       }, [stuId]);

//   return (
//     <div>
//     <h1>Student Exam Details</h1>
//     <ul>
//       {examDetails.map(detail => (
//         <li key={detail.Id}>
//           <p>Status: {detail.status}</p>
//           <p>Marks: {detail.marks}</p>
//           <p>Module ID: {detail.moduleId}</p>
//           <p>SID: {detail.scheduleId}</p>
//           {/* You can add more details here */}
//         </li>
//       ))}
//     </ul>
//   </div>
//   )
// }

// export default StudentExamDetails


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const StudentExamDetails = () => {
//   const [examDetails, setExamDetails] = useState([]);
//   const { scheduleExamId, stuId } = useParams();

//   useEffect(() => {
//     axios.get('http://localhost:3001/scheduleExam/student-schedule-exams')
//       .then(response => {
//         // Filter data for the specific student and scheduleExamId
//         const studentDetails = response.data.filter(detail => detail.stuId === stuId && detail.scheduleId == scheduleExamId);
//         setExamDetails(studentDetails);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, [stuId, scheduleExamId]);

//   return (
//     <div>
//       <h1>Student Exam Details</h1>
//       <ul>
//         {examDetails.map(detail => (
//           <li key={detail.Id}>
//             <div>
//               <p>Status: {detail.status}</p>
//               <p>Marks: {detail.marks}</p>
//               <p>Module ID: {detail.moduleId}</p>
            
//               {/* You can add more details here */}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default StudentExamDetails;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DbHeader } from '../../Components/DbHeader/DbHeader';

const StudentExamDetails = () => {
  const [examDetails, setExamDetails] = useState([]);
  const { scheduleExamId, stuId } = useParams();

  useEffect(() => {
    axios.get('http://localhost:3001/scheduleExam/student-schedule-exams')
      .then(response => {
        // Filter data for the specific student and scheduleExamId
        const studentDetails = response.data.filter(detail => detail.stuId === stuId && detail.scheduleId == scheduleExamId);
        setExamDetails(studentDetails);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [stuId, scheduleExamId]);

  return (
    <div>
      <DbHeader />
      <h1>Student Exam Details</h1>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Marks</th>
            <th>Module ID</th>
            {/* Add more table headers here */}
          </tr>
        </thead>
        <tbody>
          {examDetails.map(detail => (
            <tr key={detail.Id}>
              <td>{detail.status}</td>
              <td>{detail.marks}</td>
              <td>{detail.moduleId}</td>
              {/* Add more table data cells here */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentExamDetails;


