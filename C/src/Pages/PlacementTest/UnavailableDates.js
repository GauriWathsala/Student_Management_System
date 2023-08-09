// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UnavailableDates = () => {
//   const [unavailableDates, setUnavailableDates] = useState([]);

//   useEffect(() => {
//     // Make the API call to fetch data from the server
//     axios.get('http://localhost:3001/placementTest')
//       .then(response => {
//         // Filter the dates with availability = false
//         const filteredDates = response.data.filter(test => !test.availability);
//         setUnavailableDates(filteredDates);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Unavailable Dates:</h2>
//       {unavailableDates.length > 0 ? (
//         <ul>
//           {unavailableDates.map(test => (
//             <li key={test.availabilityId}>{test.date}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No unavailable dates found.</p>
//       )}
//     </div>
//   );
// };

// export default UnavailableDates;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

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

//   const handleSelectClick = () => {
//     setShowDatePicker(true);
//   };

//   const handleDateChange = date => {
//     setSelectedDate(date);
//     setShowDatePicker(false); // Hide the date picker after selecting a date
//   };

//   return (
//     <div>
//       <h2>Unavailable Dates:</h2>
//       {unavailableDates.length > 0 ? (
//         <ul>
//           {unavailableDates.map((date, index) => (
//             <li key={index}>{date.toLocaleDateString()}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No unavailable dates found.</p>
//       )}

//       {/* Show the date picker when clicking "Select" button */}
//       <div>
//         {!showDatePicker && (
//           <button onClick={handleSelectClick}>Select</button>
//         )}
//         {showDatePicker && (
//           <DatePicker
//             selected={selectedDate}
//             onChange={handleDateChange}
//             dateFormat="MM/dd/yyyy"
//             placeholderText="Select a date"
//             excludeDates={unavailableDates} // Block the unavailable dates
//           />
//         )}
//       </div>

//       {/* Display the selected date when it's not null */}
//       {selectedDate !== null && <p>You picked: {selectedDate.toLocaleDateString()}</p>}
//     </div>
//   );
// };

// export default UnavailableDates;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

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

//   return (
//     <div>
//       <h2>Unavailable Dates:</h2>
//       {unavailableDates.length > 0 ? (
//         <ul>
//           {unavailableDates.map((date, index) => (
//             <li key={index}>{date.toLocaleDateString()}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No unavailable dates found.</p>
//       )}

//       {/* Show the date picker when clicking "Select" button */}
//       <div>
//         {!showDatePicker && (
//           <button onClick={handleSelectClick}>Select</button>
//         )}
//         {showDatePicker && (
//           <DatePicker
//             selected={selectedDate}
//             onChange={handleDateChange}
//             dateFormat="MM/dd/yyyy"
//             placeholderText="Select a date"
//             excludeDates={unavailableDates}
//             minDate={new Date()} // Block past dates
//           />
//         )}
//       </div>

//       {/* Display the selected date when it's not null */}
//       {selectedDate !== null && <p>You picked: {selectedDate.toLocaleDateString()}</p>}
//     </div>
//   );
// };

// export default UnavailableDates;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

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
//       {unavailableDates.length > 0 ? (
//         <ul>
//           {unavailableDates.map((date, index) => (
//             <li key={index}>{date.toLocaleDateString()}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No unavailable dates found.</p>
//       )}

//       {/* Show the date picker when clicking "Select" button */}
//       <div>
//         {!showDatePicker && (
//           <button onClick={handleSelectClick}>Select</button>
//         )}
//         {showDatePicker && (
//           <DatePicker
//             selected={selectedDate}
//             onChange={handleDateChange}
//             dateFormat="MM/dd/yyyy"
//             placeholderText="Select a date"
//             excludeDates={unavailableDates}
//             minDate={new Date()} // Block past dates
//             highlightDates={highlightUnavailableDates} // Highlight unavailable dates in red
//             filterDate={filterWeekDays} // Allow selection only for Mondays, Wednesdays, and Fridays
//           />
//         )}
//       </div>

//       {/* Display the selected date when it's not null */}
//       {selectedDate !== null && <p>You picked: {selectedDate.toLocaleDateString()}</p>}
//     </div>
//   );
// };

// export default UnavailableDates;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

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
//       {/* Removed the list of unavailable dates */}
//       {/* {!showDatePicker && (
//         <ul>
//           {unavailableDates.map((date, index) => (
//             <li key={index}>{date.toLocaleDateString()}</li>
//           ))}
//         </ul>
//       )} */}

