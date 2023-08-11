


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import Button from '@mui/material/Button';
// import CourseDetails from './CourseDetails';

// const UnavailableDates = () => {
//   const [unavailableDates, setUnavailableDates] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);


//   useEffect(() => {
//     // Make the API call to fetch data from the server
//     axios.get('http://localhost:3001/placementTest')
//       .then(response => {
//         // Filter the dates with availability = false
//         const filteredDates = response.data.filter(test => !test.availability);
//         const convertedDates = filteredDates.map(test => new Date(test.date)); // Convert to Date objects
//         setUnavailableDates(convertedDates);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

 
//   const handleSchedulePlacementTest = async () => {
//     if (selectedDate) {
//       try {
//         const response = await axios.post('http://localhost:3001/placementTest', {
//           date: selectedDate,
//           examId: 'P1813', // Replace with the actual examId
//         },
//         {
//           headers :{accessToken : localStorage.getItem("accessToken")}
//         }
//         );
//         alert ("Placement Test Scheduled Successfully.!")
//         console.log(response.data);

//       } catch (error) {
//         console.error('Error scheduling placement test:', error);

//       }
//     }
//   };
//   const handleSelectClick = () => {
//     setShowDatePicker(true);
//   };

//   const handleDateChange = date => {
//     setSelectedDate(date);
//     setShowDatePicker(false); // Hide the date picker after selecting a date
//   };

//   const isDateDisabled = date => {
//     const today = new Date();
//     return (
//       unavailableDates.some(test => test.toDateString() === date.toDateString()) ||
//       date < today
//     );
//   };

//   const filterWeekDays = date => {
//     // Allow selection only for Mondays, Wednesdays, and Fridays
//     return date.getDay() === 1 || date.getDay() === 3 || date.getDay() === 5;
//   };

//   const highlightUnavailableDates = [
//     {
//       // Custom CSS class for highlighting unavailable dates in red
//       dates: unavailableDates,
//       className: 'unavailable-date',
//     },
//   ];

//   return (
//     <div>
//       <style>{`
//         .unavailable-date {
//           background-color: red;
//           color: white;
//         }
//       `}</style>
//       <h2>Unavailable Dates:</h2>

//       {/* Show the "Select" button */}
//       <div>
//         <Button variant="contained" onClick={handleSelectClick}>
//           Select
//         </Button>
//       </div>

//       {/* Show the MUI dialog when showDatePicker is true */}
//       <Dialog
//         open={showDatePicker}
//         onClose={() => setShowDatePicker(false)}
//         sx={{
//           '& .MuiDialog-paper': {
//             maxWidth: '600px', // Increase the width of the dialog box
//             maxHeight: '80%', // Increase the height of the dialog box
//           },
//         }}
//       >
//         <DialogContent>
//           <h3>Exam Instructions:</h3>
//           <p>
//             Sit for placement test is mandatory. According to the result of placement test, courses are allocated.
//             The placement test is held only every Monday, Wednesday, and Friday.
//           </p>
//           {/* Show the "Pick a Date" button */}
//           <Button variant="contained" onClick={() => setShowDatePicker(true)}>
//             Pick a Date
//           </Button>
//           {/* Show the date picker when showDatePicker is true */}
//           {showDatePicker && (
//             <DatePicker
//               selected={selectedDate}
//               onChange={handleDateChange}
//               dateFormat="MM/dd/yyyy"
//               excludeDates={unavailableDates}
//               minDate={new Date()} // Block past dates
//               highlightDates={highlightUnavailableDates} // Highlight unavailable dates in red
//               filterDate={filterWeekDays} // Allow selection only for Mondays, Wednesdays, and Fridays
//             />
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Display the selected date when it's not null */}
//       {selectedDate !== null && <p>You picked: {selectedDate.toLocaleDateString()}</p>}
//       {/* <label>Student ID : {selectedDate.username}</label> */}
//       <Button variant="contained" onClick={handleSchedulePlacementTest}> Schedule Placement Test</Button>

//       <div>
//         <CourseDetails />
//       </div>

//     </div>
//   );
// };

// export default UnavailableDates;


