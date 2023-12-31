
// import './App.css';
// //import axios from "axios";
// //import {useEffect, useState} from "react";
// import { Outlet } from 'react-router-dom';
// import {BrowserRouter,Routes,Route} from 'react-router-dom';
// import Header from './Components/Heading/Header';
// import Home from './Components/Home/Home';
// import About from './Components/About/About';
// import CourseHome from './Components/AllCourses/CourseHome';
// import Contact from './Components/Contact/Contact';
// import Footer from './Components/Footer/Footer';
// import Registration  from './Components/Registration/Registration';
// import { Login } from './Components/Login/Login';
// import Dashboard from './HomeDashboard/MainDashboard/Dashboard'
// import Student from './Pages/Student/Student';
// import Teacher from './Pages/Teacher/Teacher';
// import Staff from './Pages/Staff/Staff';
// import EditRecept from './Pages/Staff/EditRecept';
// import EditTeacher from './Pages/Teacher/EditTeacher';
// import Course from './Pages/CourseModules/Course';
// import Module from './Pages/CourseModules/Module';
// import EditCourse from './Components/Forms/EditCourse';
// import PaymentMethod from './Components/Registration/PaymentMethod';
// import ManualReg from './Pages/Student/ManualReg';
// import OnlinePay from './Components/Registration/OnlinePay'
// // import BankPayment from './Components/Registration/BankPayment';
// import Fee from './Pages/Fees/Fee';
// import UnavailableDates from './Pages/PlacementTest/UnavailableDates';
// import Forgotpw from './Components/Login/Forgotpw';
// import ScheduledPlacementTest from './Pages/PlacementTest/ScheduledPlacementTest';
// import SchedulePT from './Pages/PlacementTest/SchedulePT';
// import { AuthContext } from './helpers/AuthContext';



// function App() {





//   return(
//     <div className='App'>
//       <BrowserRouter>
//       <Routes>
//       <Route path="/" element={<OutletWithHeader />}>
//         <Route path='/' element={<Home />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/courses' element={<CourseHome />} />
//         <Route path='/contact' element={<Contact />} />
//         </Route>
//         <Route path='/registration' element={<Registration />} />
//         <Route path='/paymentmethod' element={<PaymentMethod />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/forgotpw' element={<Forgotpw />} />
//         <Route path='/dashboard' element={<Dashboard />} />
//         <Route path='/student' element={<Student />}></Route>
//         <Route path='/teacher' element={<Teacher />}></Route>
//         <Route path='/staff' element={<Staff />}></Route>
//         <Route path = '/editrecept/:id' element={<EditRecept />} ></Route>
//         <Route path = '/editTeacher/:id' element={<EditTeacher />} ></Route>
//         <Route path = '/course' element={<Course />} ></Route>
//         <Route path = '/module' element={<Module />} ></Route>
//         <Route path = '/editcourse' element={<EditCourse />} ></Route>
//         <Route path = '/manualreg' element={<ManualReg />} ></Route>
//         <Route path = '/onlinepayment' element={<OnlinePay />} ></Route>
//         <Route path = '/fees' element={<Fee />} ></Route>
//         <Route path = '/unavailableDates' element={<UnavailableDates />} ></Route>
//         <Route path = '/scheduledplacementTests' element={<ScheduledPlacementTest />} ></Route>
//         <Route path="/schedule/:availabilityId" element = {<SchedulePT />} />
        

//       </Routes>
//       </BrowserRouter>
//     </div>
//   )

//   function OutletWithHeader() {
//     return (
//       <>
//         <Header />
//         <Outlet />
//         <Footer />
//       </>
//     );
//   }

  
// }