//       {/* Show the date picker when clicking "Select" button */}
//       <div>
//         {!showDatePicker && (
//           <button onClick={handleSelectClick}>Select</button>
//         )}
//         {showDatePicker && (
//           <DatePicker
//             selected={selectedDate}
//             onChange={handleDateChange}
//             dateFormat="MM/dd/yyyy"
//             placeholderText="Select a date"
//             excludeDates={unavailableDates}
//             minDate={new Date()} // Block past dates
//             highlightDates={highlightUnavailableDates} // Highlight unavailable dates in red
//             filterDate={filterWeekDays} // Allow selection only for Mondays, Wednesdays, and Fridays
//           />
//         )}
//       </div>

//       {/* Display the selected date when it's not null */}
//       {selectedDate !== null && <p>You picked: {selectedDate.toLocaleDateString()}</p>}
//     </div>
//   );
// };

// export default UnavailableDates;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import Button from '@mui/material/Button';

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
//       <Dialog open={showDatePicker} onClose={() => setShowDatePicker(false)}>
//         <DialogContent>
//           <DatePicker
//             selected={selectedDate}
//             onChange={handleDateChange}
//             dateFormat="MM/dd/yyyy"
//             placeholderText="Select a date"
//             excludeDates={unavailableDates}
//             minDate={new Date()} // Block past dates
//             highlightDates={highlightUnavailableDates} // Highlight unavailable dates in red
//             filterDate={filterWeekDays} // Allow selection only for Mondays, Wednesdays, and Fridays
//           />
//         </DialogContent>
//       </Dialog>

//       {/* Show the date picker inside the MUI dialog when clicking "Select" button */}
//       <div>
//         {!showDatePicker && (
//           <Button variant="contained" onClick={handleSelectClick}>
//             Select
//           </Button>
//         )}
//       </div>

//       {/* Display the selected date when it's not null */}
//       {selectedDate !== null && <p>You picked: {selectedDate.toLocaleDateString()}</p>}
//     </div>
//   );
// };

// export default UnavailableDates;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import Button from '@mui/material/Button';

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

//       {/* Show the date picker inside the MUI dialog when clicking "Select" button */}
//       <div>
//         {!showDatePicker && (
//           <Button variant="contained" onClick={handleSelectClick}>
//             Select
//           </Button>
//         )}
//         <Dialog
//           open={showDatePicker}
//           onClose={() => setShowDatePicker(false)}
//           sx={{ '& .MuiDialog-paper': { maxWidth: '600px' } }} // Increase the size of the dialog box
//         >
//           <DialogContent>
//             <DatePicker
//               selected={selectedDate}
//               onChange={handleDateChange}
//               dateFormat="MM/dd/yyyy"
//               placeholderText="Select a date"
//               excludeDates={unavailableDates}
//               minDate={new Date()} // Block past dates
//               highlightDates={highlightUnavailableDates} // Highlight unavailable dates in red
//               filterDate={filterWeekDays} // Allow selection only for Mondays, Wednesdays, and Fridays
//             />
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Display the selected date when it's not null */}
//       {selectedDate !== null && <p>You picked: {selectedDate.toLocaleDateString()}</p>}
//     </div>
//   );
// };

// export default UnavailableDates;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import Button from '@mui/material/Button';

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

//       {/* Show the date picker inside the MUI dialog when clicking "Select" button */}
//       <div>
//         {!showDatePicker && (
//           <Button variant="contained" onClick={handleSelectClick}>
//             Select
//           </Button>
//         )}
//         <Dialog
//           open={showDatePicker}
//           onClose={() => setShowDatePicker(false)}
//           sx={{ '& .MuiDialog-paper': { maxWidth: '600px' } }} // Increase the size of the dialog box
//         >
//           <DialogContent>
//             <h3>Placement Test Instructions:</h3>
//             <p>
//               Sit for placement test is mandatory. According to the result of placement test, courses are allocated.
//               The placement test is held only every Monday, Wednesday, and Friday.
//             </p>
//             <DatePicker
//               selected={selectedDate}
//               onChange={handleDateChange}
//               dateFormat="MM/dd/yyyy"
//               placeholderText="Select a date"
//               excludeDates={unavailableDates}
//               minDate={new Date()} // Block past dates
//               highlightDates={highlightUnavailableDates} // Highlight unavailable dates in red
//               filterDate={filterWeekDays} // Allow selection only for Mondays, Wednesdays, and Fridays
//             />
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Display the selected date when it's not null */}
//       {selectedDate !== null && <p>You picked: {selectedDate.toLocaleDateString()}</p>}
//     </div>
//   );
// };

