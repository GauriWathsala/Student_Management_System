import React,{ useEffect, useState } from 'react'
import './Course.scss';
import { DbHeader } from '../../Components/DbHeader/DbHeader';
import Sidebar from '../../Components/Sidebar/Sidebar';
import SearchAdd from '../../Components/DSearchAdd/SearchAdd';
import { Button } from '@mui/material';
import CourseGrid from '../../Components/Grid/CourseGrid';
import axios from 'axios';


const Course = () => {

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await axios.get('http://localhost:3001/course');
            setCourses(response.data);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching courses:', error);
            setIsLoading(false);
          }
        };
        fetchCourses();
      }, []);

      const handleDelete = async (courseId) => {
        try{
          await axios.delete(`http://localhost:3001/course/${courseId}`);
          setCourses((prevCourses) => prevCourses.filter((course) => course.courseId !== courseId));
        }catch(error){
          console.error('Error deleting course:', error);
        }
      }

  return (
    <div className='course'>
        <div className='one'>
        <DbHeader />
        </div>
        <div className='two'>
        <div className='two-one'>
        <Sidebar />
        </div>
        <div className='two-two'>
        <div className='shead'>
            <SearchAdd currentPage='course' />
          </div>
          <div className='sbottom'>
          <div className='ssbottom'>
              <div className='fbutton'>
                  <h1> Courses</h1>
                  <Button className='filter' > ADD COURSE</Button>
              </div>
            </div>
            <div className='coursedetails'>
            {courses.map((course) => (
                <CourseGrid key={course.courseId} course={course} onDelete={handleDelete} />
              ))}

            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Course 