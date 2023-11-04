
const express = require('express');
const router = express.Router();
const { Student,User } = require("../models");
const bcrypt = require("bcrypt") ; 
const { sendEmail } = require('./sendEmail')





function generateRandomNumbers(length) {
let result = '';
const characters = '0123456789';
for (let i = 0; i < length; i++) {
  const randomIndex = Math.floor(Math.random() * characters.length);
  result += characters.charAt(randomIndex);
}
return result;
}

// **************************************retrieve all student details*******************************
router.get('/', async (req, res) => {
try {
const students = await Student.findAll(); 
res.json(students);
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal Server Error' });
}
});

//*********************************Retrieve Specific student******************************** */

router.get("/:stuId", async (req, res) => {
try {
  const { stuId } = req.params;
  const studentDetails = await Student.findOne({
    where: { stuId },
    
  });

  if (!studentDetails) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json(studentDetails);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Server error" });
}
});

//****************************** */ POST a student*****************************************

router.post('/', async (req, res) =>{
try {
    const { firstname, lastname,fullname, address, nic, dob, email,contactNo , profession,gender, preference, country,requiredScore} = req.body;

    // Create teacher
    const  stuId = 'S' + generateRandomNumbers(6);
    const student = {
        stuId,firstname,lastname,fullname,address, nic, dob,email, contactNo , gender, preference, country,requiredScore,profession
    };
    const createdStudent = await Student.create(student);

    // Create associated user entry
  const user = {
  userId: createdStudent.stuId ,
  password : await bcrypt.hash(createdStudent.stuId, 10),
  username: createdStudent.stuId ,
  userType: ' Student',
};
await User.create(user);


const emailSubject = 'Welcome to Gifted Education - Registration Confirmation';
const emailBody = `Hello ${createdStudent.firstname},\n\n
We are thrilled to welcome you to Gifted Education! Your registration process is now complete, and we're excited to have you as part of our academic community.This email serves as confirmation of your successful registration. \n\n Here are some important details to help you get started: \n\n Student ID: ${createdStudent.stuId} \n Course: To enroll for course you need to face for a placement test. Please reserve a date for the placement test after you log in to the portal.
\n\nAccessing Your Student Portal: To access your course schedule, grades, and other important information, please log in to our student portal using the following credentials:\n\n Username: ${createdStudent.stuId}\n  Password: ${createdStudent.stuId} (You can change this any time as your wish.)`;
sendEmail(emailSubject, createdStudent.email, emailBody);



res.json(createdStudent);
} 
catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Server error' });
}

});

//***************************Edit Student Details************************************ */

router.put('/:stuId', async (req, res) => {
try {
const stuId = req.params.stuId;
const { firstname, lastname, fullname, address, nic, dob, email, contactNo, gender, profession, preference, country, requiredScore } = req.body;

// Check if the student with the given stuId exists
const student = await Student.findOne({ where: { stuId } });
if (!student) {
  return res.status(404).json({ error: 'Student not found' });
}

// Prevent updating stuId even if it's provided in the request body
delete req.body.stuId;

// Update the student's details
await Student.update(req.body, { where: { stuId } });

// Fetch the updated student record and send it in the response
const updatedStudent = await Student.findOne({ where: { stuId } });
res.json(updatedStudent);
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Server error' });
}
});

//*****************************************Delete a student******************************************** */
router.delete('/:id', async (req, res) => {
try {
  const { id } = req.params;
  await Student.destroy({ where: { stuId: id } });
  res.json({ message: 'Student deleted successfully' });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Server error' });
}
});


//********************Assign Courses********************************** */
router.post('/:id/courses', async (req, res) => {
try {
const { id } = req.params;
const { courseId } = req.body;

const student = await Student.findByPk(id);

if (!student) {
  return res.status(404).json({ error: 'Student not found' });
}

await student.update({ courseId });

res.json({ message: 'Course assigned successfully' });
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Server error' });
}
});

module.exports = router;




