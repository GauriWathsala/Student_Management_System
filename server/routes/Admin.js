
const express = require ('express')
const router = express.Router()
const {Admin,User,Staff} = require("../models");

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
    const  adminId = 'A' + generateRandomNumbers(4);
    const  admin = {
      adminId,
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
    const createdAdmin = await Admin.create( admin);
    console.log('createdReceptionist ', createdAdmin);

    // Create associated user entry
    const user = {
      userId: createdAdmin. adminId,
      password: createdAdmin. adminId,
      username: createdAdmin. adminId,
      userType: ' Admin',
    };
    await User.create(user);

    // Create associated Staff entry
    const staff = {
      userId: createdAdmin.adminId,
      firstname: createdAdmin.firstname,
      lastname: createdAdmin.lastname,
      fullname: createdAdmin.fullname,
      address: createdAdmin.address,
      nic: createdAdmin.nic,
      dob: createdAdmin.dob,
      email: createdAdmin.email,
      qualifications: createdAdmin.qualifications,
      gender: createdAdmin.gender,
      password: user.password,
      username: user.username,
      userType: user.userType,
      contact: createdAdmin.contact,
    };
    await Staff.create(staff);
    // Respond with success message or appropriate data
    res.status(200).json({ message: ' Admin created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});










//***************************Retrieve Teacher**********************************
router.get("/", async(req,res) => {
    try {
        const listOfAdmin= await Admin.findAll({
          
          
        });
        res.json(listOfAdmin);
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
    await Admin.update(
      { firstname,lastname,fullname, address, nic, dob, email, qualifications,gender,contact },
      { where: { adminId: id } }
    );
  res.json(updatedAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


//Delete teacher
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Admin.destroy({ where: { adminId: id } });
      await User.destroy({ where: { userId: id}});
      
      await Staff.destroy({ where: { userId: id } });
     
      res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});
// *******************retrieve a specific teacher info*********************
router.get("/:adminId", async (req, res) => {
  try {
    const { adminId } = req.params;
    const adminDetails = await Admin.findOne({
      where: { adminId },
      
    });

    if (!adminDetails) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json(adminDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router
  
