// import React, { useState } from 'react'
// import './Login.css';
// import { Link } from 'react-router-dom';
// //import { Title } from '../Title/Title';
// import {FaUserShield} from 'react-icons/fa'
// import {BsFillShieldLockFill} from 'react-icons/bs'
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'

// //import { icons } from 'react-icons';


// export const Login = () => {

//     const [username, setUsername] = useState ('')
//     const [password, setPassword] = useState ('')

//     // function handleSubmit(event){
//     //     event.preventDefault();
//     //     axios.post('http://localhost:3001/user' , {username,password})
//     //     .then(res => console.log(res))
//     //     .catch(err => console.log(err));
//     // }
// const login = () => {
//     const data = {username :username , password : password};
//     axios.post ("http://localhost:3001/user/login", data ).then ((response) =>{
//     if (response.data.error) alert (response.data.error);
//     sessionStorage.setItem("accessToken" , response.data);
//     });
// };

//     // const navigate = useNavigate();

//     // const handleClick = () => {
//     //     navigate('/dashboard');
//     //   };
//   return (
//     <>
//     <div className='loginPage flex'>
//     <div className='container1 flexSB'>
//                 <div className='leftRow'>
//                 <img src= '/images/back2.avif' alt=''/>
//                 <div className='footerDiv flex'>
//                 <span className='text1'>Don't have an account?</span>
//                 <Link to = '/registration'> Sign Up</Link>
//                 </div>
//                 </div>
//                 <div className='rightRow'>
//                 <h1>Welcome Back!</h1>

//                 <form >
                
//                 <div className='inputDiv'>
//                 <label htmlFor='username'>Username</label>
//                 <div className='input1 flex'>
//                 <FaUserShield className='icon-login' />
//                 <input type='text' placeholder='Enter Username' onChange= {(event) => {setUsername (event.target.value)}} />
//                 </div>
//                 </div>
//                 <div className='inputDiv'>
//                 <label htmlFor='password'>Password</label>
//                 <div className='input1 flex'>
//                 <BsFillShieldLockFill className='icon-login' />
//                 <input type='password' placeholder='Enter Password' onChange= {(event) => {setPassword (event.target.value)}}  />
//                 </div>
//                 </div>
                
//                 <button className='primary-btn' onClick={login}> Login </button>
//                 <span className='forgotPw'> Forgot password? <Link to='/forgotpw'>Click Here</Link> </span>

//                 </form> 
//                 </div>
//             </div>
//             </div>
//             </>
//          )
//         }
        



import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault(); // Prevent the default form submission

        const data = { username: username, password: password };
        axios.post("http://localhost:3001/user/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
              
                localStorage.setItem("accessToken", response.data);
                navigate('/dashboard');
               
            }
        });
    };

    return (
        <>
            <div className='loginPage flex'>
                <div className='container1 flexSB'>
                    {/* ... other content ... */}
                    <div className='rightRow'>
                        <h1>Welcome Back!</h1>

                        <form onSubmit={login}>
                            <div className='inputDiv'>
                                <label htmlFor='username'>Username</label>
                                <div className='input1 flex'>
                                    <FaUserShield className='icon-login' />
                                    <input type='text' placeholder='Enter Username' onChange={(event) => { setUsername(event.target.value) }} />
                                </div>
                            </div>
                            <div className='inputDiv'>
                                <label htmlFor='password'>Password</label>
                                <div className='input1 flex'>
                                    <BsFillShieldLockFill className='icon-login' />
                                    <input type='password' placeholder='Enter Password' onChange={(event) => { setPassword(event.target.value) }} />
                                </div>
                            </div>
                            <button type="submit" className='primary-btn'>Login</button>
                            <span className='forgotPw'> Forgot password? <Link to='/forgotpw'>Click Here</Link> </span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

           
       
   