// import React, { useEffect, useState,useContext } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import Button from '@mui/material/Button';
// import CourseDetails from './CourseDetails';
// import { AuthContext } from '../../helpers/AuthContext';

// const UnavailableDates = () => {
//   const [unavailableDates, setUnavailableDates] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [examResults, setExamResults] = useState([]);
//   const {authState} = useContext(AuthContext)

//   useEffect(() => {
//     axios.get('http://localhost:3001/placementTest')
//       .then(response => {
//         const filteredDates = response.data.filter(test => !test.availability);
//         const convertedDates = filteredDates.map(test => new Date(test.date));
//         setUnavailableDates(convertedDates);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });

//     axios.get('http://localhost:3001/placementTest/schedule-placement-tests')
//       .then(response => {
//         setExamResults(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching exam results data:', error);
//       });
//   }, []);

//   const handleSchedulePlacementTest = async () => {
//     if (selectedDate) {
//       try {
//         const response = await axios.post('http://localhost:3001/placementTest', {
//           date: selectedDate,
//           examId: 'P3774', // Replace with the actual examId
//         },
//         {
//           headers :{accessToken : localStorage.getItem("accessToken")}
//         }
//         );
//         alert ("Placement Test Scheduled Successfully.!")
//         console.log(response.data);

//       } catch (error) {
//         console.error('Error scheduling placement test:', error);
//       }
//     }
//   };

//   const handleSelectClick = () => {
//     setShowDatePicker(true);
//   };

//   const handleDateChange = date => {
//     setSelectedDate(date);
//     setShowDatePicker(false);
//   };

//   const isDateDisabled = date => {
//     const today = new Date();
//     return (
//       unavailableDates.some(test => test.toDateString() === date.toDateString()) ||
//       date < today
//     );
//   };

//   const filterWeekDays = date => {
//     return date.getDay() === 1 || date.getDay() === 3 || date.getDay() === 5;
//   };

//   const highlightUnavailableDates = [
//     {
//       dates: unavailableDates,
//       className: 'unavailable-date',
//     },
//   ];

//   return (
//     <div>
//       <style>{`
//         .unavailable-date {
//           background-color: red;
//           color: white;
//         }
//       `}</style>
//       <h2>Unavailable Dates:</h2>

//       <div>
//         <Button variant="contained" onClick={handleSelectClick}>
//           Select
//         </Button>
//       </div>

//       <Dialog
//         open={showDatePicker}
//         onClose={() => setShowDatePicker(false)}
//         sx={{
//           '& .MuiDialog-paper': {
//             maxWidth: '600px',
//             maxHeight: '80%',
//           },
//         }}
//       >
//         <DialogContent>
//           <h3>Exam Instructions:</h3>
//           <p>
//             Sit for placement test is mandatory. According to the result of placement test, courses are allocated.
//             The placement test is held only every Monday, Wednesday, and Friday.
//           </p>
//           <Button variant="contained" onClick={() => setShowDatePicker(true)}>
//             Pick a Date
//           </Button>
//           {showDatePicker && (
//             <DatePicker
//               selected={selectedDate}
//               onChange={handleDateChange}
//               dateFormat="MM/dd/yyyy"
//               excludeDates={unavailableDates}
//               minDate={new Date()}
//               highlightDates={highlightUnavailableDates}
//               filterDate={filterWeekDays}
//             />
//           )}
//         </DialogContent>
//       </Dialog>

//       {selectedDate !== null && <p>You picked: {selectedDate.toLocaleDateString()}</p>}
//       <Button variant="contained" onClick={handleSchedulePlacementTest}> Schedule Placement Test</Button>

//       <div>
//         <h2>Exam Results:</h2>
//         <label> Student ID : {authState.username}</label>
//         {examResults.some(result => result.stuId === authState.username) ? (
//   <ul>
//     {examResults
//       .filter(result => result.stuId === authState.username) // Filter results for the logged-in user
//       .map(result => (
//         <li key={result.availabilityId}>
//           Status: {result.state}, Marks: {result.marks}
//         </li>
//       ))}
//   </ul>
// ) : (
//   <p>No exam results available for the logged-in user.</p>
// )}

//       </div>

//       <div>
//         <CourseDetails />
//       </div>
//     </div>
//   );
// };

// export default UnavailableDates;