// export default App;






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
import Staff from './Pages/Staff/Staff';
import EditRecept from './Pages/Staff/EditRecept';
import EditTeacher from './Pages/Teacher/EditTeacher';
import Course from './Pages/CourseModules/Course';
import Module from './Pages/CourseModules/Module';
import EditCourse from './Components/Forms/EditCourse';
import PaymentMethod from './Components/Registration/PaymentMethod';
import ManualReg from './Pages/Student/ManualReg';
import OnlinePay from './Components/Registration/OnlinePay'
// import BankPayment from './Components/Registration/BankPayment';
import Fee from './Pages/Fees/Fee';
import UnavailableDates from './Pages/PlacementTest/UnavailableDates';
import Forgotpw from './Components/Login/Forgotpw';
import ScheduledPlacementTest from './Pages/PlacementTest/ScheduledPlacementTest';
import SchedulePT from './Pages/PlacementTest/SchedulePT';
import { AuthContext } from './helpers/AuthContext';
import {useState, useEffect} from 'react';
import axios from 'axios'
import Payment from './Pages/PlacementTest/Payment';
import Installmentpayment from './Pages/PlacementTest/Installmentpayment';
import Exam from './Pages/Exams/Exam';
import StudentExam from './Pages/Exams/StudentExam';
import StudentExamDetails from './Pages/Exams/StudentExamDetails';
// import EditExcelAndSave from './Pages/Exams/EditExcelAndSave';
import Report from './HomeDashboard/MainDashboard/Report';
import AllCourses from './Pages/Student/AllCourses';



function App() {

const [authState, setAuthState] = useState({
  username : "",
  id : 0 ,
  status :false,
});

useEffect(() => {
  axios.get('http://localhost:3001/user/auth', {headers: {
    accessToken: localStorage.getItem('accessToken')
  }}).then ((response) => {
     if (response.data.error) {
      setAuthState ({...authState,status: false})
    }else{
      setAuthState({
        username :response.data.username,
        id :response.data.id,
        role:response.data.role,
        status : true,
      });
    }
  })
 },[]);

  return(
    <div className='App'>
      <AuthContext.Provider value={{authState,setAuthState}}>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<OutletWithHeader />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/courses' element={<CourseHome />} />
        <Route path='/contact' element={<Contact />} />
        </Route>
        <Route path='/registration' element={<Registration />} />
        <Route path='/paymentmethod' element={<PaymentMethod />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpw' element={<Forgotpw />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/student' element={<Student />}></Route>
        <Route path='/teacher' element={<Teacher />}></Route>
        <Route path='/staff' element={<Staff />}></Route>
        <Route path = '/editrecept/:id' element={<EditRecept />} ></Route>
        <Route path = '/editTeacher/:id' element={<EditTeacher />} ></Route>
        <Route path = '/course' element={<Course />} ></Route>
        <Route path = '/module' element={<Module />} ></Route>
        <Route path = '/editcourse' element={<EditCourse />} ></Route>
        <Route path = '/manualreg' element={<ManualReg />} ></Route>
        <Route path = '/onlinepayment' element={<OnlinePay />} ></Route>
        <Route path = '/fees' element={<Fee />} ></Route>
        <Route path = '/studentportal' element={<UnavailableDates />} ></Route>
        <Route path = '/scheduledplacementTests' element={<ScheduledPlacementTest />} ></Route>
        <Route path="/schedule/:availabilityId" element = {<SchedulePT />} />
        <Route path="/placementTest-payment" element = {<Payment />} />
        <Route path="/installmentpayment" element = {<Installmentpayment />} />
        <Route path="/exams" element = {<Exam />} />
        <Route path="/student-exam/:scheduleExamId" element = {<StudentExam />} />
        <Route path="/student-exam-details/:scheduleExamId/:stuId" element = {<StudentExamDetails />} />
        {/* <Route path="/editresult" element = {<EditExcelAndSave />} /> */}
        <Route path="/reports" element = {<Report />} />
        <Route path="/student/:stuId" element = {<AllCourses />} />
      </Routes>
      </BrowserRouter>

      </AuthContext.Provider>
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

