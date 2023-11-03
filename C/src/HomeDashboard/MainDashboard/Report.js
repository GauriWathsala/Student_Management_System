// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Report = () => {
//   const [students, setStudents] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [enrolledStudents, setEnrolledStudents] = useState(0);
//   const [notEnrolledStudents, setNotEnrolledStudents] = useState(0);
//   const [monthlyStudentCounts, setMonthlyStudentCounts] = useState({});
//   const [lastMonthRegisteredCount, setLastMonthRegisteredCount] = useState(0);
//   const [courseStudentCounts, setCourseStudentCounts] = useState({});
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [lastMonthIncome, setLastMonthIncome] = useState(0);
//   const [registrationIncome, setRegistrationIncome] = useState(0);
//   const [enrollmentIncome,setEnrollmentIncome] = useState(0);
//   const [payments, setPayments] = useState([]);

//   useEffect(() => {
//     // Fetch student data from the API
//     axios.get('http://localhost:3001/student')
//       .then(response => {
//         const allStudents = response.data;
//         setStudents(allStudents);

//         const EnrolledStudents = allStudents.filter(student => student.courseId);
//         setEnrolledStudents(EnrolledStudents.length);

//         const notEnrolledStudents = allStudents.filter(student => !student.courseId);
//         setNotEnrolledStudents(notEnrolledStudents.length);

//          // Calculate monthly student counts
//         const monthlyCounts = {};
//         allStudents.forEach(student => {
//           const registrationMonth = new Date(student.createdAt).getMonth(); // 0-indexed month
//           if (!monthlyCounts[registrationMonth]) {
//             monthlyCounts[registrationMonth] = 0;
//           }
//           monthlyCounts[registrationMonth]++;
//       })
//       setMonthlyStudentCounts(monthlyCounts);

//        // Calculate count of students registered in the last month
//        const currentDate = new Date();
//        const lastMonth = currentDate.getMonth() - 1;
//        const lastMonthRegisteredStudents = monthlyCounts[lastMonth] || 0;
//        setLastMonthRegisteredCount(lastMonthRegisteredStudents);

//         // Calculate number of students in each course
//         const courseCounts = {};
//         allStudents.forEach(student => {
//           const courseId = student.courseId || 'Not Enrolled';
//           if (!courseCounts[courseId]) {
//             courseCounts[courseId] = 0;
//           }
//           courseCounts[courseId]++;
//         });
//         setCourseStudentCounts(courseCounts);
//      })
//       .catch(error => {
//         console.error('Error fetching student data:', error);
//       });

//        // Fetch course data from the API
//       axios.get('http://localhost:3001/course')
//       .then(response => {
//         const allCourses = response.data;
//         setCourses(allCourses);
//     })
//       .catch(error => {
//         console.error('Error fetching course data:', error);
//       });

//         // Fetch payment data from the API
//     axios.get('http://localhost:3001/payment')
//     .then(response => {
//         const allPayments = response.data;
//         setPayments(allPayments);
//         const currentDate = new Date();
//         const lastMonth = currentDate.getMonth() - 1;
        
//         // Calculate total income
//         const totalIncome = allPayments.reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
//         setTotalIncome(totalIncome);

//         // Calculate income of last month
//         const lastMonthIncome = allPayments
//           .filter(payment => new Date(payment.createdAt).getMonth() === lastMonth)
//           .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
//         setLastMonthIncome(lastMonthIncome);

//          // Calculate income from registrations
//          const registrationIncome = allPayments
//          .filter(payment => payment.details === 'Registration Fee')
//          .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
//        setRegistrationIncome(registrationIncome);

//         // Calculate income from course fees
//         const enrollmentIncome = allPayments
//           .filter(payment => payment.details === 'Course Fee')
//           .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
//         setEnrollmentIncome(enrollmentIncome);
//     })
//     .catch(error => {
//       console.error('Error fetching payment data:', error);
//     });

//   }, []);

//   // Calculate the total amount to be paid for all students
//   const totalToBePaid = students.reduce((sum, student) => {
//     const course = courses.find(course => course.courseId === student.courseId);
//     const courseFee = course ? parseFloat(course.courseFee) : 0;

