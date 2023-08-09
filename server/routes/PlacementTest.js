const express = require ('express')
const router = express.Router()
const {ExamDetails,PlacementTestAvailability,Student,SchedulePlacementTest} = require("../models");

//******************************Select and schedule placementtest date***************************** */

router.post("/", async (req, res) => {
  try {
    const { date, examId } = req.body;

    // Find the ExamDetails associated with the provided examId
    const examDetails = await ExamDetails.findByPk(examId);

    if (!examDetails) {
      return res.status(404).json({ error: "Exam not found" });
    }

    // Check if the date already has an availability record
    let availability = await PlacementTestAvailability.findOne({
      where: { date, examId },
    });

    if (availability) {
      // If the date already has an availability, check if it is available
      if (availability.availability) {
        // Increment the StudentsCount by 1
        if (availability.studentsCount >= examDetails.maxStudents - 1) {
          // If StudentsCount is already equal to or greater than maxStudents - 1, set Availability to false
          availability.availability = false;
        }
        availability.studentsCount++;
        await availability.save();
      } else {
        return res.status(400).json({ error: "The selected date is not available" });
      }
    } else {
      // If the date does not have an availability, create a new record
      availability = await PlacementTestAvailability.create({
        date,
        examId,
        studentsCount: 1,
        availability: true, // Changed 'Availability' to 'availability'
      });
    }

    return res.status(201).json({ message: "Availability added successfully", availability });
  } catch (error) {
    console.error("Error adding availability:", error);
    return res.status(500).json({ error: "Error adding availability" });
  }
});


  //****************************Retrieve placement test details******************************* */
  
  router.get("/", async(req,res) => {
    try {
        const listOfplacementTests= await PlacementTestAvailability.findAll({ });
        res.json(listOfplacementTests);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
 });


//***********************************Schedule a placement test with student******************** */

router.post("/schedule-placement-tests", async (req, res) => {
  try {
    const { stuId, availabilityId, state, marks } = req.body;

    // Check if the student and availability exist
    const student = await Student.findByPk(stuId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const availability = await PlacementTestAvailability.findByPk(availabilityId);
    if (!availability) {
      return res.status(404).json({ error: "Placement test availability not found" });
    }

    // Create a new SchedulePlacementTest record
    const newSchedulePlacementTest = await SchedulePlacementTest.create({
      stuId,
      availabilityId,
      state,
      marks,
    });

    res.status(201).json(newSchedulePlacementTest);
  } catch (error) {
    console.error("Error creating SchedulePlacementTest:", error);
    res.status(500).json({ error: "An error occurred while creating SchedulePlacementTest" });
  }
});


//****************************Retrieve Scheduled Placement Test Details************************/

router.get('/schedule-placement-tests', async(req,res) => {
  try {
      const listOfScheduledplacementTests= await SchedulePlacementTest.findAll({ });
      res.json(listOfScheduledplacementTests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});



  module.exports = router;

  
  
  
  
  
  


