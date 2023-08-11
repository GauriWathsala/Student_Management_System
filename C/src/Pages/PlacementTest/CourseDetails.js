// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CourseDetails = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     // Fetch course data from the API
//     axios.get('http://localhost:3001/course')
//       .then(response => {
//         setCourses(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching course data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Course Details</h1>
//       {courses.map(course => (
//         <div key={course.courseId}>
//           <h2>{course.courseName}</h2>
//           <p>Course ID: {course.courseId}</p>
//           <p>Course Fee: ${course.courseFee}</p>
//           <p>Duration: {course.courseDuration} {course.durationType}</p>
//           <h3>Modules</h3>
//           <ul>
//             {course.modules.map(module => (
//               <li key={module.moduleId}>{module.moduleName}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default CourseDetails;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseDetails = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch course data from the API
    axios.get('http://localhost:3001/course')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Course Details</h1>
      <table>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Course Fee</th>
            <th>Duration</th>
            <th>Modules</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.courseId}>
              <td>{course.courseId}</td>
              <td>{course.courseName}</td>
              <td>${course.courseFee}</td>
              <td>{course.courseDuration} {course.durationType}</td>
              <td>
                <ul>
                  {course.modules.map(module => (
                    <li key={module.moduleId}>{module.moduleId}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseDetails;
