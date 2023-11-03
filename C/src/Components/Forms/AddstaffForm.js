
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addSForm.scss' 

const AddTeacherForm = ({ userType }) => {
  const [formData, setFormData] = useState({
   

    firstname: "",
    lastname : "",
   fullname : "",
   address : "",
   nic : "",
   dob : "",  
  email : "",
  qualifications : "",
  gender : "Male",
  contact : "" 
  });

  const [submitButtonText, setSubmitButtonText] = useState("Add Teacher");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let apiEndpoint = "";
      if (userType === "Teacher") {
        apiEndpoint = "http://localhost:3001/teacher";
      } else if (userType === "Receptionist") {
        apiEndpoint = "http://localhost:3001/receptionist";
      } else if (userType === "Admin") {
        apiEndpoint = "http://localhost:3001/admin";
      }

      console.log("form data -> ", formData);
      await axios.post(apiEndpoint, formData);
      alert(`${userType} created successfully!`);
      setFormData({
        firstname: "",
          lastname : "",
         fullname : "",
         address : "",
         nic : "",
         dob : "",  
        email : "",
        qualifications : "",
        gender : "Male",
        contact : "" 
      });
     
    } catch (error) {
      console.error('Failed to create ${userType}', error);
      alert('Failed to create teacher. Please try again later.');
    }
  };

  useEffect(() => {
    if (userType === "Teacher") {
      setSubmitButtonText("Add Teacher");
    } else if (userType === "Receptionist") {
      setSubmitButtonText("Add Receptionist");
    } else if (userType === "Admin") {
      setSubmitButtonText("Add Admin");
    }
  }, [userType]);


  

  return (
    <div className="form-container"> 
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className='add-staff-input'/>
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className='add-staff-input'/>
      </label>
      <br />
      <label>
        Full Name:
        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} className='add-staff-input'/>
      </label>
      <br />
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} className='add-staff-input'/>
      </label>
      <br />
      <label>
        NIC:
        <input type="text" name="nic" value={formData.nic} onChange={handleChange} className='add-staff-input'/>
      </label>
      <br />
      <label>
        Date of Birth:
        <input type="text" name="dob" value={formData.dob} onChange={handleChange} className='add-staff-input'/>
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" value={formData.email} onChange={handleChange} className='add-staff-input'/>
      </label>
      <br />
      <label>
        Contact Number:
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className='add-staff-input'
        />
      </label>
      <br />
      <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange} className='add-staff-input'>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <br />
      <label>
        Qualifications:
        <input
          type="text"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          className='add-staff-input'
        />
      </label>
      <br />
      
     <button type="submit" id='staff-add-btn'>{submitButtonText}</button>
     
    </form>
    </div>
  );
};

export default AddTeacherForm;




