//     const studentCoursePayments = payments
//       .filter(payment => payment.stuId === student.stuId && payment.details === 'Course Fee')
//       .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);

//     const toBePaid = courseFee - studentCoursePayments;
    
//     return sum + toBePaid;
//   }, 0);

//   return (
//     <div>
//       <h1>Student Report</h1>
//       <p>Total Students: {students.length}</p>
//       <p>Enrolled Student Count: {enrolledStudents}</p>
//       <p>Not Enrolled Student Count: {notEnrolledStudents}</p>
//       <p>Total Income: {totalIncome.toFixed(2)}</p>
//       <p>Income From Registrations: {registrationIncome.toFixed(2)}</p>
//       <p>Income From Course Enrollments: {enrollmentIncome.toFixed(2)}</p>
//       <p>Income To Be Received: {totalToBePaid.toFixed(2)}</p>
//       <p>Last Month Registered Student Count: {lastMonthRegisteredCount}</p>
//       <p>Last Month Income: {lastMonthIncome.toFixed(2)}</p> <br/>
//       <table>
//         <thead>
//           <tr>
//             <th>Student Number</th>
//             <th>Created Date</th>
//             <th>Course</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map(student => (
//             <tr key={student.stuId}>
//               <td>{student.stuId}</td>
//               <td>{new Date(student.createdAt).toLocaleString()}</td>
//               <td>{student.courseId}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table> <br />
//       <h3>Monthly Student Counts</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Month</th>
//             <th>Student Count</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.keys(monthlyStudentCounts).map(month => (
//             <tr key={month}>
//               <td>{new Date(0, parseInt(month), 1).toLocaleString('default', { month: 'long' })}</td>
//               <td>{monthlyStudentCounts[month]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table> <br />
//       <h3>Course Student Counts</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Course ID</th>
//             <th>Course Name</th>
//             <th>Student Count</th>
//           </tr>
//         </thead>
//         <tbody>
//           {courses.map(course => (
//             <tr key={course.courseId}>
//                <td>{course.courseId}</td> 
//               <td>{course.courseName}</td>
//               <td>{courseStudentCounts[course.courseId] || 0}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table><br />
//       <h3> paid to be</h3>
//       <table>
//       <thead>
//           <tr>
//             <th>StudentID</th>
//             <th>CourseID</th>
//             <th>Course Fee</th>
//             <th>Course Payments</th>
//             <th>To be Paid</th>
//           </tr>
//         </thead>
//         <tbody>
//     {students.map(student => {
//       const course = courses.find(course => course.courseId === student.courseId);
//       const courseFee = course ? parseFloat(course.courseFee) : 0;
      
//        // Calculate the total payment made by the student for the course
//        const studentCoursePayments = payments
//        .filter(payment => payment.stuId === student.stuId && payment.details === 'Course Fee')
//        .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);

//      const toBePaid = courseFee - studentCoursePayments;

//       return (
//         <tr key={student.stuId}>
//           <td>{student.stuId}</td>
//           <td>{student.courseId || 'Not Enrolled'}</td>
//           <td>{courseFee.toFixed(2)}</td>
//           <td>{studentCoursePayments.toFixed(2)}</td>
//           <td>{toBePaid.toFixed(2)}</td>
//         </tr>
//       );
//     })}
//   </tbody>
//       </table>
//     </div>
//   );
// }

// export default Report;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { LineChart, Line } from 'recharts';
// import { PieChart, Pie, Cell } from 'recharts';
// import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';




// const Report = () => {
//   const [students, setStudents] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [enrolledStudents, setEnrolledStudents] = useState(0);
//   const [notEnrolledStudents, setNotEnrolledStudents] = useState(0);
//   const [monthlyStudentCounts, setMonthlyStudentCounts] = useState({});
//   const [lastMonthRegisteredCount, setLastMonthRegisteredCount] = useState(0);
//   const [courseStudentCounts, setCourseStudentCounts] = useState({});
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [lastMonthIncome, setLastMonthIncome] = useState(0);
//   const [registrationIncome, setRegistrationIncome] = useState(0);
//   const [enrollmentIncome,setEnrollmentIncome] = useState(0);
//   const [payments, setPayments] = useState([]);
//   const [renderPdf, setRenderPdf] = useState(false);


