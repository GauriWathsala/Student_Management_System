import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OnlinePay from "./OnlinePay";
import "./PaymentMethod.scss";
import Welcomeheader from "./Welcomeheader";
import TextField from "@mui/material/TextField";
import axios from "axios";
import dayjs from "dayjs";
import {useNavigate} from 'react-router-dom'

const PaymentMethod = () => {
const location = useLocation();
const formData = location.state?.formData || null;
const [registrationFee, setRegistrationFee] = useState("");
const navigate = useNavigate();

useEffect(() => {
  axios
    .get("http://localhost:3001/fees")
    .then((response) => {
      const registrationFeeData = response.data.find(
        (fee) => fee.feeType === "Registration Fee"
      );
      if (registrationFeeData) {
        setRegistrationFee(registrationFeeData.amount);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}, []);

const handleRegister = () => {
  if (!formData) {
    console.error("No form data available.");
    return;
  }

  const studentData = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    fullname: formData.fullname,
    address: formData.address,
    nic: formData.nic,
    dob: formData.dob, 
    email: formData.email,
    contactNo: formData.contactNo,
    gender: formData.gender,
    preference: formData.preference,
    country: formData.country,
    profession: formData.profession,
    requiredScore: formData.requiredScore,
  };

  axios
    .post("http://localhost:3001/student", studentData)
    .then((response) => {
      // Handle success
      console.log("Registration successful:", response.data);
      

        // Create payment data
      const paymentData = {
      stuId: response.data.stuId,
      amountPaid: registrationFee, 
      paymentType: "Full payment", 
      details: "Registration Fee",
    };
    axios
    .post("http://localhost:3001/payment/onlinepay", paymentData)
    .then((paymentResponse) => {
      // Handle payment creation success
      console.log("Payment successful:", paymentResponse.data);
      window.alert("Registration Successful. Your will receive your login credentials via email.");
      navigate('/login');

    })
    .catch((paymentError) => {
      // Handle payment creation error
      console.error("Payment failed:", paymentError);
    });
    })
    .catch((studentError) => {
      // Handle error
      console.error("Registration failed:",studentError);
    });
};

if (!formData) {
  return <div>No form data available.</div>;
}

return (
  <div className="payment-method">
    <Welcomeheader />
    <div className="stu-details">
      <div className="list-points form-data-container">
        <h2>Student Details</h2>
        <p className="points">
          <strong>First Name : </strong>
          <TextField
            id="firstname"
            name="firstname"
            disabled
            size="small"
            value={formData.firstname}
            className="FormData"
            style={{ marginLeft: "35px" }}
          />
        </p>
        <p className="points">
          <strong>Last Name :</strong>
          <TextField
            
            id="lastname"
            name="lastname"
            disabled
            size="small"
            value={formData.lastname}
            className="FormData"
            style={{ marginLeft: "40px" }}
          />
        </p>
        <p className="points">
          <strong>Full Name :</strong>
          <TextField
            id="fullname"
            name="fullname"
            disabled
            size="small"
            value={formData.fullname}
            className="FormData"
            style={{ marginLeft: "45px" }}
          />
        </p>
        <p className="points">
          <strong>Address :</strong>
          <TextField
            id="address"
            name="address"
            disabled
            size="small"
            value={formData.address}
            className="FormData"
            style={{ marginLeft: "55px" }}
          />
        </p>
        <p className="points">
          <strong>NIC :</strong>
          <TextField
            id="nic"
            name="nic"
            disabled
            size="small"
            value={formData.nic}
            className="FormData"
            style={{ marginLeft: "90px" }}
          />
        </p>
        <p className="points">
          <strong>DOB :</strong>
          <TextField
            id="dob"
            name="dob"
            disabled
            size="small"
            value={
              formData.dob ? dayjs(formData.dob).format("YYYY/MM/DD") : ""
            }
            className="FormData"
            style={{ marginLeft: "90px" }}
          />
        </p>
        <p className="points">
          <strong>Gender :</strong>
          <TextField
            id="gender"
            name="gender"
            disabled
            size="small"
            value={formData.gender}
            className="FormData"
            style={{ marginLeft: "65px" }}
          />
        </p>
        <p className="points">
          <strong>Contact No :</strong>
          <TextField
            id="contactNo"
            name="contactNo"
            disabled
            size="small"
            value={formData.contactNo}
            className="FormData"
            style={{ marginLeft: "35px" }}
          />
        </p>
        <p className="points">
          <strong>Email :</strong>
          <TextField
            id="email"
            name="email"
            disabled
            size="small"
            value={formData.email}
            className="FormData"
            style={{ marginLeft: "75px" }}
          />
        </p>
        <p className="points">
          <strong>Profession :</strong>
          <TextField
            id="profession"
            name="profession"
            disabled
            size="small"
            value={formData.profession}
            className="FormData"
            style={{ marginLeft: "40px" }}
          />
        </p>
        <p className="points">
          <strong>Preference :</strong>
          <TextField
            id="preference"
            name="preference"
            disabled
            size="small"
            value={formData.preference}
            className="FormData"
            style={{ marginLeft: "38px" }}
          />
        </p>
        <p className="points">
          <strong>Country :</strong>
          <TextField
            id="country"
            name="country"
            disabled
            size="small"
            value={formData.country}
            className="FormData"
            style={{ marginLeft: "60px" }}
          />
        </p>
        <p className="points">
          <strong>Required Score :</strong>
          <TextField
            id="requiredScore"
            name="requiredScore"
            disabled
            size="small"
            value={formData.requiredScore}
            className="FormData"
            style={{ marginLeft: "5px" }}
          />
        </p>
      </div>
      <div className="online-pay">
        <span id="feeAmountTitle"> Registration Fee </span>
        <TextField
          required
          fullWidth
          id="registrationFee"
          name="registrationFee"
          disabled
          size="small"
          value={`Rs. ${registrationFee}`}
        />
        <div className="online-box">
          <OnlinePay />
        </div>
      </div>
    </div>
    <button onClick={handleRegister} className="register-button" id="register-institute">
      REGISTER
    </button>
  </div>
);
};

export default PaymentMethod;
