import React from 'react'
import { TextField } from "@mui/material";
import axios from "axios";

const AddFee = ({ onClose }) => {

    const [newFee, setNewFee] = React.useState({
        feeType: '',
        amount: '',
      });

      const handleSave = () =>{
        axios.post('http://localhost:3001/fees', newFee)
        .then((response) => {
            console.log("New Fee Details:" , response.data);
            onClose();
        }).catch ((error) => {
            console.error(error)
        })
      }

  return (
    <div className='add-fee'>
         <TextField
        label="Fee Type"
        className="text-fields"
        name="feeType"
        size="small"
        value={newFee.feeType}
        onChange={(e) => setNewFee({ ...newFee, feeType: e.target.value })}
    />
          <TextField
        label="Amount"
        className="text-fields"
        name="feeamount"
        size="small"
        id='feeAmount'
        value={newFee.amount}
        onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
       />
     <div className="button-container">
         <button onClick={handleSave}>Save</button>
      </div>

    </div>
  )
}

export default AddFee