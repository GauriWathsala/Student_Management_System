const express = require ('express')
const router = express.Router()
const {ExamDetails} = require("../models");


// Function to generate random numbers
function generateRandomNumbers(length) {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }


  //***************************Retrieve Exam Details**********************************
router.get("/", async(req,res) => {
    try {
        const listOfExams= await ExamDetails.findAll({});
        res.json(listOfExams);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
 });


 
//************************************Add New Exam********************************* */

router.post('/', async (req, res) => {
    try {
      const { examName, duration, examType, maxStudents } = req.body;
  
      // Generate the examId based on examType
      let examIdPrefix = '';
      switch (examType) {
        case 'Placement Test':
          examIdPrefix = 'P';
          break;
        case 'Mock Exam':
          examIdPrefix = 'M';
          break;
        case 'In-class Test':
          examIdPrefix = 'I';
          break;
        case 'Final Exam':
          examIdPrefix = 'F';
          break;
        case 'Mid Exam':
          examIdPrefix = 'D';
          break;
        default:
          examIdPrefix = 'O'; 
      }
  

      const examIdSuffix = generateRandomNumbers(4); 
      const examId = examIdPrefix + examIdSuffix;
  
     
      const exam = await ExamDetails.create({
        examId,
        examName,
        duration,
        examType,
        maxStudents,
      });
  
      return res.status(201).json({ message: 'Exam created successfully', exam });
    } catch (error) {
      console.error('Error creating exam:', error);
      return res.status(500).json({ error: 'Error creating exam' });
    }
  });


  
//********************************Delete Exam**************************************
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await ExamDetails.destroy({ where: { examId: id } });
      res.json({ message: 'Exam deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});
  
  module.exports = router;

  
  
  
  
  
  


