import './dashboard.scss';
import Sidebar from'../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import Welcomeheader from '../../Components/Registration/Welcomeheader';
import React from 'react';
import {useNavigate} from 'react-router-dom'


export const Dashboard = () => {

  const navigate = useNavigate();

  
  const handleGenerateReport = () => {
    navigate('/reports');
  };

  return (

    <div>
      <Welcomeheader />
      <Sidebar />
      <div>
      <Navbar />
      <button onClick={handleGenerateReport} >GENERATE REPORT</button>
      </div>
    </div>
  )
}

export default Dashboard
