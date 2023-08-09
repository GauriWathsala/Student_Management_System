import React, { useState } from 'react'
import './Login.css';
import { Link } from 'react-router-dom';
//import { Title } from '../Title/Title';
import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

//import { icons } from 'react-icons';


export const Login = () => {
    const [username, setUsername] = useState ('')
    const [password, setPassword] = useState ('')
    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:3001/user' , {username,password})
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard');
      };
  return (
    <>
    <div className='loginPage flex'>
    <div className='container1 flexSB'>
                <div className='leftRow'>
                <img src= '/images/back2.avif' alt=''/>
                <div className='footerDiv flex'>
                <span className='text1'>Don't have an account?</span>
                <Link to = '/registration'> Sign Up</Link>
                </div>
                </div>
                <div className='rightRow'>
                <h1>Welcome Back!</h1>

                <form onSubmit={handleSubmit}>
                
                <div className='inputDiv'>
                <label htmlFor='username'>Username</label>
                <div className='input1 flex'>
                <FaUserShield className='icon-login' />
                <input type='text' placeholder='Enter Username' onChange={e => setUsername(e.target.value)} />
                </div>
                </div>
                <div className='inputDiv'>
                <label htmlFor='password'>Password</label>
                <div className='input1 flex'>
                <BsFillShieldLockFill className='icon-login' />
                <input type='password' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
                </div>
                </div>
                
                <button className='primary-btn' onClick={handleClick}> Login </button>
                <span className='forgotPw'> Forgot password? <a href=''>Click Here</a> </span>
                </form> 
                </div>
            </div>
            </div>
            </>
         )
        }
        
               
           
           
       
   
