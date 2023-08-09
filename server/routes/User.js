const express = require('express');
const router = express.Router();
const { User, Receptionist, Teacher, Admin, Student } = require('../models');
const bcrypt = require("bcrypt") ;
 const {sign} = require ("jsonwebtoken");

// **************************Update user's username and password******************************
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
    }else if  (id.startsWith('S')){
      user = await Student.findByPk(id);
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



//*****************************delete user*******************************
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


//***************************Get all users with their associated details***************************
router.get("/", async(req,res) => {
  const userCredentials = await User.findAll();
  res.json(userCredentials);
});



//************************Login****************************** */

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.json({ error: "User Doesn't Exist" });
    }

    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        return res.json({ error: "Wrong Username & password combination" });
      }

      const accessToken = sign ({username : user.username, id:user.id}, "importantsecret");
      res.json(accessToken);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});




module.exports = router;
