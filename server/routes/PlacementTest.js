const express = require ('express')
const router = express.Router()
const {ExamDetails,PlacementTestAvailability,Student,SchedulePlacementTest} = require("../models");
const {validateToken} =  require ("../middlewares/AuthMiddleware");

//******************************Select and schedule placementtest date***************************** */

router.post("/", validateToken, async (req, res) => {

  const usrnm = req.user.username
  const usrd = req.user.id
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

//****Insert data in Schedule Placement Test Table************/
    await SchedulePlacementTest.create({
      stuId: usrnm,
      availabilityId: availability.availabilityId,
      marks: null,
      state: 'Not Face',
    });

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




//***************************Edit Marks and State for a Placement Test***************************/

router.put('/schedule-placement-tests/:stuId', async(req,res) => {
const { stuId } = req.params;
const { marks, state } = req.body;

try {
  // Find the existing record by availabilityId and stuId
  const placementTest = await SchedulePlacementTest.findOne({
    where: {
     stuId,
    },
  });

  if (!placementTest) {
    return res.status(404).json({ error: "Placement test not found for the specified student and availability." });
  }

  // Update only the marks and state columns
  placementTest.marks = marks;
  placementTest.state = state;

  // Save the updated record
  await placementTest.save();

  return res.status(200).json(placementTest);
} catch (error) {
  console.error(error);
  return res.status(500).json({ error: "An error occurred while updating the placement test." });
}
});


//****************************Retrieve marks and status of a specific student*******************/

router.get('/schedule-placement-tests/:stuId', async (req, res) => {
  const { stuId } = req.params;

  try {
    const scheduledPlacementTest = await SchedulePlacementTest.findOne({
      where: { stuId },
      attributes: ['marks', 'state'],
    });

    if (!scheduledPlacementTest) {
      return res.status(404).json({ error: "Scheduled placement test not found for the specified student." });
    }

    res.json(scheduledPlacementTest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


//***************Retievemarks and status from the access Token****************************************/
router.get("/marks-and-state", validateToken, async (req, res) => {
  const stuId = req.user.username; // Use the stuId from the access token

  try {
    // Find the placement test record for the logged-in student
    const placementTestRecord = await SchedulePlacementTest.findOne({
      where: { stuId },
    });

    if (!placementTestRecord) {
      return res.status(404).json({ error: "Placement test record not found for the user" });
    }

    // Send marks and state information
    const { marks, state } = placementTestRecord;
    return res.status(200).json({ marks, state });
  } catch (error) {
    console.error("Error retrieving marks and state:", error);
    return res.status(500).json({ error: "Error retrieving marks and state" });
  }
});




  module.exports = router;

  
  
  
  
  
  


