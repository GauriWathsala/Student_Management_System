// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from "../../helpers/AuthContext";
// import axios from 'axios';

// const Exams = ({ courseId }) => {
//     const { authState } = useContext(AuthContext);
//     const [exams, setExams] = useState([]);
//     const [examMarks, setExamMarks] = useState([]);

//     useEffect(() => {
//         // Fetch scheduled exams for the logged-in student and filter based on courseId
//         axios.get('http://localhost:3001/scheduleExam')
//             .then(response => {
//                 const filteredExams = response.data.filter(exam => exam.courseId === courseId);
//                 setExams(filteredExams);
//             })
//             .catch(error => {
//                 console.error("Error fetching exams:", error);
//             });

//         // Fetch exam marks for the logged-in student
//         axios.get('http://localhost:3001/scheduleExam/student-schedule-exams')
//         .then(response => {
//             const filteredMarks = response.data.filter(mark => mark.stuId === authState.username);
//             setExamMarks(filteredMarks);
//         })
//         .catch(error => {
//             console.error("Error fetching exam marks:", error);
//         });
//     }, [courseId, authState.stuId]);

//     return (
//         <div>
//             <h1> Exams</h1>
          

//             {/* Display scheduled exam details */}
//             <ul>
//                 {exams.map(exam => (
//                     <li key={exam.scheduleExamId}>
//                         <p>Date: {exam.date}</p>
//                         <p>Duration: {exam.duration} minutes</p>
//                         <p>Start Time: {exam.startTime}</p>
//                         <p>Status: {exam.status}</p>
                        
//                     </li>
//                 ))}
//             </ul>

//             <h2> Exam Marks</h2>
//              {/* Display exam marks */}
//              <ul>
//                 {examMarks.map(mark => (
//                     <li key={mark.Id}>
//                         <p>Module ID: {mark.moduleId}</p>
//                         <p>Status: {mark.status}</p>
//                         <p>Marks: {mark.marks || "N/A"}</p>
//                         <p>SID: {mark.stuId}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Exams;

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../helpers/AuthContext";
import axios from 'axios';
import ExamResults from './ExamResults';

const Exams = ({ courseId }) => {
    const { authState } = useContext(AuthContext);
    const [exams, setExams] = useState([]);
    const [examMarks, setExamMarks] = useState([]);

    useEffect(() => {
        // Fetch scheduled exams for the logged-in student and filter based on courseId
        axios.get('http://localhost:3001/scheduleExam')
            .then(response => {
                const filteredExams = response.data.filter(exam => exam.courseId === courseId);
                setExams(filteredExams);
            })
            .catch(error => {
                console.error("Error fetching exams:", error);
            });

        // Fetch exam marks for the logged-in student
        axios.get('http://localhost:3001/scheduleExam/student-schedule-exams')
        .then(response => {
            const filteredMarks = response.data.filter(mark => mark.stuId === authState.username);
            setExamMarks(filteredMarks);
        })
        .catch(error => {
            console.error("Error fetching exam marks:", error);
        });
    }, [courseId, authState.stuId]);

    return (
        <div>
            <h1>Exams</h1>
          
            {/* Display scheduled exam details in a table */}
            <h2>Scheduled Exams</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Start Time</th>
                        <th>Status</th>
                        <th>Results</th>
                    </tr>
                </thead>
                <tbody>
                    {exams.map(exam => (
                        <tr key={exam.scheduleExamId}>
                            <td>{exam.date}</td>
                            <td>{exam.duration} minutes</td>
                            <td>{exam.startTime}</td>
                            <td>{exam.status}</td>
                            <td><ExamResults courseId={exam.scheduleExamId}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <h2>Exam Marks</h2>
            Display exam marks in a table 
            <table>
                <thead>
                    <tr>
                        <th>Module ID</th>
                        <th>Status</th>
                        <th>Marks</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {examMarks.map(mark => (
                        <tr key={mark.Id}>
                            <td>{mark.moduleId}</td>
                            <td>{mark.status}</td>
                            <td>{mark.marks || "N/A"}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
};

export default Exams;
