import React from 'react';

const StudentCountWidget = ({ totalStudents, enrolledStudents, notEnrolledStudents }) => {
    const widgetStyle = {
        border: '1px solid #ccc',
        backgroundColor: '#d87093',
        padding: '10px',
        borderRadius: '5px',
        width : '15%',
        position: 'relative', 
        textAlign: 'center',
        height : '100px',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
      };
      const countStyle = {
        fontWeight: 'bold',
      };
      const enrolledCountStyle = {
        position: 'absolute', 
        top: '0', 
        left: '0', 
        fontSize: '15px',
      };
    
      const totalCountStyle = {
        fontSize: '30px',
        margin: '0',
      };
    
      const notEnrolledCountStyle = {
        fontSize: '15px',
        position: 'absolute', 
        bottom: '0', 
        right: '0',
      };
  return (
    <>
    
    <div style={widgetStyle}>
     
      <p style={enrolledCountStyle}>Enrolled : {enrolledStudents}</p>
      <p style={totalCountStyle}>Total : {totalStudents}</p>
       <p style={notEnrolledCountStyle}>Not Enrolled : {notEnrolledStudents}</p>
    </div>
    </>
  );
};

export default StudentCountWidget;
