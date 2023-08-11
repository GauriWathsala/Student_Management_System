

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function SchedulePT() {
//   const [data, setData] = useState([]);
//   const { availabilityId } = useParams();

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get('http://localhost:3001/placementTest/schedule-placement-tests');
//         const filteredData = response.data.filter(item => item.availabilityId === parseInt(availabilityId));
//         setData(filteredData);
//       } catch (error) {
//         console.error('An error occurred:', error);
//       }
//     }

//     fetchData();
//   }, [availabilityId]);

//   return (
//     <div>
//       <h1>Schedule for Availability ID: {availabilityId}</h1>
//       <ul>
//         {data.map(item => (
//           <li key={item.stuId}>
//             <p>Student ID: {item.stuId}</p>
//             <p>Status: {item.state}</p>
//             <p>Marks: {item.marks === null ? 'N/A' : item.marks}</p>
           
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default SchedulePT;












// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function SchedulePT() {
//   const [data, setData] = useState([]);
//   const [editingItem, setEditingItem] = useState(null); // Store the item being edited
//   const { availabilityId } = useParams();

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get('http://localhost:3001/placementTest/schedule-placement-tests');
//         const filteredData = response.data.filter(item => item.availabilityId === parseInt(availabilityId));
//         setData(filteredData);
//       } catch (error) {
//         console.error('An error occurred:', error);
//       }
//     }

//     fetchData();
//   }, [availabilityId]);

//   const handleEdit = item => {
//     setEditingItem(item); // Set the item to be edited
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       await axios.put(`http://localhost:3001/placementTest/schedule-placement-tests/${editingItem.stuId}`, {
//         marks: editingItem.marks,
//         state: editingItem.state,
//       });

//       // Update the data locally to reflect the changes
//       setData(prevData =>
//         prevData.map(item => (item.stuId === editingItem.stuId ? { ...item, marks: editingItem.marks, state: editingItem.state } : item))
//       );

//       // Close the popup
//       setEditingItem(null);
//     } catch (error) {
//       console.error('An error occurred while updating:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Schedule for Availability ID: {availabilityId}</h1>
//       <table>
//          <thead>
//            <tr>
//              <th>Student ID</th>
//              <th>Status</th>
//              <th>Marks</th>
//              <th>Edit</th>
//            </tr>
//          </thead>
//         <tbody>
//           {data.map(item => (
//             <tr key={item.stuId}>
//               <td>{item.stuId}</td>
//               <td>{item.state}</td>
//               <td>{item.marks === null ? 'N/A' : item.marks}</td>
//               <td>
//                 <button onClick={() => handleEdit(item)}>Edit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Popup Form */}
//       {editingItem && (
//         <div className="popup">
//           <div className="popup-content">
//             <h2>Edit Details</h2>
//             <form onSubmit={handleFormSubmit}>
//               <label>
//                 Status:
//                 <select value={editingItem.state} onChange={e => setEditingItem(prevItem => ({ ...prevItem, state: e.target.value }))}>
//                   <option value="Faced">Faced</option>
//                   <option value="Not Face">Not Face</option>
//                 </select>
//               </label>
//               <label>
//                 Marks:
//                 <input type="number" value={editingItem.marks || ''} onChange={e => setEditingItem(prevItem => ({ ...prevItem, marks: e.target.value }))} />
//               </label>
//               <button type="submit">Update</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SchedulePT;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';

// function SchedulePT() {
//   const [data, setData] = useState([]);
//   const [editingItem, setEditingItem] = useState(null);
//   const { availabilityId } = useParams();
//   const [open, setOpen] = useState(false); // Dialog open state

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get('http://localhost:3001/placementTest/schedule-placement-tests');
//         const filteredData = response.data.filter(item => item.availabilityId === parseInt(availabilityId));
//         setData(filteredData);
//       } catch (error) {
//         console.error('An error occurred:', error);
//       }
//     }

//     fetchData();
//   }, [availabilityId]);

//   const handleEdit = item => {
//     setEditingItem(item);
//     setOpen(true); // Open the dialog
//   };

//   const handleFormSubmit = async () => {
//     try {
//       await axios.put(`http://localhost:3001/placementTest/schedule-placement-tests/${editingItem.stuId}`, {
//         marks: editingItem.marks,
//         state: editingItem.state,
//       });

//       // Update the data locally to reflect the changes
//       setData(prevData =>
//         prevData.map(item => (item.stuId === editingItem.stuId ? { ...item, marks: editingItem.marks, state: editingItem.state } : item))
//       );

//       // Close the dialog
//       setOpen(false);
//       setEditingItem(null);
//     } catch (error) {
//       console.error('An error occurred while updating:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Schedule for Availability ID: {availabilityId}</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Student ID</th>
//             <th>Status</th>
//             <th>Marks</th>
//             <th>Edit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map(item => (
//             <tr key={item.stuId}>
//               <td>{item.stuId}</td>
//               <td>{item.state}</td>
//               <td>{item.marks === null ? 'N/A' : item.marks}</td>
//               <td>
//                 <button onClick={() => handleEdit(item)}>Edit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Dialog */}
//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Edit Details</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleFormSubmit}>
//             <div>
//               <label>Status:</label>
//               <Select value={editingItem?.state || ''} onChange={e => setEditingItem(prevItem => ({ ...prevItem, state: e.target.value }))}>
//                 <MenuItem value="Faced">Faced</MenuItem>
//                 <MenuItem value="Not Face">Not Face</MenuItem>
//               </Select>
//             </div>
//             <div>
//               <label>Marks:</label>
//               <TextField type="number" value={editingItem?.marks || ''} onChange={e => setEditingItem(prevItem => ({ ...prevItem, marks: e.target.value }))} />
//             </div>
//           </form>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button onClick={handleFormSubmit}>Update</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default SchedulePT;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

function SchedulePT() {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const { availabilityId } = useParams();
  const [open, setOpen] = useState(false); // Dialog open state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/placementTest/schedule-placement-tests');
        const filteredData = response.data.filter(item => item.availabilityId === parseInt(availabilityId));
        setData(filteredData);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    fetchData();
  }, [availabilityId]);

  const handleEdit = item => {
    setEditingItem(item);
    setOpen(true); // Open the dialog
  };

  const handleFormSubmit = async () => {
    try {
      await axios.put(`http://localhost:3001/placementTest/schedule-placement-tests/${editingItem.stuId}`, {
        marks: editingItem.marks,
        state: editingItem.state,
      });

      // Update the data locally to reflect the changes
      setData(prevData =>
        prevData.map(item => (item.stuId === editingItem.stuId ? { ...item, marks: editingItem.marks, state: editingItem.state } : item))
      );

      // Close the dialog
      setOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('An error occurred while updating:', error);
    }
  };

  return (
    <div>
      <h1>Schedule for Availability ID: {availabilityId}</h1>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Status</th>
            <th>Marks</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.stuId}>
              <td>{item.stuId}</td>
              <td>{item.state}</td>
              <td>{item.marks === null ? 'N/A' : item.marks}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Status:</label>
              <Select value={editingItem?.state || ''} onChange={e => setEditingItem(prevItem => ({ ...prevItem, state: e.target.value }))}>
                <MenuItem value="Faced">Faced</MenuItem>
                <MenuItem value="Not Face">Not Face</MenuItem>
              </Select>
            </div>
            {editingItem?.state === 'Faced' && (
              <div>
                <label>Marks:</label>
                <TextField type="number" value={editingItem?.marks || ''} onChange={e => setEditingItem(prevItem => ({ ...prevItem, marks: e.target.value }))} />
              </div>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleFormSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SchedulePT;
