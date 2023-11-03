import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import EditFee from "./EditFee";
import './rgfee.scss';
import AddFee from "./AddFee";
import { AuthContext } from "../../helpers/AuthContext";



const FeeList = () => {
    const [fees, setFees] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedFeeId, setSelectedFeeId] = useState(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const { authState } = useContext(AuthContext);
    const userRole = authState.role;
  
    useEffect(() => {
    
      axios
        .get("http://localhost:3001/fees")
        .then((response) => {
          setFees(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);


    const handleEdit = (feeId) => {
      setSelectedFeeId(feeId);
      setEditDialogOpen(true);
        console.log("Edit button clicked for Fee ID:", feeId);
      };

      const handleAdd = () => {
        setAddDialogOpen(true);
        console.log("Add button clicked");
      };

      const handleClose = () => {
        setEditDialogOpen(false);
        setAddDialogOpen(false);
      };
  
    return (
      <div className="rgfee">
        <div className="fee-heading">
        <h2 id="fee-title">Fee List</h2>
        {userRole === ' Admin' && <Button id="add-fee" onClick={handleAdd}> ADD </Button>}
        </div>
        <div className="fee-table">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fee ID</TableCell>
                <TableCell>Fee Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fees.map((fee) => (
                <TableRow key={fee.feeId}>
                  <TableCell>{fee.feeId}</TableCell>
                  <TableCell>{fee.feeType}</TableCell>
                  <TableCell>{fee.amount}</TableCell>
                  <TableCell>
                  {userRole === ' Admin' && <Button variant="contained" color="primary" onClick={() => handleEdit(fee.feeId)}>Edit</Button>}
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>

  {/* Dialog for editing fee */}
  <Dialog open={editDialogOpen} onClose={handleClose}>
        <DialogTitle>Edit Fee</DialogTitle>
        <DialogContent>
          <EditFee feeId={selectedFeeId} onClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
     
        </DialogActions>
      </Dialog>


      {/* Dialog for adding fee */}
      <Dialog open={addDialogOpen} onClose={handleClose}>
          <DialogTitle>Add Fee</DialogTitle>
          <DialogContent>
            <AddFee onClose={handleClose} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  };
  
  export default FeeList;
  

