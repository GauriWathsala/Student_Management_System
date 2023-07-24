const express = require ('express')
const router = express.Router()
const {Receptionist, ReceptionistContact,User,Staff,StaffContact} = require("../models");

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

 //*********************************Add new Receptionist*************************************************

router.post('/', async (req, res) =>{
    try {
        const { firstname, lastname,fullname, address, nic, dob, email, salary,contacts ,gender,qualifications} = req.body;
    
        // Create receptionist
        const receptionistId = 'R' + generateRandomNumbers(4);
        const receptionist = {
          receptionistId,firstname, lastname,fullname,address, nic, dob,email, salary,gender,qualifications
        };
        const createdReceptionist = await Receptionist.create(receptionist);

        // Create associated user entry
    const user = {
      userId:  createdReceptionist.receptionistId,
      username: createdReceptionist.receptionistId,
      password:  createdReceptionist.receptionistId,
      userType: 'Receptionist',
    };
    await User.create(user);

        // Create receptionist contacts
    const contactNumbers = contacts.map((contact) => ({
        receptionistId: createdReceptionist.receptionistId,
        contactNumber: contact,
      }));
      await ReceptionistContact.bulkCreate(contactNumbers);

       //Create associated Staff entry
    const staff = {
      userId: createdReceptionist.receptionistId,
      firstname : createdReceptionist.firstname,
      lastname: createdReceptionist.lastname,
      fullname: createdReceptionist.fullname,
      address: createdReceptionist.address,
      nic:  createdReceptionist.nic,
      dob: createdReceptionist.dob,
      email: createdReceptionist.email,
      qualifications:createdReceptionist. qualifications,
      gender :createdReceptionist.gender,
      password: user.password,
      username: user.username,
      userType: user.userType,
    };
    await Staff.create(staff);

    // Create associated StaffContact entries
    const staffContacts = contacts.map((contact) => ({
      userId: createdReceptionist.receptionistId,
      contactNumber: contact,
    }));
    await StaffContact.bulkCreate(staffContacts);

    
    res.json(createdReceptionist);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
    
}); 

// *****************************Edit receptionist details and contacts**************************************
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, address, nic, dob, email, salary, contacts, qualification,gender} = req.body;
  
      // Update receptionist details
      await Receptionist.update(
        { name, address, nic, dob, email, salary,qualification,gender },
        { where: { receptionistId: id } }
      );
  
      // Update receptionist contacts
      const receptionist = await Receptionist.findByPk(id);
      if (!receptionist) {
        return res.status(404).json({ error: 'Receptionist not found' });
      }
  
      // Delete existing contacts
      await ReceptionistContact.destroy({ where: { receptionistId: id } });
  
      // Create new contacts
      const contactNumbers = contacts.map((contact) => ({
        receptionistId: id,
        contactNumber: contact,
      }));
      await ReceptionistContact.bulkCreate(contactNumbers);
  
      // Fetch updated receptionist with contacts
      const updatedReceptionist = await Receptionist.findByPk(id, {
        include: {
          model: ReceptionistContact,
          as: 'contacts',
          attributes: ['contactNumber'],
        },
      });
  
      res.json(updatedReceptionist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

//***************************************Delete Receptionist*********************************************
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Receptionist.destroy({ where: { receptionistId: id } });
      await User.destroy({ where: { userId: id } });
      await ReceptionistContact.destroy({ where: { receptionistId: id } });
      res.json({ message: 'Receptionist deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

// Retrieve Receptionist
router.get('/', async (req, res) => {
    try {
      const listOfReceptionists = await Receptionist.findAll({
        include: 
          {
            model: ReceptionistContact,
            as: 'contacts',
            attributes: ['contactNumber'],
          },
        
        
      });
      res.json(listOfReceptionists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router