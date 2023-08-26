const express = require('express');
const router = express.Router();
const { ScheduleExam, StudentScheduleExams, Course, Module, Student } = require('../models');

router.get('/', async (req, res) => {
    try {
        const scheduleExams = await ScheduleExam.findAll({});
        res.json(scheduleExams);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/', async (req, res) => {
    try {
        const { date, duration, startTime, status, courseId } = req.body;

        const newScheduleExam = await ScheduleExam.create({
            date,
            duration,
            startTime,
            status,
            courseId,
        });

        res.status(201).json(newScheduleExam);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/student-schedule-exams', async (req, res) => {
    try {
        const studentScheduleExams = await StudentScheduleExams.findAll({});
        res.json(studentScheduleExams);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// router.post('/student-schedule-exams', async (req, res) => {
//     try {
//         const { status, marks, moduleId, scheduleId, stuId } = req.body;

//         const newStudentScheduleExam = await StudentScheduleExams.create({
//             status,
//             marks,
//             moduleId,
//             scheduleId,
//             stuId,
//         });

//         res.status(201).json(newStudentScheduleExam);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });



router.put('/:id', async (req, res) => {
    try {
        const examId = req.params.id;  // Get the exam ID from the URL parameter
       
        const { status } = req.body;

        // Find the scheduled exam by ID
        const existingScheduleExam = await ScheduleExam.findByPk(examId);

        if (!existingScheduleExam) {
            return res.status(404).json({ error: 'Scheduled exam not found' });
        }

       
        existingScheduleExam.status = status;
       

        // Save the updated exam details
        await existingScheduleExam.save();

        res.status(200).json(existingScheduleExam);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Update marks and status of a specific student's module exam
router.put('/student-schedule-exams/:stuId/:moduleId', async (req, res) => {
    try {
        const { stuId, moduleId } = req.params;  // Get student ID and module ID from URL parameters
        const { status, marks } = req.body;

        // Find the student's scheduled exam for the specific module
        const existingStudentScheduleExam = await StudentScheduleExams.findOne({
            where: {
                stuId: stuId,
                moduleId: moduleId
            }
        });

        if (!existingStudentScheduleExam) {
            return res.status(404).json({ error: 'Student scheduled exam not found' });
        }

        // Update status and marks
        existingStudentScheduleExam.status = status;
        existingStudentScheduleExam.marks = marks;

        // Save the updated student scheduled exam details
        await existingStudentScheduleExam.save();

        res.status(200).json(existingStudentScheduleExam);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Update marks and status of a specific student's module exam
router.put('/student-schedule-exams/:stuId/:moduleId/:scheduleId', async (req, res) => {
    try {
        const { stuId, moduleId , scheduleId} = req.params;  // Get student ID and module ID from URL parameters
        const { status, marks } = req.body;
       

        // Find the student's scheduled exam for the specific module
        const existingStudentScheduleExam = await StudentScheduleExams.findOne({
            where: {
                stuId: stuId,
                moduleId: moduleId,
                scheduleId : scheduleId
            }
        });

        if (!existingStudentScheduleExam) {
            return res.status(404).json({ error: 'Student scheduled exam not found' });
        }

        // Update status and marks
        existingStudentScheduleExam.status = status;
        existingStudentScheduleExam.marks = marks;

        // Save the updated student scheduled exam details
        await existingStudentScheduleExam.save();

        res.status(200).json(existingStudentScheduleExam);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;