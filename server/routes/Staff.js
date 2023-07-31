const express = require('express');
const router = express.Router();
const { Staff, StaffContact , User, Teacher, TeacherContact, Receptionist,ReceptionistContact,Admin, AdminContact} = require('../models');
const { sequelize } = require('../models');

//*******************Retrieve all staff details************************* */
router.get("/", async(req,res) => {
    
    try{
        const staffMembers = await Staff.findAll({

        });
        res.json(staffMembers);
    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
    
 });

 //************************************Delete Staff Member************************* */;

// DELETE a staff member
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the staff member by id
    const staffMember = await Staff.findByPk(id, {
      include: [
        { model: Admin, as: 'admin' },
        { model: Receptionist, as: 'receptionist' },
        { model: Teacher, as: 'teacher' },
      ],
    });

    // Check if staff member exists
    if (!staffMember) {
      return res.status(404).json({ error: 'Staff member not found' });
    }
      await sequelize.transaction(async (t) => {
      
       await User.destroy({ where: { userId: staffMember.userId }, transaction: t });
       await StaffContact.destroy({ where: { userId: staffMember.userId }, transaction: t });

       if (staffMember.admin) {
        await AdminContact.destroy({ where: { adminId: staffMember.admin.adminId }, transaction: t });
        await Admin.destroy({ where: { adminId: staffMember.admin.adminId }, transaction: t });
      }
      if (staffMember.receptionist) {
        await ReceptionistContact.destroy({ where: { receptionistId: staffMember.receptionist.receptionistId }, transaction: t });
        await Receptionist.destroy({ where: { receptionistId: staffMember.receptionist.receptionistId }, transaction: t });
      }
        if (staffMember.teacher) {
            await TeacherContact.destroy({ where: { teacherId: staffMember.teacher.teacherId }, transaction: t });
            await Teacher.destroy({ where: { teacherId: staffMember.teacher.teacherId }, transaction: t });
      }
        await Staff.destroy({ where: { userId: staffMember.userId }, transaction: t });
    });

    res.json({ message: 'Staff member and associated records deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


 
