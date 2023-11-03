
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import CoursePayment from './CoursePayment';
import './CourseDetails.scss'

const CourseDetails = ({ studentMarks }) => {
  const [courses, setCourses] = useState([]);
  const [recommendedCourse, setRecommendedCourse] = useState(null);
  const { authState } = useContext(AuthContext);
  // const [studentData, setStudentData] = useState(null);
  const [courseData, setCourseId] = useState(null);
  const [studentData, setStudentData] = useState(null);

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

  useEffect(() => {
    // Find the recommended course based on student marks
    const recommended = courses.find(course => {
      const minMarks = course.riqMinMarks;
      const maxMarks = course.riqMaxMarks;
      return studentMarks >= minMarks && studentMarks <= maxMarks;
    });
    setRecommendedCourse(recommended);
  }, [studentMarks, courses]);

  useEffect(() => {
       
    fetch('http://localhost:3001/student')
        .then(response => response.json())
        .then(data => {
            const loggedInStudent = data.find(student => student.stuId === authState.username);
                if (loggedInStudent) {
                setStudentData(loggedInStudent);
                console.log('student ',studentData)
                
            }
            setCourseId(loggedInStudent.courseId)
        })
        .catch(error => console.error('Error fetching student data:', error));
}, [authState.username]);


  return (
    <div>
      {courseData? (
        <div>
        
        <CoursePayment courseId={courseData}/>
        
        </div>
      ) : (
        <>
          <h2 id='all-courses'>COURSES</h2>
          <table>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Course Fee</th>
                <th>Duration</th>
                <th>Modules</th>
                <th>Marks Range</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.courseId}>
                  <td>{course.courseId}</td>
                  <td>{course.courseName}</td>
                  <td>Rs.{course.courseFee}</td>
                  <td>{course.courseDuration} {course.durationType}</td>
                  <td>
                    <ul>
                      {course.modules.map(module => (
                        <li key={module.moduleId}>{module.moduleId}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{course.riqMinMarks}-{course.riqMaxMarks}</td>
                  <td>
                    <Link
                      to={`/placementTest-payment?courseId=${course.courseId}&courseName=${encodeURIComponent(course.courseName)}&courseDuration=${encodeURIComponent(course.courseDuration)}&durationType=${encodeURIComponent(course.durationType)}&courseFee=${encodeURIComponent(course.courseFee)}`}
                    >
                      Enroll
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recommendedCourse && (
            <div>
             
              <p id='recommend-course'>
                Based on your marks ({studentMarks}), we recommend the course: 
                <Link
                  to={`/placementTest-payment?courseId=${recommendedCourse.courseId}&courseName=${encodeURIComponent(recommendedCourse.courseName)}&courseDuration=${encodeURIComponent(recommendedCourse.courseDuration)}&durationType=${encodeURIComponent(recommendedCourse.durationType)}&courseFee=${encodeURIComponent(recommendedCourse.courseFee)}`}
                >
                  {recommendedCourse.courseName}
                </Link>
              </p>
            
            </div>
          )}
        
          
          </>
      )}
    </div>
  );
}

export default CourseDetails;










