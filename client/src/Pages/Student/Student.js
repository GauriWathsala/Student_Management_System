import React from 'react'
import './Student.scss'
import { DbHeader } from '../../Components/DbHeader/DbHeader'
import Sidebar from '../../Components/Sidebar/Sidebar'
//import Navbar from '../../Components/Navbar/Navbar'





const Student = () => {
  return (
    <div className='student'> 
      <div className='main-header'>
      <DbHeader /> 
      </div>
      <div className='bottom-header'>
      <div className='side-bar'>
      <Sidebar />
      </div>
      </div>
      
    </div>
  )
}
export default Student


