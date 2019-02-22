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