//   useEffect(() => {
//     // Fetch student data from the API
//     axios.get('http://localhost:3001/student')
//       .then(response => {
//         const allStudents = response.data;
//         setStudents(allStudents);

//         const EnrolledStudents = allStudents.filter(student => student.courseId);
//         setEnrolledStudents(EnrolledStudents.length);

//         const notEnrolledStudents = allStudents.filter(student => !student.courseId);
//         setNotEnrolledStudents(notEnrolledStudents.length);

//          // Calculate monthly student counts
//         const monthlyCounts = {};
//         allStudents.forEach(student => {
//           const registrationMonth = new Date(student.createdAt).getMonth(); // 0-indexed month
//           if (!monthlyCounts[registrationMonth]) {
//             monthlyCounts[registrationMonth] = 0;
//           }
//           monthlyCounts[registrationMonth]++;
//       })
//       setMonthlyStudentCounts(monthlyCounts);

//        // Calculate count of students registered in the last month
//        const currentDate = new Date();
//        const lastMonth = currentDate.getMonth() - 1;
//        const lastMonthRegisteredStudents = monthlyCounts[lastMonth] || 0;
//        setLastMonthRegisteredCount(lastMonthRegisteredStudents);

//         // Calculate number of students in each course
//         const courseCounts = {};
//         allStudents.forEach(student => {
//           const courseId = student.courseId || 'Not Enrolled';
//           if (!courseCounts[courseId]) {
//             courseCounts[courseId] = 0;
//           }
//           courseCounts[courseId]++;
//         });
//         setCourseStudentCounts(courseCounts);
//      })
//       .catch(error => {
//         console.error('Error fetching student data:', error);
//       });

//        // Fetch course data from the API
//       axios.get('http://localhost:3001/course')
//       .then(response => {
//         const allCourses = response.data;
//         setCourses(allCourses);
//     })
//       .catch(error => {
//         console.error('Error fetching course data:', error);
//       });

//         // Fetch payment data from the API
//     axios.get('http://localhost:3001/payment')
//     .then(response => {
//         const allPayments = response.data;
//         setPayments(allPayments);
//         const currentDate = new Date();
//         const lastMonth = currentDate.getMonth() - 1;
        
//         // Calculate total income
//         const totalIncome = allPayments.reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
//         setTotalIncome(totalIncome);

//         // Calculate income of last month
//         const lastMonthIncome = allPayments
//           .filter(payment => new Date(payment.createdAt).getMonth() === lastMonth)
//           .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
//         setLastMonthIncome(lastMonthIncome);

//          // Calculate income from registrations
//          const registrationIncome = allPayments
//          .filter(payment => payment.details === 'Registration Fee')
//          .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
//        setRegistrationIncome(registrationIncome);

//         // Calculate income from course fees
//         const enrollmentIncome = allPayments
//           .filter(payment => payment.details === 'Course Fee')
//           .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
//         setEnrollmentIncome(enrollmentIncome);
//     })
//     .catch(error => {
//       console.error('Error fetching payment data:', error);
//     });

//   }, []);

//   // Calculate the total amount to be paid for all students
//   const totalToBePaid = students.reduce((sum, student) => {
//     const course = courses.find(course => course.courseId === student.courseId);
//     const courseFee = course ? parseFloat(course.courseFee) : 0;

//     const studentCoursePayments = payments
//       .filter(payment => payment.stuId === student.stuId && payment.details === 'Course Fee')
//       .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);

//     const toBePaid = courseFee - studentCoursePayments;
    
//     return sum + toBePaid;
//   }, 0);


//   const enrollmentStatusData = [
//     { name: 'Enrolled', value: enrolledStudents },
//     { name: 'Not Enrolled', value: notEnrolledStudents }
//   ];

//   const monthlyIncomeData = Object.keys(monthlyStudentCounts).map(month => ({
//     month: new Date(0, parseInt(month), 1).toLocaleString('default', { month: 'short' }),
//     income: monthlyStudentCounts[month] * enrollmentIncome // Assuming income is linearly proportional to student count
//   }));

