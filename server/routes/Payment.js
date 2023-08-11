const express = require("express");
const router = express.Router();
const { Payment, Student} = require("../models"); 

// Create a new payment when a student makes an online payment
router.post("/onlinepay", async (req, res) => {
  try {
    const { stuId, amountPaid ,paymentType, details} = req.body;

    // Check if the student and fee exist
    const student = await Student.findByPk(stuId);
   

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Create the payment
    const payment = await Payment.create({
      paymentId: generatePaymentId(),
      amountPaid,
      paymentType,
      paymentMethod: "Online Payment",
      stuId,
      details
    });

    return res.status(201).json(payment);
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({ message: "Error creating payment." });
  }
});

// Helper function to generate a unique payment ID
function generatePaymentId() {
    return Date.now().toString() + Math.random().toString(36).substring(7);
}



// Get payment details for a specific student
router.get("/:stuId", async (req, res) => {
    try {
      const stuId = req.params.stuId;
  
      // Check if the student exists
      const student = await Student.findByPk(stuId);
  
      if (!student) {
        return res.status(404).json({ message: "Student not found." });
      }
  
      // Retrieve the payment details for the student
      const payments = await Payment.findAll({
        where: { stuId },
        include: [
          {
            model: Student,
            as: "student",
          },
          ],
      });
  
      return res.status(200).json(payments);
    } catch (error) {
      console.error("Error retrieving payments:", error);
      return res.status(500).json({ message: "Error retrieving payments." });
    }
  });
  
module.exports = router;
