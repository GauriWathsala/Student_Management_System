const express = require ('express')
const router = express.Router()
const {Module} = require("../models");

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

// Add a module
router.post("/",async (req,res)=>{
    try {
        const { moduleName } = req.body;
        const moduleId = moduleName.substr(0, 2) + generateRandomNumbers(4);
        const module = { moduleId, moduleName };
        await Module.create(module);
        res.json(module);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
    
});

//Edit module details
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedModule = req.body;
      await Module.update(updatedModule, { where: { moduleId: id } });
      res.json(updatedModule);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

//delete a course
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Module.destroy({ where: { moduleId: id } });
      res.json({ message: 'Module deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

//Retrieve Modules

router.get("/", async(req,res) => {
    const listofModules = await Module.findAll();
    res.json(listofModules);
 });

module.exports = router