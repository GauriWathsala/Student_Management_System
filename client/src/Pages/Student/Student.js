import React from 'react'
//import Sidebar from '../../Components/Sidebar/Sidebar'
//import Navbar from '../../Components/Navbar/Navbar'





const Student = () => {
  return (
    <div > Student
      
    </div>
  )
}
export default Student

// import React, { useEffect, useState } from 'react'
// import axios from 'axios';

//  function Student() {

//     const [students, setStudents] = useState([]);
//     useEffect(() => {
//         axios
//           .get('http://localhost:3001/student') // Corrected API endpoint
//           .then((res) => {
//             console.log(res);
//             setStudents(res.data);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }, []);

// //     useEffect(()=>{
// //         axios.get('http://localhost:3001/')
// //         .then(res => {
// //             console.log(res));
// //             setStudents(res.data);
// //     });
// //     .catch((err) => {
// //         console.log(err);
// //     });
// // }, []);

//   return (
        
//         <div>
//           <h2>Student Details</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Student ID</th>
//                 <th>Name</th>
//                 <th>Status</th>
//                 <th>Contact Number</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student) => (
//                 <tr key={student.stuId}>
//                   <td>{student.stuId}</td>
//                   <td>{student.name}</td>
//                   <td>{student.status}</td>
//                   <td>{student.studentcontacts[0]?.contactNo}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       );
//     };
    
// export default Student