//   const incomeOverTimeData = Object.keys(monthlyStudentCounts).map(month => ({
//     month: new Date(0, parseInt(month), 1).toLocaleString('default', { month: 'short' }),
//     income: monthlyStudentCounts[month] * enrollmentIncome // Assuming income is linearly proportional to student count
//   }));


  
  

//   return (
//     <div>
       
//         <>
//       <h1>Student Report</h1>
//       <p>Total Students: {students.length}</p>
//       <p>Enrolled Student Count: {enrolledStudents}</p>
//       <p>Not Enrolled Student Count: {notEnrolledStudents}</p>
      
//       <p>Last Month Registered Student Count: {lastMonthRegisteredCount}</p>
      
//       <table>
//         <thead>
//           <tr>
//             <th>Student Number</th>
//             <th>Created Date</th>
//             <th>Course</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map(student => (
//             <tr key={student.stuId}>
//               <td>{student.stuId}</td>
//               <td>{new Date(student.createdAt).toLocaleString()}</td>
//               <td>{student.courseId}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table> <br />
//       <h3>Enrollment Status</h3>
//       <PieChart width={400} height={300}>
//         <Pie
//           data={enrollmentStatusData}
//           dataKey="value"
//           nameKey="name"
//           cx="50%"
//           cy="50%"
//           outerRadius={80}
//           fill="#8884d8"
//           label
//         >
//           {enrollmentStatusData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={index === 0 ? "#8884d8" : "#82ca9d"} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend align="center" />
//       </PieChart>
//       <h3>Monthly Student Counts</h3>
//       <BarChart width={600} height={300} data={Object.keys(monthlyStudentCounts).map(month => ({
//         month: new Date(0, parseInt(month), 1).toLocaleString('default', { month: 'short' }),
//         studentCount: monthlyStudentCounts[month]
//       }))}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="studentCount" fill="#8884d8" />
//       </BarChart> <br />

//       <h3>Course Student Counts</h3>
//       <BarChart width={600} height={300} data={courses.map(course => ({
//         courseName: course.courseName,
//         studentCount: courseStudentCounts[course.courseId] || 0
//       }))}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="courseName" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="studentCount" fill="#82ca9d" />
//       </BarChart><br />

// <p>Total Income: {totalIncome.toFixed(2)}</p>
//       <p>Income From Registrations: {registrationIncome.toFixed(2)}</p>
//       <p>Income From Course Enrollments: {enrollmentIncome.toFixed(2)}</p>
//       <p>Income To Be Received: {totalToBePaid.toFixed(2)}</p>
//       <p>Last Month Income: {lastMonthIncome.toFixed(2)}</p> <br/>
//       <h3>Monthly Income</h3>
//       <LineChart width={600} height={300} data={monthlyIncomeData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
//       </LineChart>
      
  
//       <h3> paid to be</h3>
//       <table>
//       <thead>
//           <tr>
//             <th>StudentID</th>
//             <th>CourseID</th>
//             <th>Course Fee</th>
//             <th>Course Payments</th>
//             <th>To be Paid</th>
//           </tr>
//         </thead>
//         <tbody>
//     {students.map(student => {
//       const course = courses.find(course => course.courseId === student.courseId);
//       const courseFee = course ? parseFloat(course.courseFee) : 0;
      
//        // Calculate the total payment made by the student for the course
//        const studentCoursePayments = payments
//        .filter(payment => payment.stuId === student.stuId && payment.details === 'Course Fee')
//        .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);

//      const toBePaid = courseFee - studentCoursePayments;

//       return (
//         <tr key={student.stuId}>
//           <td>{student.stuId}</td>
//           <td>{student.courseId || 'Not Enrolled'}</td>
//           <td>{courseFee.toFixed(2)}</td>
//           <td>{studentCoursePayments.toFixed(2)}</td>
//           <td>{toBePaid.toFixed(2)}</td>
//         </tr>
//       );
//     })}
//   </tbody>
//       </table>
      
//      </>
     
//     </div>
//   );
// }

// export default Report;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { LineChart, Line } from 'recharts';
// import { PieChart, Pie, Cell } from 'recharts';
// import html2pdf from 'html2pdf.js';




