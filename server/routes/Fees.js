
const express = require ('express')
const router = express.Router()
const {Fees} = require("../models");

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
// ********************************add fee *****************************

router.post('/', async (req, res) => {
  try {
    const { feeType, amount } = req.body;
    console.log(req.body);

   
     const  feeId = generateRandomNumbers(5);
    const   fees = {
      feeId,
      feeType,
      amount,
    
    };
    const createdFee = await Fees.create( fees);
    console.log('createdFee ',createdFee);
    res.status(200).json({ message: ' Fee created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//***************************Retrieve Fees**********************************
router.get("/", async(req,res) => {
    try {
        const listOfFees= await Fees.findAll({});
        res.json(listOfFees);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
 });


  // Retrieve a fee details
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const fee = await Fees.findByPk(id, {});
      res.json(fee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });


 //*********************Edit Fee**********************************/
 
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFee = req.body;
    await Fees.update(updatedFee, { where: { feeId: id } });
    res.json(updatedFee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

 //****************************Delete a fee*****************************
 router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Fees.destroy({ where: { feeId: id } });
    res.json({ message: 'Fee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

 
  

 module.exports = router