// export default UnavailableDates;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import Button from '@mui/material/Button';

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

//       {/* Show the date picker inside the MUI dialog when clicking "Select" button */}
//       <div>
//         {!showDatePicker && (
//           <Button variant="contained" onClick={handleSelectClick}>
//             Pick a date
//           </Button>
//         )}
//         <Dialog
//           open={showDatePicker}
//           onClose={() => setShowDatePicker(false)}
//           sx={{ '& .MuiDialog-paper': { maxWidth: '600px' } }} // Increase the size of the dialog box
//         >
//           <DialogContent>
//             <h3>Placement Test Instructions:</h3>
//             <p>
//               Sit for placement test is mandatory. According to the result of placement test, courses are allocated.
//               The placement test is held only every Monday, Wednesday, and Friday.
//             </p>
//             <DatePicker
//               selected={selectedDate}
//               onChange={handleDateChange}
//               dateFormat="MM/dd/yyyy"
//               excludeDates={unavailableDates}
//               minDate={new Date()} // Block past dates
//               highlightDates={highlightUnavailableDates} // Highlight unavailable dates in red
//               filterDate={filterWeekDays} // Allow selection only for Mondays, Wednesdays, and Fridays
//             />
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Display the selected date when it's not null */}
//       {selectedDate !== null && <p>You picked: {selectedDate.toLocaleDateString()}</p>}
//     </div>
//   );
// };

// export default UnavailableDates;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import Button from '@mui/material/Button';

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
//         sx={{ '& .MuiDialog-paper': { maxWidth: '600px' } }} // Increase the size of the dialog box
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
//     </div>
//   );
// };

// export default UnavailableDates;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

const UnavailableDates = () => {
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    // Make the API call to fetch data from the server
    axios.get('http://localhost:3001/placementTest')
      .then(response => {
        // Filter the dates with availability = false
        const filteredDates = response.data.filter(test => !test.availability);
        const convertedDates = filteredDates.map(test => new Date(test.date)); // Convert to Date objects
        setUnavailableDates(convertedDates);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSelectClick = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    setShowDatePicker(false); // Hide the date picker after selecting a date
  };

  const isDateDisabled = date => {
    const today = new Date();
    return (
      unavailableDates.some(test => test.toDateString() === date.toDateString()) ||
      date < today
    );
  };

  const filterWeekDays = date => {
    // Allow selection only for Mondays, Wednesdays, and Fridays
    return date.getDay() === 1 || date.getDay() === 3 || date.getDay() === 5;
  };

  const highlightUnavailableDates = [
    {
      // Custom CSS class for highlighting unavailable dates in red
      dates: unavailableDates,
      className: 'unavailable-date',
    },
  ];

  return (
    <div>
      <style>{`
        .unavailable-date {
          background-color: red;
          color: white;
        }
      `}</style>
      <h2>Unavailable Dates:</h2>

      {/* Show the "Select" button */}
      <div>
        <Button variant="contained" onClick={handleSelectClick}>
          Select
        </Button>
      </div>

      {/* Show the MUI dialog when showDatePicker is true */}
      <Dialog
        open={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        sx={{
          '& .MuiDialog-paper': {
            maxWidth: '600px', // Increase the width of the dialog box
            maxHeight: '80%', // Increase the height of the dialog box
          },
        }}
      >
        <DialogContent>
          <h3>Exam Instructions:</h3>
          <p>
            Sit for placement test is mandatory. According to the result of placement test, courses are allocated.
            The placement test is held only every Monday, Wednesday, and Friday.
          </p>
          {/* Show the "Pick a Date" button */}
          <Button variant="contained" onClick={() => setShowDatePicker(true)}>
            Pick a Date
          </Button>
          {/* Show the date picker when showDatePicker is true */}
          {showDatePicker && (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              excludeDates={unavailableDates}
              minDate={new Date()} // Block past dates
              highlightDates={highlightUnavailableDates} // Highlight unavailable dates in red
              filterDate={filterWeekDays} // Allow selection only for Mondays, Wednesdays, and Fridays
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Display the selected date when it's not null */}
      {selectedDate !== null && <p>You picked: {selectedDate.toLocaleDateString()}</p>}
    </div>
  );
};

export default UnavailableDates;













