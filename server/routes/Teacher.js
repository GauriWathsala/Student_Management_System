const express = require ('express')
const router = express.Router()
const {Teacher, TeacherContact,Module,User,Staff,StaffContact} = require("../models");

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
// ************************************Add new teacher************************************
router.post('/', async (req, res) =>{
    try {
        const { firstname, lastname,fullname, address, nic, dob, email, salary, qualifications, contacts , gender} = req.body;
    
        // Create teacher
        const teacherId = 'T' + generateRandomNumbers(4);
        const teacher = {
          teacherId,firstname,lastname,fullname,address, nic, dob,email, salary, qualifications,gender
        };
        const createdTeacher = await Teacher.create(teacher);

        
        // Create teacher contacts
    const contactNumbers = contacts.map((contact) => ({
        teacherId: createdTeacher.teacherId,
        contactNumber: contact,
      }));
      await TeacherContact.bulkCreate(contactNumbers);

       // Create associated user entry
    const user = {
      userId: createdTeacher.teacherId,
      password: createdTeacher.teacherId,
      username: createdTeacher.teacherId,
      userType: 'Teacher',
    };
    await User.create(user);

    //Create associated Staff entry
    const staff = {
      userId: createdTeacher.teacherId,
      firstname : createdTeacher.firstname,
      lastname: createdTeacher.lastname,
      fullname: createdTeacher.fullname,
      address: createdTeacher.address,
      nic:  createdTeacher.nic,
      dob: createdTeacher.dob,
      email: createdTeacher.email,
      qualifications:createdTeacher. qualifications,
      gender :createdTeacher.gender,
      password: user.password,
      username: user.username,
      userType: user.userType,
    };
    await Staff.create(staff);

    // Create associated StaffContact entries
    const staffContacts = contacts.map((contact) => ({
      userId: createdTeacher.teacherId,
      contactNumber: contact,
    }));
    await StaffContact.bulkCreate(staffContacts);

    res.json(createdTeacher);
    } 
    catch (error) {
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
            model: TeacherContact,
            as: 'contacts',
            attributes: ['contactNumber'],
          },
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
    const { firstname,lastname,fullname, address, nic, dob, email, salary, qualifications, contacts,gender } = req.body;

    // Update receptionist details
    await Teacher.update(
      { firstname,lastname,fullname, address, nic, dob, email, salary,qualifications,gender },
      { where: { teacherId: id } }
    );

    // Update teacher contacts
    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Delete existing contacts
    await TeacherContact.destroy({ where: { teacherId: id } });

    // Create new contacts
    const contactNumbers = contacts.map((contact) => ({
      teacherId: id,
      contactNumber: contact,
    }));
    await TeacherContact.bulkCreate(contactNumbers);

    // Fetch updated teacher with contacts
    const updatedTeacher = await Teacher.findByPk(id, {
      include: {
        model: TeacherContact,
        as: 'contacts',
        attributes: ['contactNumber'],
      },
    });

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
      await TeacherContact.destroy({ where: { teacherId: id } });
      res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router