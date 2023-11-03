import React, { useState,useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OnlinePay from "../../Components/Registration/OnlinePay";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';
import Welcomeheader from '../../Components/Registration/Welcomeheader';
import './Payment.scss'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Payment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate(); 


  const [paymentOption, setPaymentOption] = useState('Full payment');
  

  const handlePaymentChange = (event) => {
    setPaymentOption(event.target.value);
  };

  const courseId = queryParams.get('courseId');
  const courseName = queryParams.get('courseName');
  const courseDuration = queryParams.get('courseDuration');
  const durationType = queryParams.get('durationType');
  const courseFee = parseFloat(queryParams.get('courseFee'));

  const amount = paymentOption === 'Full payment' ? courseFee : courseFee * 0.25;

  //Course Enroll
  const enrollCourse = async () => {
    try {
      // Get the student ID from authState
      const studentId = authState.username;

      // Make the POST request to enroll the course
      const response = await axios.post(`http://localhost:3001/student/${studentId}/courses`, {
        courseId: courseId
      });
      console.log(response.data);
      alert ("Course Enroll successfully.!") 
      navigate('/studentportal');

    } catch (error) {
      console.error(error);
    }
  }
  const handlenavigate = () =>{
    navigate('/studentportal')
  }

  return (
    <div>
      <Welcomeheader />
     
      <h1 id='enrollment-main-head'>Course Enrollment</h1>
      <h2> Course Details : </h2>
      <div>
      <p className='course-details'>Course ID: {courseId}</p>
      <p className='course-details'>Course Name: {courseName}</p>
      <p className='course-details'>Course Duration: {courseDuration} {durationType}</p>
      <p className='course-details'>Course Fee: {courseFee}</p>
      </div>
      <div>
        <h3 id='term-condition'> Terms and Conditions</h3>
        <ul id='term-details'>
    <li> <CheckCircleIcon className="bullet-icon" />You can pay the course fee either as full payment or installments.</li>
    <li>  <CheckCircleIcon className="bullet-icon" />If you pay by installments, you have to pay it as 4 installments of 25% each.</li>
    <li>  <CheckCircleIcon className="bullet-icon" />You cannot enroll in the course without paying, and if you are unable to complete your payments within the given period, the Institute has the authority to block you at any time.</li>
  </ul>
      </div>

      <div>
        <h3 id='payment-option'> Payment Options</h3>
        <div className='radio-but'>
        <label id='full-payment'>
          <input
            type="radio"
            value="Full payment"
            checked={paymentOption === 'Full payment'}
            onChange={handlePaymentChange}
          />
          Full Payment
        </label>
        <label id='installment-payment'>
          <input
            type="radio"
            value="Installment"
            checked={paymentOption === 'Installment'}
            onChange={handlePaymentChange}
          />
          Pay by Installments
        </label>
        </div>
      </div>

      <span id="feeAmountTitle"> Amount </span>
      <TextField
        required
        id="enrollmentFee"
        name="enrollmentFee"
        disabled
        size="small"
        value={amount}
      />
      <div className='payment-tab'>
      <OnlinePay paymentOption={paymentOption} amount={amount} />
      <div className='enroll-cancel-button'>
      <Button onClick={handlenavigate} id='cancel-button'> CANCEL </Button>
      <Button onClick={enrollCourse} id='enroll-button'> ENROLL </Button>
      </div>
      </div>
     
    </div>
  );
}

export default Payment;


