const express = require('express');
const router = express.Router();
const { User, Receptionist, Teacher, Admin,ReceptionistContact, TeacherContact, AdminContact  } = require('../models');

// Update user's username and password
router.put('/:id/credentials', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    // Determine the user type based on the ID
    let user;
    if (id.startsWith('T')) {
      user = await Teacher.findByPk(id);
    } else if (id.startsWith('R')) {
      user = await Receptionist.findByPk(id);
    } else if (id.startsWith('A')) {
      user = await Admin.findByPk(id);
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the associated user in the User model
    const associatedUser = await User.findOne({ where: { userId: id } });
    if (!associatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the username and password
    associatedUser.username = username;
    associatedUser.password = password;
    await associatedUser.save();

    res.json({ message: 'Username and password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



//delete user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { userId: id } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Get all users with their associated details
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      include :{
        model :Admin,
        as : 'admin',
        include :{
          model : AdminContact,
          as : 'contacts',
          attributes : ['contactNumber'],
        }
      }
    })
    // const receptionists = await Receptionist.findAll({ 
    //   include: [{ model: User, as: 'user' }, { model: ReceptionistContact, as: 'contacts',attributes: ['contactNumber'] }],
    // });
    // const teachers = await Teacher.findAll({ 
    //   include: [{ model: User, as: 'user' }, { model: TeacherContact, as: 'contacts',attributes: ['contactNumber'] }], 
    // });
    // const admins = await Admin.findAll({ 
    //   include: [{ model: User, as: 'user' }, { model: AdminContact, as: 'contacts', attributes: ['contactNumber']}], 
    // });

    // const users = [
    //   // ...receptionists.map((receptionist) => ({
    //   //   ...receptionist.User.dataValues,
    //   //   ...receptionist.dataValues,
    //   // })),
    //   // ...teachers.map((teacher) => ({
    //   //   ...teacher.User.dataValues,
    //   //   ...teacher.dataValues,
    //   // })),
    //   ...admins.map((admin) => ({
    //     ...admin.User.dataValues,
    //     ...admin.dataValues,
    //   })),
    // ];
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
