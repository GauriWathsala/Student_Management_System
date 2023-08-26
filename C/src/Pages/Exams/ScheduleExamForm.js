import React,{ useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ScheduleExamForm = () => {

    const [courseId, setCourse] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setTime] = useState('');
    const [duration, setDuration] = useState('');

   

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            courseId: courseId,
            date: date,
            startTime: startTime,
            duration: duration,
            status: 'Scheduled', 
          };

          try {
            // Make the API POST request
            const response = await axios.post('http://localhost:3001/scheduleExam', requestData);
      
            // Handle the response as needed
            console.log('Exam scheduled:', response.data);
            alert ("Exam is scheduled")
          } catch (error) {
            // Handle error
            console.error('Error scheduling exam:', error);
          }
        };

    
          

  return (
    <div>
         
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="course">Course:</label>
          <input
            type="text"
            id="courseId"
            value={courseId}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Duration:</label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />mins
        </div>
        <button type="button" >Cancel</button>
        <button type="submit">Submit</button>
       
      </form>
    </div>

  )
}

export default ScheduleExamForm