import React from 'react'

const LastMonthWidget = ({ Income,   Registration}) => {

    const widgetStyle = {
        border: '1px solid #ccc',
        backgroundColor: '#7654e9',
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
      
    
      const incomeStyle= {
        position: 'absolute', 
        top: '0', 
        left: '0', 
        fontSize: '20px',
      };
    
      const registrationsStyle = {
        fontSize: '20px',
        position: 'absolute', 
        bottom: '0', 
        right: '0',
      };

  return (
    <div  style={widgetStyle}>
        <p style={ incomeStyle}>Income: {Income}</p>
        <p style={registrationsStyle}>Registrations : { Registration}</p>
    </div>
  )
}

export default LastMonthWidget