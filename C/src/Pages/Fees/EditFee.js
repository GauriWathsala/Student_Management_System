import React, { useEffect, useState }  from 'react'
import { TextField } from "@mui/material";
import axios from "axios";
import './editfee.scss'

const EditFee = ({ feeId, onClose }) => {

    const [feeDetails, setFeeDetails] = useState({
        feeId: "",
        feeType: "",
        amount: "",
      });

      useEffect(() => {
        // Fetch the fee details using the provided API endpoint
        axios
          .get(`http://localhost:3001/fees/${feeId}`)
          .then((response) => {
            setFeeDetails(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [feeId]);
    
      const handleSave = () => {
        axios
          .put(`http://localhost:3001/fees/${feeId}`, feeDetails)
          .then((response) => {
            console.log("Updated Fee Details:",response.feeDetails);
            onClose(); 
          })
          .catch((error) => {
            console.error(error);
          });
      };

  return (
    <div className='editFee'>
        <div className='fee-name-id'>
        <TextField
        label="Fee ID"
        className="text-fields"
        name="feeId"
        size="small"
        disabled
        value={feeDetails.feeId}
        />
          <TextField
        label="Name"
        className="text-fields"
        name="feeType"
        size="small"
        disabled
        id='fee-type'
        value={feeDetails.feeType}
        />
        </div>
        <div className='fee-amount'>
        <TextField
        label="Amount"
        className="text-fields"
        name="amount"
        size="small"
        value={feeDetails.amount}
        onChange={(e) =>
            setFeeDetails({ ...feeDetails, amount: e.target.value })
          }
        />
        </div>
        <div className="button-container">
        <button onClick={handleSave}>Save</button>
      </div>
        </div>
  )
}

export default EditFee