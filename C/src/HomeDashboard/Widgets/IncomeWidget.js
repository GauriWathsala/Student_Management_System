import React ,  { useState } from 'react'

const IncomeWidget = ({ total, Outstanding }) => {

  const [isHovered, setIsHovered] = useState(false);

    const widgetStyle = {
        border: '1px solid #ccc',
        backgroundColor:isHovered ? '#5be764': '#08f36a',
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
      
    
      const totalStyle = {
        position: 'absolute', 
        top: '0', 
        left: '0', 
        fontSize: '20px',
      };
    
      const outStandingStyle = {
        fontSize: '20px',
        position: 'absolute', 
        bottom: '0', 
        right: '0',
      };

  return (
    <div style={widgetStyle} onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
        <p style={totalStyle}>Total : {total}</p>
        <p style={outStandingStyle}>Outstanding : {Outstanding}</p>
    </div>
  )
}

export default IncomeWidget