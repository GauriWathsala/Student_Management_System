import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Head() {
  const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
      };
  return (
    <div>
        <section className='head'>
            <div className='container flexSB'>
                <div className='logo'>
                    <h1>GIFTED EDUCATION</h1>
                    <span>INSTITUTE of IELTS & CAE</span>
                </div>
                <div>
                  <button id="log-in "className='log-in'onClick={handleClick}>Log In</button>
                </div>
            </div>
        </section>
    </div>
  )
}
