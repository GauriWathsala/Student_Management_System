const express = require ('express')
const router = express.Router()
const {Teacher, TeacherContact,Module,User,Staff,StaffContact} = require("../models");
const bcrypt = require("bcrypt") ; 

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
// ********************************add teacher *****************************

router.post('/', async (req, res) => {
  try {
    const { firstname, lastname, fullname, address, nic, dob, email, qualifications, contact, gender } = req.body;
    console.log(req.body);

    // Create teacher
    const teacherId = 'T' + generateRandomNumbers(4);
    const teacher = {
      teacherId,
      firstname,
      lastname,
      fullname,
      address,
      nic,
      dob,
      email,
      qualifications,
      gender,
      contact,
    };
    const createdTeacher = await Teacher.create(teacher);
    console.log('createdTeacher ', createdTeacher);

    // Create associated user entry
    const user = {
      userId: createdTeacher.teacherId,
      password : await bcrypt.hash(createdTeacher.teacherId, 10),
      //password: createdTeacher.teacherId,
      username: createdTeacher.teacherId,
      userType: 'Teacher',
    };
    await User.create(user);

    // Create associated Staff entry
    const staff = {
      userId: createdTeacher.teacherId,
      firstname: createdTeacher.firstname,
      lastname: createdTeacher.lastname,
      fullname: createdTeacher.fullname,
      address: createdTeacher.address,
      nic: createdTeacher.nic,
      dob: createdTeacher.dob,
      email: createdTeacher.email,
      qualifications: createdTeacher.qualifications,
      gender: createdTeacher.gender,
      password: user.password,
      username: user.username,
      userType: user.userType,
      contact: createdTeacher.contact,
    };
    await Staff.create(staff);

    // Respond with success message or appropriate data
    res.status(200).json({ message: 'Teacher created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});










//***************************Retrieve Teacher**********************************
router.get("/", async(req,res) => {
    try {
        const listOfTeachers = await Teacher.findAll({
          include: [
          {
            model: Module,
            as: 'modules',
            attributes: ['moduleId'],
            // through: { attributes: [] },
          },
        ],
          
        });
        res.json(listOfTeachers);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
 });

 // ***************************Assign modules to a teacher*****************************
router.post('/:id/modules', async (req, res) => {
    try {
      const { id } = req.params;
      const { moduleIds } = req.body;
  
      const teacher = await Teacher.findByPk(id);
  
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
  
      await teacher.addModules(moduleIds);
  
      res.json({ message: 'Modules assigned successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

// **********************Remove modules from a teacher*************************
router.delete('/:id/modules/:moduleId', async (req, res) => {
    try {
      const { id, moduleId } = req.params;
  
      const teacher = await Teacher.findByPk(id);
  
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
  
      await teacher.removeModule(moduleId);
  
      res.json({ message: 'Module removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

// *******************************Edit teacher details and contacts*************************
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname,lastname,fullname, address, nic, dob, email,  qualifications, contact,gender } = req.body;

    // Update teacher details
    await Teacher.update(
      { firstname,lastname,fullname, address, nic, dob, email, qualifications,gender,contact },
      { where: { teacherId: id } }
    );


   

    res.json(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


//Delete teacher
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Teacher.destroy({ where: { teacherId: id } });
      await User.destroy({ where: { userId: id}});
      
      await Staff.destroy({ where: { userId: id } });
     
      res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});
// *******************retrieve a specific teacher info*********************
router.get("/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;
    const teacherDetails = await Teacher.findOne({
      where: { teacherId },
      include: [
       
        {
          model: Module,
          as: "modules",
          attributes: ["moduleId"],
        },
      ],
    });

    if (!teacherDetails) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json(teacherDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router