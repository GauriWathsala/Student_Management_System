import React from 'react'
import './Registration.scss';
import Welcomeheader from './Welcomeheader';
import RegistrationFrom from './RegistrationFrom';

export const Registration = () => {
  return (
   <div className='registration'>
      <Welcomeheader />
      <div className='form-background'>
      <h1 id = "regi-topic">REGISTRATION FORM</h1>
      <RegistrationFrom />
      </div>
      </div>
    

  )
}

export default Registration