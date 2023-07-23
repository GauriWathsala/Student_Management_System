
import './App.css';
//import axios from "axios";
//import {useEffect, useState} from "react";
import { Outlet } from 'react-router-dom';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './Components/Heading/Header';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import CourseHome from './Components/AllCourses/CourseHome';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import Registration  from './Components/Registration/Registration';
import { Login } from './Components/Login/Login';
import Dashboard from './HomeDashboard/MainDashboard/Dashboard'
import Student from './Pages/Student/Student';
import Teacher from './Pages/Teacher/Teacher';
import Receptionist from './Pages/Receptionist/Receptionist';
import AddTeacher from './Pages/Teacher/AddTeacher';
import AddRecep from './Pages/Receptionist/AddRecep';
import EditRecept from './Pages/Receptionist/EditRecept';
import EditTeacher from './Pages/Teacher/EditTeacher';

function App() {
  return(
    <div className='App'>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<OutletWithHeader />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/courses' element={<CourseHome />} />
        <Route path='/contact' element={<Contact />} />
        </Route>
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/student' element={<Student />}></Route>
        <Route path='/teacher' element={<Teacher />}></Route>
        <Route path='/receptionist' element={<Receptionist />}></Route>
        <Route path='/addteacher' element={<AddTeacher />}></Route>
        <Route path = '/addreceptionist' element={<AddRecep />} ></Route>
        <Route path = '/editrecept/:id' element={<EditRecept />} ></Route>
        <Route path = '/editTeacher/:id' element={<EditTeacher />} ></Route>

      </Routes>
      </BrowserRouter>
    </div>
  )

  function OutletWithHeader() {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  }

  
}

export default App;