// import React, { useEffect, useState,useContext } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import Button from '@mui/material/Button';
// import CourseDetails from './CourseDetails';
// import { AuthContext } from '../../helpers/AuthContext';

// const UnavailableDates = () => {
//   const [unavailableDates, setUnavailableDates] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [examResults, setExamResults] = useState([]);
//   const {authState} = useContext(AuthContext)

//   useEffect(() => {
//     axios.get('http://localhost:3001/placementTest')
//       .then(response => {
//         const filteredDates = response.data.filter(test => !test.availability);
//         const convertedDates = filteredDates.map(test => new Date(test.date));
//         setUnavailableDates(convertedDates);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });

//     axios.get('http://localhost:3001/placementTest/schedule-placement-tests')
//       .then(response => {
//         setExamResults(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching exam results data:', error);
//       });
//   }, []);

//   const handleSchedulePlacementTest = async () => {
//     if (selectedDate) {
//       try {
//         const response = await axios.post('http://localhost:3001/placementTest', {
//           date: selectedDate,
//           examId: 'P3774', // Replace with the actual examId
//         },
//         {
//           headers :{accessToken : localStorage.getItem("accessToken")}
//         }
//         );
//         alert ("Placement Test Scheduled Successfully.!")
//         console.log(response.data);

//       } catch (error) {
//         console.error('Error scheduling placement test:', error);
//       }
//     }
//   };

//   const handleSelectClick = () => {
//     setShowDatePicker(true);
//   };

//   const handleDateChange = date => {
//     setSelectedDate(date);
//     setShowDatePicker(false);
//   };

//   const isDateDisabled = date => {
//     const today = new Date();
//     return (
//       unavailableDates.some(test => test.toDateString() === date.toDateString()) ||
//       date < today
//     );
//   };

//   const filterWeekDays = date => {
//     return date.getDay() === 1 || date.getDay() === 3 || date.getDay() === 5;
//   };

//   const highlightUnavailableDates = [
//     {
//       dates: unavailableDates,
//       className: 'unavailable-date',
//     },
//   ];

//   return (
//     <div>
//       <style>{`
//         .unavailable-date {
//           background-color: red;
//           color: white;
//         }
//       `}</style>
//       <h2>Unavailable Dates:</h2>

//       {examResults.some(result => result.stuId === authState.username) ? (
//     <p>Placement Test already scheduled for this user.</p>
//   ) : (
//     <div>
//       <Button variant="contained" onClick={handleSelectClick}>
//         Select
//       </Button>
//     </div>
//   )}

//       <Dialog
//         open={showDatePicker}
//         onClose={() => setShowDatePicker(false)}
//         sx={{
//           '& .MuiDialog-paper': {
//             maxWidth: '600px',
//             maxHeight: '80%',
//           },
//         }}
//       >
//         <DialogContent>
//           <h3>Exam Instructions:</h3>
//           <p>
//             Sit for placement test is mandatory. According to the result of placement test, courses are allocated.
//             The placement test is held only every Monday, Wednesday, and Friday.
//           </p>
//           <Button variant="contained" onClick={() => setShowDatePicker(true)}>
//             Pick a Date
//           </Button>
//           {showDatePicker && (
//             <DatePicker
//               selected={selectedDate}
//               onChange={handleDateChange}
//               dateFormat="MM/dd/yyyy"
//               excludeDates={unavailableDates}
//               minDate={new Date()}
//               highlightDates={highlightUnavailableDates}
//               filterDate={filterWeekDays}
//             />
//           )}
//         </DialogContent>
//       </Dialog>

//       {selectedDate !== null && <p>You picked: {selectedDate.toLocaleDateString()}</p>}
//       {!examResults.some(result => result.stuId === authState.username) && (
//         <Button variant="contained" onClick={handleSchedulePlacementTest}>
//           Schedule Placement Test
//         </Button>
//       )}

//       <div>
//         <h2>Exam Results:</h2>
//         <label> Student ID : {authState.username}</label>
//         {examResults.some(result => result.stuId === authState.username) ? (
//              <ul>
//                 {examResults
//                 .filter(result => result.stuId === authState.username) // Filter results for the logged-in user
//                 .map(result => (
//                 <li key={result.availabilityId}>
//                 Status: {result.state}, Marks: {result.marks}
//                  </li>
//                 ))}
//             </ul>
//           ) : (
//           <p>No exam results available for the logged-in user.</p>
//           )}

