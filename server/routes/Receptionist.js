
const express = require ('express')
const router = express.Router()
const {Receptionist,User,Staff,} = require("../models");
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
// ********************************add receptionist *****************************

router.post('/', async (req, res) => {
  try {
    const { firstname, lastname, fullname, address, nic, dob, email, qualifications, contact, gender } = req.body;
    console.log(req.body);

    // Create receptionist
    const receptionistId = 'R' + generateRandomNumbers(4);
    const receptionist = {
      receptionistId,
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
    const createdReceptionist = await Receptionist.create(receptionist);
    console.log('createdReceptionist ', createdReceptionist);

    // Create associated user entry
    const user = {
      userId: createdReceptionist.receptionistId,
      password : await bcrypt.hash(createdReceptionist.receptionistId, 10),
      // password: createdReceptionist.receptionistId,
      username: createdReceptionist.receptionistId,
      userType: 'Receptionist',
    };
    await User.create(user);

    // Create associated Staff entry
    const staff = {
      userId: createdReceptionist.receptionistId,
      firstname: createdReceptionist.firstname,
      lastname: createdReceptionist.lastname,
      fullname: createdReceptionist.fullname,
      address: createdReceptionist.address,
      nic: createdReceptionist.nic,
      dob: createdReceptionist.dob,
      email: createdReceptionist.email,
      qualifications: createdReceptionist.qualifications,
      gender: createdReceptionist.gender,
      password: user.password,
      username: user.username,
      userType: user.userType,
      contact: createdReceptionist.contact,
    };
    await Staff.create(staff);

    // Respond with success message or appropriate data
    res.status(200).json({ message: 'Receptionist created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});










//***************************Retrieve Teacher**********************************
router.get("/", async(req,res) => {
    try {
        const listOfTeachers = await Receptionist.findAll({
          
          
        });
        res.json(listOfTeachers);
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
    await Receptionist.update(
      { firstname,lastname,fullname, address, nic, dob, email, qualifications,gender,contact },
      { where: { receptionistId: id } }
    );


   

    res.json(updatedReceptionist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


//Delete teacher
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Receptionist.destroy({ where: { teacherId: id } });
      await User.destroy({ where: { userId: id}});
      
      await Staff.destroy({ where: { userId: id } });
     
      res.json({ message: 'Receptionist deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});
// *******************retrieve a specific teacher info*********************
router.get("/:receptionistId", async (req, res) => {
  try {
    const { receptionistId } = req.params;
    const receptionistDetails = await Teacher.findOne({
      where: { receptionistId },
      
    });

    if (!receptionistDetails) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json(receptionistDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router