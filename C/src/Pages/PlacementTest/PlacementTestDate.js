import React , {useContext, useEffect, useState} from 'react'
import { AuthContext } from "../../helpers/AuthContext";
import axios from 'axios';

const PlacementTestDate = () => {

    const { authState } = useContext(AuthContext);
    const [availabilityId, setAvailabilityId] = useState([]);
    const [availabilityData, setAvailabilityData] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        axios.get('http://localhost:3001/placementTest/schedule-placement-tests', {
          headers: {
            Authorization: `Bearer ${authState.token}` // Assuming you have a token in your authState
          }
        })
        .then(response => {
          // Filter availability IDs for the logged-in user
          const userAvailabilityIds = response.data
            .filter(test => test.stuId === authState.username)
            .map(test => test.availabilityId);
          
          setAvailabilityId(userAvailabilityIds);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

        axios.get('http://localhost:3001/placementTest', {
            headers: {
              Authorization: `Bearer ${authState.token}` // Assuming you have a token in your authState
            }
          })
          .then(response => {
            setAvailabilityData(response.data);
          })
          .catch(error => {
            console.error('Error fetching availability data:', error);
          });
      }, [authState.token, authState.username]);


  return (
    <div>
      
      <ul>
       
        {availabilityId.map(id => (
          <li key={id}>
          
          Placement Test is scheduled on {availabilityData.find(item => item.availabilityId === id)?.date || 'Not found'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlacementTestDate