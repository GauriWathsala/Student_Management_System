import React , {useContext , useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import Welcomeheader from '../../Components/Registration/Welcomeheader';
import { AuthContext } from '../../helpers/AuthContext';
import InstallmentPayMethod from './InstallmentPayMethod';


const Installmentpayment = () => {

    const { authState } = useContext(AuthContext);
    const [studentData, setStudentData] = useState(null);
    const [courseDetails, setCourseDetails] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState([]);

  
  

    useEffect(() => {
       
        fetch('http://localhost:3001/student')
            .then(response => response.json())
            .then(data => {
                const loggedInStudent = data.find(student => student.stuId === authState.username);
                    if (loggedInStudent) {
                    setStudentData(loggedInStudent);
                }
            })
            .catch(error => console.error('Error fetching student data:', error));

            fetch('http://localhost:3001/course')
            .then(response => response.json())
            .then(data => {
                const courseForStudent = data.find(course => course.courseId === studentData?.courseId);
                if (courseForStudent) {
                    setCourseDetails(courseForStudent);
                }
            })
            .catch(error => console.error('Error fetching course data:', error));


    },[authState.username, studentData?.courseId]);

    const installmentAmount = courseDetails ? (courseDetails.courseFee * 0.25) : 0; 

  return (
    <div>
         <Welcomeheader />
        Installment Amount :
        <TextField
        required
        id="enrollmentFee"
        name="enrollmentFee"
        disabled
        size="small"
        value={installmentAmount.toFixed(2)}
        />
        <InstallmentPayMethod installmentAmount={installmentAmount} />

    </div>
  )
}

export default Installmentpayment