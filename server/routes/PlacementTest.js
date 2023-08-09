const express = require ('express')
const router = express.Router()
const {ExamDetails,PlacementTestAvailability} = require("../models");

//******************************Select and schedule placementtest date***************************** */
// router.post("/", async (req, res) => {
//     try {
//       const { date, examId } = req.body;
  
//       // Find the ExamDetails associated with the provided examId
//       const examDetails = await ExamDetails.findByPk(examId);
  
//       if (!examDetails) {
//         return res.status(404).json({ error: "Exam not found" });
//       }
  
//       // Check if the date already has an availability record
//       let availability = await PlacementTestAvailability.findOne({
//         where: { date, examId },
//       });
  
//       //...
//     if (availability) {
//       // If the date already has an availability, increment the StudentsCount by 1
//       if (availability.studentsCount >= examDetails.maxStudents - 1) {
//         // If StudentsCount is already equal to or greater than maxStudents - 1, set Availability to false
//         availability.Availability = false;
//       }
//       availability.studentsCount++;
//       await availability.save();
//     }
//     //...
//     else {
//         // If the date does not have an availability, create a new record
//         availability = await PlacementTestAvailability.create({
//           date,
//           examId,
//           studentsCount: 1,
//           Availability: true,
//         });
//       }
  
//       return res.status(201).json({ message: "Availability added successfully", availability });
//     } catch (error) {
//       console.error("Error adding availability:", error);
//       return res.status(500).json({ error: "Error adding availability" });
//     }
//   });

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
  module.exports = router;

  
  
  
  
  
  


