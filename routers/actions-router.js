const express = require("express");

const db = require("../data/helpers/actionModel");

const router = express.Router();

//get actions
router.get("/", async (req, res) => {
  try {
    let actions = await db.get();
    res.status(200).json(actions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "The actions information could not be retrieved." });
  }
});

// get actions by id

router.get("/:id", async (req, res) => {
  try {
    const post = await db.getById(req.params.id);
    if (post.length > 0) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The action with that id does not exist" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "The action information could not be retrieved" });
  }
});

// post actions
// project_id us required
/// project description is required, cannot be over 128 characters
/// notes required, no length  limit

router.post("/", async (req, res) => {
  if (!req.body.project_id) {
    res
      .status(400)
      .json({ error: " Please provide a project ID for this action" });
    return;
  }
  if (!req.body.description) {
    res
      .status(400)
      .json({ error: "Please provide a description for that action" });
    return;
  }
  if (!req.body.description.length > 128) {
    res.status(400).json({ error: "Description must be less than 128 chars" });
    return;
  }
  if (!req.body.notes) {
    res.status(400).json({ error: "Please provide notes for the action." });
    return;
  }
  try {
    const newAction = {
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes
    };
    let insAction = await db.insert(newAction);
    let theAction = await db.getById(insAction.id);
    res.status(201).json(theAction);
  } catch (error) {
    res.status(500).json({ error: "Added" });
  }
});

// delete a action

router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "That action has been nuked!" });
    } else {
      res.status(404).json({ message: "That action cannot be found!" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "There was an error removing that action" });
  }
});

/// get users post by id

router.get("/:id/posts", async (req, res) => {
  try {
    let posts = await db.getActionPosts(req.params.id);
    if (posts.length) {
      res.status(200), json(posts);
    } else {
      res
        .status(404)
        .json({
          error: true,
          message: " No posts found for this action, Potter!"
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error: true,
        message: " We are unable to find posts at this time."
      });
  }
});

module.exports = router;
