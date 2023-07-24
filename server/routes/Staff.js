const express = require('express');
const router = express.Router();
const { Staff, StaffContact } = require('../models');

//*******************Retrieve all staff details************************* */
router.get("/", async(req,res) => {
    
    try{
        const staffMembers = await Staff.findAll({
            include:{
                model: StaffContact,
                as: 'contacts',
                attributes: ['contactNumber'],
            }
        });
        res.json(staffMembers);
    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
    
 });

 module.exports = router