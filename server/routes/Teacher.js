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
// // ************************************Add new teacher************************************
// router.post('/', async (req, res) =>{
//     try {
//         const { firstname, lastname,fullname, address, nic, dob, email,  qualifications, contact , gender} = req.body;
//         console.log (req.body);
    
//         // Create teacher
//         const teacherId = 'T' + generateRandomNumbers(4);
//         const teacher = {
//           teacherId,firstname,lastname,fullname,address, nic, dob,email,  qualifications,gender, contact
//         };
//        const createdTeacher = await Teacher.create(teacher);
//         console.log('createdTeacher ',createdTeacher)

        
   

//        // Create associated user entry
//     const user = {
//       userId: createdTeacher.teacherId,
//       password: createdTeacher.teacherId,
//       username: createdTeacher.teacherId,
//       userType: 'Teacher',
//     };
//     await User.create(user);

//     //Create associated Staff entry
//     const staff = {
//       userId: createdTeacher.teacherId,
//       firstname : createdTeacher.firstname,
//       lastname: createdTeacher.lastname,
//       fullname: createdTeacher.fullname,
//       address: createdTeacher.address,
//       nic:  createdTeacher.nic,
//       dob: createdTeacher.dob,
//       email: createdTeacher.email,
//       qualifications:createdTeacher. qualifications,
//       gender :createdTeacher.gender,
//       password: user.password,
//       username: user.username,
//       userType: user.userType,
//       contact : createdTeacher.contact,
//     };
//     await Staff.create(staff);

//     await Teacher.create(createdTeacher)
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
//   });

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
      password: createdTeacher.teacherId,
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




// router.post('/create', async (req, res) => {
//   try {
//     // Extract teacher data from the request body
//     const {
//       teacherId,
//       firstname,
//       lastname,
//       fullname,
//       address,
//       nic,
//       dob,
//       email,
//       qualifications,
//       gender,
//       contactNumber, // Assuming you also want to add a contact number for the teacher
//     } = req.body;

//     console.log('Received request to create teacher:', req.body);

//     // Create a new Teacher record in the database
//     const newTeacher = await Teacher.create({
//       teacherId,
//       firstname,
//       lastname,
//       fullname,
//       address,
//       nic,
//       dob,
//       email,
//       qualifications,
//       gender,
//     });

//     console.log('Teacher record created:', newTeacher.toJSON());

//     // Create a TeacherContact record associated with the new teacher
//     await TeacherContact.create({
//       teacherId: newTeacher.teacherId,
//       contactNumber,
//     });

//     console.log('TeacherContact record created');

//     // Respond with the newly created teacher
//     res.status(201).json({ success: true, teacher: newTeacher });
//   } catch (error) {
//     console.error('Error adding teacher:', error);
//     console.error('Error stack trace:', error.stack);
  
//     if (error.name === 'SequelizeValidationError') {
//       console.error('Validation errors:', error.errors);
//       return res.status(400).json({ success: false, message: 'Invalid data provided. Please check the input fields.' });
//     }
  
//     if (error.response) {
//       console.error('Axios response status:', error.response.status);
//       console.error('Axios response headers:', error.response.headers);
//     }
  
//     res.status(500).json({ success: false, message: 'Failed to add teacher. Please try again later.' });
//   }
// });





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