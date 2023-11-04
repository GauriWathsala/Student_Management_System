
import React, { useState, useContext } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';


export const Login = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const {setAuthState} = useContext (AuthContext)

const navigate = useNavigate();

const login = (event) => {
event.preventDefault(); // Prevent the default form submission

const data = { username: username, password: password };
axios.post("http://localhost:3001/user/login", data).then((response) => {
if (response.data.error) {
alert(response.data.error);
} else {
localStorage.setItem("accessToken", response.data.token);
setAuthState({username: response.data.username, id: response.data.id, role: response.data.role, status: true})
// setAuthState (true)
switch (response.data.role) {
    case " Student":
        navigate('/studentportal');
        break;
    case "Teacher":
        navigate('/course');
        break;
    case "Receptionist":
        navigate('/student');
        break;
    case " Admin":
        navigate('/course');
        break;
    default:
        
        break;
}

}
});
};

return (
<>
<div className='loginPage flex'>
<div className='container1 flexSB'>
    
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








