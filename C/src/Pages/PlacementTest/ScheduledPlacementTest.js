
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SchedulePT from './SchedulePT'; 
import { Link } from 'react-router-dom';
import { DbHeader } from '../../Components/DbHeader/DbHeader'
import './ScheduledPlacementTest.scss'

const ScheduledPlacementTest = () => {
  const [placementTests, setPlacementTests] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/placementTest')
      .then(response => setPlacementTests(response.data))
      .catch(error => console.error('Error fetching placement tests:', error));
  }, []);

  const handleViewClick = (availabilityId) => {
    setSelectedTestId(availabilityId);
  };

  return (
    <div>
      <DbHeader /> 
      <h1 id='place-tets-title'>Scheduled Placement Tests</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Start Time</th>
            <th>Students Count</th>
            <th>Availability</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {placementTests.map(test => (
            <tr key={test.availabilityId}>
              <td>{test.availabilityId}</td>
              <td>{test.date}</td>
              <td>{test.startTime}</td>
              <td>{test.studentsCount}</td>
              <td>{test.availability ? 'True' : 'False'}</td>
              <td>
        <Link to={`/schedule/${test.availabilityId}`}>
            <button>VIEW</button>
         </Link>
        </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduledPlacementTest;
