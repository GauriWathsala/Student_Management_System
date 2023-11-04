const express = require ('express')
const router = express.Router()
const {Course,Module, Book} = require("../models");

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


//Add a Course

router.post("/",async (req,res)=>{
  try {
      const { courseName,courseFee, courseDuration,moduleIds,durationType,riqMinMarks, riqMaxMarks } = req.body;
      const courseId = courseName.substr(0, 1) + generateRandomNumbers(4);
      const course = await Course.create({ courseId, courseName,courseFee, courseDuration, durationType,riqMinMarks, riqMaxMarks});
      
      //Associate the selected modules with the course
      if (moduleIds && moduleIds.length > 0) {
        const modules = await Module.findAll({
          where: {
            moduleId: moduleIds,
          },
        });
        await course.addModules(modules);
      }
  
      res.json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  
});

// POST /course/:courseId/modules
router.post("/:courseId/modules", async (req, res) => {
try {
  const { courseId } = req.params;
  const { moduleIds } = req.body;

  const course = await Course.findByPk(courseId);
  const modules = await Module.findAll({
    where: {
      moduleId: moduleIds,
    },
  });
  await course.addModules(modules);

  res.json({ message: 'Modules added to the course successfully' });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Server error' });
}
});


//Retrieve Course
router.get("/", async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: {
        model: Module,
        as: "modules",
        attributes: ["moduleId", "moduleName"],
        through: { attributes: [] },
      },
    });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Retrieve course details with modules
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id, {
      include: {
        model: Module,
        as: "modules",
        attributes: ["moduleId", "moduleName"],
        through: { attributes: [] },
      },
    });
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /course/:courseId/modules/:moduleId
router.delete('/:courseId/modules/:moduleId', async (req, res) => {
try {
  const { courseId, moduleId } = req.params;

  const course = await Course.findByPk(courseId);
  const module = await Module.findByPk(moduleId);

  if (!course || !module) {
    return res.status(404).json({ error: 'Course or Module not found' });
  }

  await course.removeModule(module);

  res.json({ message: 'Module removed from the course successfully' });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Server error' });
}
});



//Delete a course
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Course.destroy({ where: { courseId: id } });
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Edit course details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = req.body;
    await Course.update(updatedCourse, { where: { courseId: id } });
    res.json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router



