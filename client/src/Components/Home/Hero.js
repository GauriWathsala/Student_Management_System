import React from 'react'
import './Hero.css';
import { Title } from '../Title/Title';
//import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/registration');
  };
  return (
    <>
        <section className='hero'>
          <div className='container'>
            <div className='row'>
              <Title subtitle='WELOME TO GIFTED EDUCATION' title='Best Institute of IELTS & CAE' />
              <p>We will be assisting you in making your overseas educational goal a success </p>

              {/* <button className='primary-btn' onClick={handleButtonClick}> GET STARTED NOW 
              </button>
              
                <button > VIEW COURSE <i className='fa fa-long-arrow-alt-right'></i>
                </button> */}
             
            </div>
          </div>
        </section>
        <div className='marigin'></div>
    </>
  )
}

export default Hero

