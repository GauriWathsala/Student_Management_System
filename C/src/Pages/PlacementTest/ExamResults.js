import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../helpers/AuthContext";
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const ExamResults = ({ courseId }) => {
    const { authState } = useContext(AuthContext);
    const [examMarks, setExamMarks] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        // Fetch exam marks for the logged-in student
        axios.get('http://localhost:3001/scheduleExam/student-schedule-exams')
        .then(response => {
            const filteredMarks = response.data.filter(mark => mark.stuId === authState.username && mark.scheduleId === courseId);
            setExamMarks(filteredMarks);
        })
        .catch(error => {
            console.error("Error fetching exam marks:", error);
        });
    }, [authState.stuId]);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleOpenDialog}>
                Open Exam Results
            </Button>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
                <DialogTitle>Exam Marks</DialogTitle>
                <DialogContent>
        {examMarks.length === 0 ? (
            <p>Exam marks Not Released Yet</p>
        ) : (
            <table>
                <thead>
                    <tr>
                        <th>Module ID</th>
                        <th>Status</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {examMarks.map(mark => (
                        <tr key={mark.Id}>
                            <td>{mark.moduleId}</td>
                            <td>{mark.status}</td>
                            <td>{mark.marks !== null ? mark.marks : "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ExamResults;