// const Report = () => {
//   const [students, setStudents] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [enrolledStudents, setEnrolledStudents] = useState(0);
//   const [notEnrolledStudents, setNotEnrolledStudents] = useState(0);
//   const [monthlyStudentCounts, setMonthlyStudentCounts] = useState({});
//   const [lastMonthRegisteredCount, setLastMonthRegisteredCount] = useState(0);
//   const [courseStudentCounts, setCourseStudentCounts] = useState({});
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [lastMonthIncome, setLastMonthIncome] = useState(0);
//   const [registrationIncome, setRegistrationIncome] = useState(0);
//   const [enrollmentIncome,setEnrollmentIncome] = useState(0);
//   const [payments, setPayments] = useState([]);
//   const [renderPdf, setRenderPdf] = useState(false);


//   useEffect(() => {
//     // Fetch student data from the API
//     axios.get('http://localhost:3001/student')
//       .then(response => {
//         const allStudents = response.data;
//         setStudents(allStudents);

//         const EnrolledStudents = allStudents.filter(student => student.courseId);
//         setEnrolledStudents(EnrolledStudents.length);

//         const notEnrolledStudents = allStudents.filter(student => !student.courseId);
//         setNotEnrolledStudents(notEnrolledStudents.length);

//          // Calculate monthly student counts
//         const monthlyCounts = {};
//         allStudents.forEach(student => {
//           const registrationMonth = new Date(student.createdAt).getMonth(); // 0-indexed month
//           if (!monthlyCounts[registrationMonth]) {
//             monthlyCounts[registrationMonth] = 0;
//           }
//           monthlyCounts[registrationMonth]++;
//       })
//       setMonthlyStudentCounts(monthlyCounts);

//        // Calculate count of students registered in the last month
//        const currentDate = new Date();
//        const lastMonth = currentDate.getMonth() - 1;
//        const lastMonthRegisteredStudents = monthlyCounts[lastMonth] || 0;
//        setLastMonthRegisteredCount(lastMonthRegisteredStudents);

//         // Calculate number of students in each course
//         const courseCounts = {};
//         allStudents.forEach(student => {
//           const courseId = student.courseId || 'Not Enrolled';
//           if (!courseCounts[courseId]) {
//             courseCounts[courseId] = 0;
//           }
//           courseCounts[courseId]++;
//         });
//         setCourseStudentCounts(courseCounts);
//      })
//       .catch(error => {
//         console.error('Error fetching student data:', error);
//       });

//        // Fetch course data from the API
//       axios.get('http://localhost:3001/course')
//       .then(response => {
//         const allCourses = response.data;
//         setCourses(allCourses);
//     })
//       .catch(error => {
//         console.error('Error fetching course data:', error);
//       });

//         // Fetch payment data from the API
//     axios.get('http://localhost:3001/payment')
//     .then(response => {
//         const allPayments = response.data;
//         setPayments(allPayments);
//         const currentDate = new Date();
//         const lastMonth = currentDate.getMonth() - 1;
        
//         // Calculate total income
//         const totalIncome = allPayments.reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
//         setTotalIncome(totalIncome);

//         // Calculate income of last month
//         const lastMonthIncome = allPayments
//           .filter(payment => new Date(payment.createdAt).getMonth() === lastMonth)
//           .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
//         setLastMonthIncome(lastMonthIncome);

//          // Calculate income from registrations
//          const registrationIncome = allPayments
//          .filter(payment => payment.details === 'Registration Fee')
//          .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
//        setRegistrationIncome(registrationIncome);

//         // Calculate income from course fees
//         const enrollmentIncome = allPayments
//           .filter(payment => payment.details === 'Course Fee')
//           .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
//         setEnrollmentIncome(enrollmentIncome);
//     })
//     .catch(error => {
//       console.error('Error fetching payment data:', error);
//     });

//   }, []);

//   // Calculate the total amount to be paid for all students
//   const totalToBePaid = students.reduce((sum, student) => {
//     const course = courses.find(course => course.courseId === student.courseId);
//     const courseFee = course ? parseFloat(course.courseFee) : 0;

//     const studentCoursePayments = payments
//       .filter(payment => payment.stuId === student.stuId && payment.details === 'Course Fee')
//       .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);

//     const toBePaid = courseFee - studentCoursePayments;
    
