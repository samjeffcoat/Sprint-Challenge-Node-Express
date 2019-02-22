const express = require("express");

const db = require("../data/helpers/projectModel");

const router = express.Router();

module.exports = router;

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
