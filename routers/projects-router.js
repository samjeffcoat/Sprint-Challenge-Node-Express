const express = require("express");

const db = require("../data/helpers/projectModel");

const router = express.Router();

// get projects

router.get("/", async (req, res) => {
  try {
    let projects = await db.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      error: "The projects information you are looking for cannot be found"
    });
  }
});

//Post to specific project id
router.post("/", async (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({
      error: "Please provide a name and description for your project"
    });
    return;
  }
  const projectFull = {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  };
  try {
    let newProject = await db.insert(projectFull);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({
      error: "There was an error adding that project to the database"
    });
  }
});

//Get projects by ID

router.get("/:id", async (req, res) => {
  try {
    const project = await db.getById(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ message: "The project with that id cannot be found!" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "That project information cannot be found!" });
  }
});
module.exports = router;
