import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import CourseDetails from "./CourseDetails";
import { AuthContext } from "../../helpers/AuthContext";
import Welcomeheader from "../../Components/Registration/Welcomeheader";
import Exams from "./Exams";
import PlacementTestDate from "./PlacementTestDate";
import './unavailabledates.scss'
import Sidebar from '../../Components/Sidebar/Sidebar';

const UnavailableDates = () => {
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [examResults, setExamResults] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [showScheduleButton, setShowScheduleButton] = useState(true); 
  const [showPickDateButton, setShowPickDateButton] = useState(true);
  const { authState } = useContext(AuthContext);
  const userRole = authState.role;

  useEffect(() => {
    axios
      .get("http://localhost:3001/placementTest")
      .then((response) => {
        const filteredDates = response.data.filter(
          (test) => !test.availability
        );
        const convertedDates = filteredDates.map((test) => new Date(test.date));
        setUnavailableDates(convertedDates);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://localhost:3001/placementTest/schedule-placement-tests")
      .then((response) => {
        setExamResults(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exam results data:", error);
      });
  }, []);

  const handleSchedulePlacementTest = async () => {
    if (selectedDate) {
      try {
        const response = await axios.post(
          "http://localhost:3001/placementTest",
          {
            date: selectedDate,
            examId: "P2266", // Replace with the actual examId
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );
        alert("Placement Test Scheduled Successfully.!");
        setShowScheduleButton(false); 
        console.log(response.data);
        setCourseId(response.data.courseId);
      } catch (error) {
        console.error("Error scheduling placement test:", error);
      }
    }
  };

  const handleSelectClick = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    return (
      unavailableDates.some(
        (test) => test.toDateString() === date.toDateString()
      ) || date < today
    );
  };

  const filterWeekDays = (date) => {
    return date.getDay() === 1 || date.getDay() === 3 || date.getDay() === 5;
  };

  const highlightUnavailableDates = [
    {
      dates: unavailableDates,
      className: "unavailable-date",
    },
  ];

  const hasValidExamResult = examResults.some(
    (result) =>
      result.stuId === authState.username &&
      result.state === "Faced" &&
      result.marks !== null
  );

  return (
    <div >
      <Welcomeheader />
      <div className="student-portal">
      <Sidebar />
      <style>{`
        .unavailable-date {
          background-color: red;
          color: white;
        }
      `}</style>
      <div className="student-portal-content">
      {userRole === ' Student' && <h1 id="main-head">STUDENT PORTAL</h1>}

      {examResults.some((result) => result.stuId === authState.username) ? (
        examResults.some((result) => result.stuId === authState.username && result.state === "Faced") ? ( null  ) : (
        <p> <PlacementTestDate /> </p>
        )
      ) : (
        <div>
          
          <h2> Welcome to Gifted Education!</h2>
          <div className="placement-test-details">
          <p>Newly enrolled students must appear for the placement test. <br/>The test is held every Monday, Wednesday and Friday of the week <br/>
          Only a limited number of students have to appear on one day so you have to reserve an available date. <br/>
          We will recommend the most suitable course for you according to the marks obtained from it. 
          </p> <br/> <p id="happy-msg">HAPPY LEARNING WITH GIFTED EDUCATION...!!! </p>
        </div>
         
          {showPickDateButton && selectedDate === null && showScheduleButton && (
        <Button variant="contained" onClick={handleSelectClick}>
          PICK A DATE
        </Button>
      )}
     
        </div>
      )}

      <Dialog
        open={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "100%",
            maxHeight: "200px",
          },
        }}
      >
        <DialogContent>
          {showDatePicker && (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              excludeDates={unavailableDates}
              minDate={new Date()}
              highlightDates={highlightUnavailableDates}
              filterDate={filterWeekDays}
              className="custom-datepicker"
            />
          )}
        </DialogContent>
      </Dialog>

      {selectedDate !== null && (
        <p>You picked: {selectedDate.toLocaleDateString()}</p>
      )}


      {selectedDate !== null && showScheduleButton && !examResults.some((result) => result.stuId === authState.username) && (
        <Button variant="contained" onClick={handleSchedulePlacementTest}>
          Schedule Placement Test
        </Button>
      )}

      <div>
      
        <h2>Placement Test Resules</h2>
        {/* <label> Student ID : {authState.username}</label> */}
        {examResults.some((result) => result.stuId === authState.username) ? (
          <ul>
            {examResults
              .filter((result) => result.stuId === authState.username) 
              .map((result) => (
                <li key={result.availabilityId}>
                  Status: {result.state}, Marks: {result.marks}
                  {hasValidExamResult && (
                    <CourseDetails studentMarks={result.marks} />
                  )}
                </li>
              ))}
          </ul>
        ) : (
          <p>No exam results available for the logged-in user.</p>
        )}
      </div>
      </div>
      </div>
    </div>
  );
};

export default UnavailableDates;