//     return sum + toBePaid;
//   }, 0);


//   const enrollmentStatusData = [
//     { name: 'Enrolled', value: enrolledStudents },
//     { name: 'Not Enrolled', value: notEnrolledStudents }
//   ];

//   const monthlyIncomeData = Object.keys(monthlyStudentCounts).map(month => ({
//     month: new Date(0, parseInt(month), 1).toLocaleString('default', { month: 'short' }),
//     income: monthlyStudentCounts[month] * enrollmentIncome // Assuming income is linearly proportional to student count
//   }));

//   const incomeOverTimeData = Object.keys(monthlyStudentCounts).map(month => ({
//     month: new Date(0, parseInt(month), 1).toLocaleString('default', { month: 'short' }),
//     income: monthlyStudentCounts[month] * enrollmentIncome // Assuming income is linearly proportional to student count
//   }));

//   const handleDownloadPDF = () => {
//     const element = document.getElementById('reportContent');
//     const opt = {
//       margin: 10,
//       filename: 'student_report.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//     };

//     html2pdf().from(element).set(opt).save();
//   };
  
  

//   return (
//     <div>
       
//         <div id='reportContent'>
//       <h1>Student Report</h1>
//       <p>Total Students: {students.length}</p>
//       <p>Enrolled Student Count: {enrolledStudents}</p>
//       <p>Not Enrolled Student Count: {notEnrolledStudents}</p>
//       <p>Last Month Registered Student Count: {lastMonthRegisteredCount}</p>
      
//       {/* <table>
//         <thead>
//           <tr>
//             <th>Student Number</th>
//             <th>Created Date</th>
//             <th>Course</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map(student => (
//             <tr key={student.stuId}>
//               <td>{student.stuId}</td>
//               <td>{new Date(student.createdAt).toLocaleString()}</td>
//               <td>{student.courseId}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table> <br /> */}
//       <h3>Enrollment Status</h3>
//       <PieChart width={400} height={300}>
//         <Pie
//           data={enrollmentStatusData}
//           dataKey="value"
//           nameKey="name"
//           cx="50%"
//           cy="50%"
//           outerRadius={80}
//           fill="#8884d8"
//           label
//         >
//           {enrollmentStatusData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={index === 0 ? "#8884d8" : "#82ca9d"} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend align="center" />
//       </PieChart>
//       <h3>Monthly Student Counts</h3>
//       <BarChart width={600} height={300} data={Object.keys(monthlyStudentCounts).map(month => ({
//         month: new Date(0, parseInt(month), 1).toLocaleString('default', { month: 'short' }),
//         studentCount: monthlyStudentCounts[month]
//       }))}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="studentCount" fill="#8884d8" />
//       </BarChart> <br />

//       <h3>Course Student Counts</h3>
//       <BarChart width={600} height={300} data={courses.map(course => ({
//         courseName: course.courseName,
//         studentCount: courseStudentCounts[course.courseId] || 0
//       }))}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="courseName" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="studentCount" fill="#82ca9d" />
//       </BarChart><br />

// <p>Total Income: {totalIncome.toFixed(2)}</p>
//       <p>Income From Registrations: {registrationIncome.toFixed(2)}</p>
//       <p>Income From Course Enrollments: {enrollmentIncome.toFixed(2)}</p>
//       <p>Income To Be Received: {totalToBePaid.toFixed(2)}</p>
//       <p>Last Month Income: {lastMonthIncome.toFixed(2)}</p> <br/>
//       <h3>Monthly Income</h3>
//       <LineChart width={600} height={300} data={monthlyIncomeData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
//       </LineChart>
      
  
//       {/* <h3> paid to be</h3>
//       <table>
//       <thead>
//           <tr>
//             <th>StudentID</th>
//             <th>CourseID</th>
//             <th>Course Fee</th>
//             <th>Course Payments</th>
//             <th>To be Paid</th>
//           </tr>
//         </thead>
//         <tbody>
//     {students.map(student => {
//       const course = courses.find(course => course.courseId === student.courseId);
//       const courseFee = course ? parseFloat(course.courseFee) : 0;
      
//        // Calculate the total payment made by the student for the course
//        const studentCoursePayments = payments
//        .filter(payment => payment.stuId === student.stuId && payment.details === 'Course Fee')
//        .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);

