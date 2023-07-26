const express = require ('express')
const router = express.Router()
const {Module,Teacher} = require("../models");

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
        const { moduleName} = req.body;
        const moduleId = moduleName.substr(0, 2).toUpperCase() + generateRandomNumbers(4);
        const module = { moduleId, moduleName};
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

//delete a module
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

router.get("/", async (req, res) => {
  try {
    const listofModules = await Module.findAll({
      attributes: ['moduleId', 'moduleName', 'teacherId'], 
      include: [
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['teacherId'], 
        },
      ],
    });
    res.json(listofModules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update teacher for a module
router.put("/:moduleId/teacher/:teacherId", async (req, res) => {
  try {
    const { moduleId, teacherId } = req.params;

    // Check if the module exists
    const module = await Module.findOne({ where: { moduleId } });
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }

    // Check if the teacher exists
    const teacher = await Teacher.findOne({ where: { teacherId } });
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Update the teacherId for the module
    await Module.update({ teacherId }, { where: { moduleId } });

    // Return the updated module
    const updatedModule = await Module.findByPk(moduleId);
    res.json(updatedModule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Unassign a teacher from a module
router.put('/:moduleId/unassign', async (req, res) => {
  try {
    const { moduleId } = req.params;

    // Find the module with the given ID
    const module = await Module.findOne({ where: { moduleId } });

    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Unassign the teacher from the module (set teacherId to null)
    module.teacherId = null;
    await module.save();

    res.json({ message: 'Teacher unassigned from module successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router