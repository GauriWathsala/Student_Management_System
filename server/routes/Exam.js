const express = require('express');
const router = express.Router();
const { ExamDetails, ScheduleExam, Result } = require('../models');

// Route to schedule an exam
router.post('/schedule-exam', async (req, res) => {
  try {
    const { examId, date, startTime } = req.body;

    // Fetch the exam details to get the duration
    const exam = await ExamDetails.findOne({
      where: { examId },
    });

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Calculate the end time based on the duration
    const duration = exam.duration;
    const durationParts = duration.split(':');
    const hours = parseInt(durationParts[0]);
    const minutes = parseInt(durationParts[1]);
    const startTimeParts = startTime.split(':');
    const startHours = parseInt(startTimeParts[0]);
    const startMinutes = parseInt(startTimeParts[1]);

    const totalMinutes = hours * 60 + minutes;
    const totalStartMinutes = startHours * 60 + startMinutes;
    const totalEndMinutes = totalStartMinutes + totalMinutes;

    const endHours = Math.floor(totalEndMinutes / 60);
    const endMinutes = totalEndMinutes % 60;

    const endTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;

    // Create the scheduled exam record
    const scheduledExam = await ScheduleExam.create({
      examId,
      date,
      startTime,
      endTime,
      status: 'Scheduled',
    });

    res.json(scheduledExam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Route to add exam results
router.post('/add-result', async (req, res) => {
    try {
      const { examId, marks, noAttempts } = req.body;
  
      // Fetch the exam details to check if the exam exists
      const exam = await ExamDetails.findOne({
        where: { examId },
      });
  
      if (!exam) {
        return res.status(404).json({ error: 'Exam not found' });
      }
  
      // Create the result record
      const result = await Result.create({
        examId,
        marks,
        noAttempts,
      });
  
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
 // Route to retrieve all results for a specific exam
router.get('/results/:examId', async (req, res) => {
    try {
      const { examId } = req.params;
  
      // Find all results associated with the specified examId
      const results = await Result.findAll({
        where: { examId },
      });
  
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Route to retrieve the details of a scheduled exam
router.get('/scheduled-exam/:examId', async (req, res) => {
    try {
      const { examId } = req.params;
  
      // Find the scheduled exam details associated with the specified examId
      const scheduledExam = await ScheduleExam.findOne({
        where: { examId },
      });
  
      res.json(scheduledExam);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  
// Route to get all the exams scheduled for a specific ExamDetails record
router.get('/exams/:examDetailsId', async (req, res) => {
    try {
      const { examDetailsId } = req.params;
  
      // Find the ExamDetails record and include the scheduled exams using the exams association
      const examDetails = await ExamDetails.findByPk(examDetailsId, {
        include: {
          model: ScheduleExam,
          as: 'exams',
        },
      });
  
      if (!examDetails) {
        return res.status(404).json({ error: 'ExamDetails not found' });
      }
  
      res.json(examDetails.exams);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Route to update a scheduled exam
router.put('/update-schedule-exam/:sId', async (req, res) => {
    try {
      const { sId } = req.params;
      const { date, startTime, status } = req.body;
  
      // Find the scheduled exam by sId
      const scheduledExam = await ScheduleExam.findByPk(sId);
  
      if (!scheduledExam) {
        return res.status(404).json({ error: 'Scheduled exam not found' });
      }
  
      // Update the scheduled exam properties
      scheduledExam.date = date;
      scheduledExam.startTime = startTime;
      scheduledExam.status = status;
      
      // Save the updated scheduled exam
      await scheduledExam.save();
  
      res.json(scheduledExam);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Route to update a result
router.put('/update-result/:resultId', async (req, res) => {
    try {
      const { resultId } = req.params;
      const { Marks, noAttempts } = req.body;
  
      // Find the result by resultId
      const result = await Result.findByPk(resultId);
  
      if (!result) {
        return res.status(404).json({ error: 'Result not found' });
      }
  
      // Update the result properties
      result.Marks = Marks;
      result.noAttempts = noAttempts;
  
      // Save the updated result
      await result.save();
  
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Route to update an exam detail
router.put('/update-exam-details/:examId', async (req, res) => {
    try {
      const { examId } = req.params;
      const { examName, duration, examType } = req.body;
  
      // Find the exam detail by examId
      const examDetail = await ExamDetails.findByPk(examId);
  
      if (!examDetail) {
        return res.status(404).json({ error: 'Exam detail not found' });
      }
  
      // Update the exam detail properties
      examDetail.examName = examName;
      examDetail.duration = duration;
      examDetail.examType = examType;
  
      // Save the updated exam detail
      await examDetail.save();
  
      res.json(examDetail);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Route to add a new exam
router.post('/add-exam', async (req, res) => {
    try {
      const { examName, duration, examType } = req.body;
  
      // Create a new exam record
      const newExam = await ExamDetails.create({
        examName,
        duration,
        examType,
      });
  
      res.json(newExam);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;
