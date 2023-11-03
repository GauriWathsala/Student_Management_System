
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaidPayments from './PaidPayments';
import Exams from './Exams';
import './CoursePayment.scss'

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
        <div className='enrolled-course'>
          <h2 id='course-title'>{courseDetails.courseName}</h2>
          <p className='enrolled-course-details'>Course ID: {courseDetails.courseId}</p>
          <p className='enrolled-course-details'>Course Fee: Rs.{courseDetails.courseFee}</p>
          <p className='enrolled-course-details'>Course Duration: {courseDetails.courseDuration} {courseDetails.durationType}</p>
          <p className='enrolled-course-details'>Course Modules:</p>
          <ul>
            {courseDetails.modules.map(module => (
              <li className='enrolled-course-details' key={module.moduleId}>{module.moduleId} - {module.moduleName}</li>
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
      <Exams courseId={courseId}/>
    </div>
  );
};

export default CoursePayment;