//       </div>

//       <div>
//         <CourseDetails />
//       </div>
//     </div>
//   );
// };

// export default UnavailableDates;


import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import CourseDetails from './CourseDetails';
import { AuthContext } from '../../helpers/AuthContext';

const UnavailableDates = () => {
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [examResults, setExamResults] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:3001/placementTest')
      .then(response => {
        const filteredDates = response.data.filter(test => !test.availability);
        const convertedDates = filteredDates.map(test => new Date(test.date));
        setUnavailableDates(convertedDates);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    axios.get('http://localhost:3001/placementTest/schedule-placement-tests')
      .then(response => {
        setExamResults(response.data);
      })
      .catch(error => {
        console.error('Error fetching exam results data:', error);
      });
  }, []);

  const handleSchedulePlacementTest = async () => {
    if (selectedDate) {
      try {
        const response = await axios.post(
          'http://localhost:3001/placementTest',
          {
            date: selectedDate,
            examId: 'P3774', // Replace with the actual examId
          },
          {
            headers: { accessToken: localStorage.getItem('accessToken') },
          }
        );
        alert('Placement Test Scheduled Successfully.!');
        console.log(response.data);
      } catch (error) {
        console.error('Error scheduling placement test:', error);
      }
    }
  };

  const handleSelectClick = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const isDateDisabled = date => {
    const today = new Date();
    return (
      unavailableDates.some(test => test.toDateString() === date.toDateString()) ||
      date < today
    );
  };

  const filterWeekDays = date => {
    return date.getDay() === 1 || date.getDay() === 3 || date.getDay() === 5;
  };

  const highlightUnavailableDates = [
    {
      dates: unavailableDates,
      className: 'unavailable-date',
    },
  ];

  const hasValidExamResult = examResults.some(
    result => result.stuId === authState.username && result.state === 'Faced' && result.marks !== null
  );

  return (
    <div>
      <style>{`
        .unavailable-date {
          background-color: red;
          color: white;
        }
      `}</style>
      <h2>Unavailable Dates:</h2>

      {examResults.some(result => result.stuId === authState.username) ? (
        <p>Placement Test already scheduled for this user.</p>
      ) : (
        <div>
          <Button variant="contained" onClick={handleSelectClick}>
            Select
          </Button>
        </div>
      )}

      <Dialog
        open={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        sx={{
          '& .MuiDialog-paper': {
            maxWidth: '600px',
            maxHeight: '80%',
          },
        }}
      >
        <DialogContent>
          <h3>Exam Instructions:</h3>
          <p>
            Sit for placement test is mandatory. According to the result of placement test, courses are allocated.
            The placement test is held only every Monday, Wednesday, and Friday.
          </p>
          <Button variant="contained" onClick={() => setShowDatePicker(true)}>
            Pick a Date
          </Button>
          {showDatePicker && (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              excludeDates={unavailableDates}
              minDate={new Date()}
              highlightDates={highlightUnavailableDates}
              filterDate={filterWeekDays}
            />
          )}
        </DialogContent>
      </Dialog>

      {selectedDate !== null && (
        <p>You picked: {selectedDate.toLocaleDateString()}</p>
      )}

      {!examResults.some(result => result.stuId === authState.username) && (
        <Button variant="contained" onClick={handleSchedulePlacementTest}>
          Schedule Placement Test
        </Button>
      )}

      <div>
        <h2>Exam Results:</h2>
        <label> Student ID : {authState.username}</label>
        {examResults.some(result => result.stuId === authState.username) ? (
          <ul>
            {examResults
              .filter(result => result.stuId === authState.username) // Filter results for the logged-in user
              .map(result => (
                <li key={result.availabilityId}>
                  Status: {result.state}, Marks: {result.marks}
                </li>
              ))}
          </ul>
        ) : (
          <p>No exam results available for the logged-in user.</p>
        )}
      </div>

      {hasValidExamResult && <CourseDetails />}

    </div>
  );
};

export default UnavailableDates;






