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




import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        setUnavailableDates(filteredDates);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSelectClick = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = e => {
    setSelectedDate(e.target.valueAsDate);
    setShowDatePicker(false); // Hide the date picker after selecting a date
  };

  return (
    <div>
      <h2>Unavailable Dates:</h2>
      <p>Piccu baba</p>
      {unavailableDates.length > 0 ? (
        <ul>
          {unavailableDates.map(test => (
            <li key={test.availabilityId}>{test.date}</li>
          ))}
        </ul>
      ) : (
        <p>No unavailable dates found.</p>
      )}

      {/* Show the date picker when clicking "Select" button */}
      <div>
        {!showDatePicker && (
          <button onClick={handleSelectClick}>Select</button>
        )}
        {showDatePicker && (
          <input
            type="date"
            value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ''}
            onChange={handleDateChange}
          />
        )}
      </div>

      {/* Display the selected date when it's not null */}
      {selectedDate !== null && <p>You picked: {selectedDate.toLocaleDateString()}</p>}
    </div>
  );
};

export default UnavailableDates;



