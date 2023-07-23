const express = require ('express')
const router = express.Router()
const {Admin, AdminContact,User} = require("../models");

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

  // *********************Add new Admin**************************

router.post('/', async (req, res) =>{
    try {
        const { name, email, contacts, nic,dob,salary,gender,qualification } = req.body;
    
        // Create admin
        const adminId = generateRandomNumbers(6);
        const admin = {
          adminId,name,email,nic,dob,salary,gender,qualification 
        };
        const createdAdmin = await Admin.create(admin);

        // Create admin contacts
    const contactNumbers = contacts.map((contact) => ({
        adminId: createdAdmin.adminId,
        contactNumber: contact,
      }));
      await AdminContact.bulkCreate(contactNumbers);

       // Create associated user entry
const userId = 'A' + generateRandomNumbers(4);

    const user = {
      userId,
      username :createdAdmin.adminId,
      password: createdAdmin.adminId,
      userType: 'Admin',
    };
    await User.create(user);
  
      res.json(createdAdmin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
    
}); 

// *****************Retrieve Admin*******************
router.get('/', async (req, res) => {
    try {
      const listOfAdmin = await Admin.findAll({
        include: {
          model: AdminContact,
          as: 'contacts',
          attributes: ['contactNumber'],
        },
      });
      res.json(listOfAdmin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  //Delete admin
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Admin.destroy({ where: { adminId: id } });
      await User.destroy({ where: { userId: id}});
      await AdminContact.destroy({ where: { adminId: id } });
      res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

// **************Edit Admin details and contacts************************
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name,email, contacts , nic,dob,salary,gender,qualification} = req.body;
  
      // Update admin details
      await Admin.update(
        { name, email,nic,dob,salary,gender,qualification },
        { where: { adminId: id } }
      );
  
      // Update admin contacts
      const admin = await Admin.findByPk(id);
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      // Delete existing contacts
      await AdminContact.destroy({ where: { adminId: id } });
  
      // Create new contacts
      const contactNumbers = contacts.map((contact) => ({
        adminId: id,
        contactNumber: contact,
      }));
      await AdminContact.bulkCreate(contactNumbers);
  
      // Fetch updated admin with contacts
      const updatedAdmin = await Admin.findByPk(id, {
        include: {
          model: AdminContact,
          as: 'contacts',
          attributes: ['contactNumber'],
        },
      });
  
      res.json(updatedAdmin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  module.exports = router
  
