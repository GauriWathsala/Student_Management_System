// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PaidPayments from './PaidPayments';

// const CoursePayment = ({ courseId }) => {
//   const [courseDetails, setCourseDetails] = useState(null);
 

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/course/${courseId}`);
//         setCourseDetails(response.data);
//       } catch (error) {
//         console.error('Error fetching course details:', error);
//       }
//     };
//     fetchCourseDetails();

//   }, [courseId]);

//   return (
//     <div>
//       {courseDetails ? (
//         <div>
//           <h2>{courseDetails.courseName}</h2>
//           <p>Course ID: {courseDetails.courseId}</p>
//           <p>Course Fee: {courseDetails.courseFee}</p>
//           <p>Course Modules: {courseDetails.modules}</p>
//           {/* Display other course details here */}
//         </div>
//       ) : (
//         <p>Loading course details...</p>
//       )}
//       <div>
//         <PaidPayments courseId={courseId} courseFee={courseDetails ? courseDetails.courseFee : 0} />
//       </div>
//   </div>
//   );
// };

// export default CoursePayment;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaidPayments from './PaidPayments';

const CoursePayment = ({ courseId }) => {
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/course/${courseId}`);
        setCourseDetails(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };
    fetchCourseDetails();

  }, [courseId]);

  return (
    <div>
      {courseDetails ? (
        <div>
          <h2>{courseDetails.courseName}</h2>
          <p>Course ID: {courseDetails.courseId}</p>
          <p>Course Fee: {courseDetails.courseFee}</p>
          <p>Course Modules:</p>
          <ul>
            {courseDetails.modules.map(module => (
              <li key={module.moduleId}>{module.moduleName}</li>
            ))}
          </ul>
          {/* Display other course details here */}
        </div>
      ) : (
        <p>Loading course details...</p>
      )}
      <div>
        <PaidPayments courseId={courseId} courseFee={courseDetails ? courseDetails.courseFee : 0} />
      </div>
    </div>
  );
};

export default CoursePayment;