//      const toBePaid = courseFee - studentCoursePayments;

//       return (
//         <tr key={student.stuId}>
//           <td>{student.stuId}</td>
//           <td>{student.courseId || 'Not Enrolled'}</td>
//           <td>{courseFee.toFixed(2)}</td>
//           <td>{studentCoursePayments.toFixed(2)}</td>
//           <td>{toBePaid.toFixed(2)}</td>
//         </tr>
//       );
//     })}
//   </tbody>
//       </table> */}
      
//      </div>
//      <button onClick={handleDownloadPDF}>Download PDF</button>
//     </div>
//   );
// }

// export default Report;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import html2pdf from 'html2pdf.js';
import StudentCountWidget from '../Widgets/StudentCountWidget';
import IncomeWidget from '../Widgets/IncomeWidget';
import LastMonthWidget from '../Widgets/LastMonthWidget';
import './Report.scss';
import Welcomeheader from '../../Components/Registration/Welcomeheader';
import IncomeRegistration from '../Widgets/IncomeRegistration';
import EnrollmentIncome from '../Widgets/EnrollmentIncome';


const Report = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState(0);
  const [notEnrolledStudents, setNotEnrolledStudents] = useState(0);
  const [monthlyStudentCounts, setMonthlyStudentCounts] = useState({});
  const [lastMonthRegisteredCount, setLastMonthRegisteredCount] = useState(0);
  const [courseStudentCounts, setCourseStudentCounts] = useState({});
  const [totalIncome, setTotalIncome] = useState(0);
  const [lastMonthIncome, setLastMonthIncome] = useState(0);
  const [registrationIncome, setRegistrationIncome] = useState(0);
  const [enrollmentIncome,setEnrollmentIncome] = useState(0);
  const [payments, setPayments] = useState([]);
  const [renderPdf, setRenderPdf] = useState(false);


  useEffect(() => {
    // Fetch student data from the API
    axios.get('http://localhost:3001/student')
      .then(response => {
        const allStudents = response.data;
        setStudents(allStudents);

        const EnrolledStudents = allStudents.filter(student => student.courseId);
        setEnrolledStudents(EnrolledStudents.length);

        const notEnrolledStudents = allStudents.filter(student => !student.courseId);
        setNotEnrolledStudents(notEnrolledStudents.length);

         // Calculate monthly student counts
        const monthlyCounts = {};
        allStudents.forEach(student => {
          const registrationMonth = new Date(student.createdAt).getMonth(); // 0-indexed month
          if (!monthlyCounts[registrationMonth]) {
            monthlyCounts[registrationMonth] = 0;
          }
          monthlyCounts[registrationMonth]++;
      })
      setMonthlyStudentCounts(monthlyCounts);

       // Calculate count of students registered in the last month
       const currentDate = new Date();
       const lastMonth = currentDate.getMonth() - 1;
       const lastMonthRegisteredStudents = monthlyCounts[lastMonth] || 0;
       setLastMonthRegisteredCount(lastMonthRegisteredStudents);

        // Calculate number of students in each course
        const courseCounts = {};
        allStudents.forEach(student => {
          const courseId = student.courseId || 'Not Enrolled';
          if (!courseCounts[courseId]) {
            courseCounts[courseId] = 0;
          }
          courseCounts[courseId]++;
        });
        setCourseStudentCounts(courseCounts);
     })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });

       // Fetch course data from the API
      axios.get('http://localhost:3001/course')
      .then(response => {
        const allCourses = response.data;
        setCourses(allCourses);
    })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });

        // Fetch payment data from the API
    axios.get('http://localhost:3001/payment')
    .then(response => {
        const allPayments = response.data;
        setPayments(allPayments);
        const currentDate = new Date();
        const lastMonth = currentDate.getMonth() - 1;
        
        // Calculate total income
        const totalIncome = allPayments.reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
        setTotalIncome(totalIncome);

        // Calculate income of last month
        const lastMonthIncome = allPayments
          .filter(payment => new Date(payment.createdAt).getMonth() === lastMonth)
          .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
        setLastMonthIncome(lastMonthIncome);

         // Calculate income from registrations
         const registrationIncome = allPayments
         .filter(payment => payment.details === 'Registration Fee')
         .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
       setRegistrationIncome(registrationIncome);

        // Calculate income from course fees
        const enrollmentIncome = allPayments
          .filter(payment => payment.details === 'Course Fee')
          .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
        setEnrollmentIncome(enrollmentIncome);
    })
    .catch(error => {
      console.error('Error fetching payment data:', error);
    });

  }, []);

  // Calculate the total amount to be paid for all students
  const totalToBePaid = students.reduce((sum, student) => {
    const course = courses.find(course => course.courseId === student.courseId);
    const courseFee = course ? parseFloat(course.courseFee) : 0;

    const studentCoursePayments = payments
      .filter(payment => payment.stuId === student.stuId && payment.details === 'Course Fee')
      .reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);

    const toBePaid = courseFee - studentCoursePayments;
    
    return sum + toBePaid;
  }, 0);


  const enrollmentStatusData = [
    { name: 'Enrolled', value: enrolledStudents },
    { name: 'Not Enrolled', value: notEnrolledStudents }
  ];

  const monthlyIncomeData = Object.keys(monthlyStudentCounts).map(month => ({
    month: new Date(0, parseInt(month), 1).toLocaleString('default', { month: 'short' }),
    income: monthlyStudentCounts[month] * enrollmentIncome // Assuming income is linearly proportional to student count
  }));

  const incomeOverTimeData = Object.keys(monthlyStudentCounts).map(month => ({
    month: new Date(0, parseInt(month), 1).toLocaleString('default', { month: 'short' }),
    income: monthlyStudentCounts[month] * enrollmentIncome // Assuming income is linearly proportional to student count
  }));

  const handleDownloadPDF = () => {
    const element = document.getElementById('reportContent');
    const opt = {
      margin: 10,
      filename: 'student_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a3', orientation: 'portrait' },
    };

    html2pdf().from(element).set(opt).save();
  };
  
  

  return (
    <div>
       <Welcomeheader />
       <div id='reportContent'>
       <h1>Student Report</h1>

      <div className='widgets'>
      
      <StudentCountWidget
        totalStudents={students.length}
        enrolledStudents={enrolledStudents}
        notEnrolledStudents={notEnrolledStudents}
      />
       <h3>Income</h3>
       <IncomeWidget
        total={totalIncome.toFixed(2)}
        Outstanding={totalToBePaid.toFixed(2)}
        
      />
        
        <h3>Last Month</h3>
       <LastMonthWidget
        Income={lastMonthIncome.toFixed(2)}
        Registration={lastMonthRegisteredCount}
      />
</div>
<h2>Monthly Income</h2>
<div className='income'>
    <LineChart width={600} height={300} data={monthlyIncomeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>

      <div className='income-category'>
      <IncomeRegistration className = 'income-registration'
        RegistrationsIncome =  {registrationIncome.toFixed(2)}
      />
      <EnrollmentIncome className = "enrollment-income"
      EnrollmentIncome = {enrollmentIncome.toFixed(2)}
      />
      </div>
</div>

<h2>Monthly Student Registrations</h2>

<div className='comparison'> 
    <BarChart width={600} height={300} data={Object.keys(monthlyStudentCounts).map(month => ({
        month: new Date(0, parseInt(month), 1).toLocaleString('default', { month: 'short' }),
        studentCount: monthlyStudentCounts[month]
      }))}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="studentCount" fill="#8884d8" />
      </BarChart> 

      {/* <h2>Enrollmet Comparison</h2> */}
      <PieChart width={400} height={300} className='pie-chart'>
        <Pie
          data={enrollmentStatusData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {enrollmentStatusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index === 0 ? "#8884d8" : "#82ca9d"} />
          ))}
        </Pie>
        <Tooltip />
        <Legend align="center" />
      </PieChart>
      </div>
     
     

      <h2>Course Student Counts</h2>
      <BarChart width={600} height={300} data={courses.map(course => ({
        courseName: course.courseName,
        studentCount: courseStudentCounts[course.courseId] || 0
      }))}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="courseName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="studentCount" fill="#82ca9d" />
      </BarChart><br />

   </div>
     <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
}

export default Report;


