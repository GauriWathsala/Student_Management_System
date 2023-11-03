import React,  { useState } from 'react'

const IncomeRegistration = ({ RegistrationsIncome  }) => {
  const [isHovered, setIsHovered] = useState(false);

    const widgetStyle = {
        border: '1px solid #ccc',
        backgroundColor:  isHovered ? '#f3eb08' :'#d8e91c',
        padding: '10px',
        borderRadius: '5px',
        width : '60%',
        position: 'relative', 
        textAlign: 'center',
        height : '70px',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
      };
     
    
     
  return (
    <div style={widgetStyle} onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
        Income From Registrations <br/>
        { RegistrationsIncome  }
    </div>
  )
}

export default IncomeRegistration