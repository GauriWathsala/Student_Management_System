import React, {useState} from 'react'
import Head from './Head'
import './Header.css';
import {Link} from 'react-router-dom'

export default function Header() {
  const [click, setClick] = useState(false)
  return (
    <div>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className= {click ? "mobile-nav" : 'flexSB'} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/courses'>Courses</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
          <div className='start'>
            <div className='button'>Get Register</div>
          </div>
          <button className='toggle'  onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </div>
  );
}
