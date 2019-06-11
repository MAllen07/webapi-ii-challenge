

const express = require("express");
const Posts = require("../data/db.js");
const router = express.Router();

//using asyc
//EXPRESS ROUTER - ENDPOINTS

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "The posts information could not be retrieved" });
  }
});

// Get by ID.
router.get("/:id", async (req, res) => {
  try {
    const posts = await Posts.findById(req.params.id);

    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "The post information could not be retrieved" });
  }
});

// Post
router.post("/api/posts", async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    const { title, contents } = req.body;

    if (!title || !contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post." });
    }

    Posts.insert({ title, contents }).then(post => {
      res.status(201).json(posts);
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "There was an error while saving the post to the database."
      });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const posts = await Posts.remove(req.params.id);

    if (posts > 0) {
      res.status(200).json({ message: "Post has been nuked." });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "The post could not be removed." });
  }
});

// Put
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const post = req.body;
  if (id) {
    try {
      if (!post) {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post." });
      }

      await Posts.update(id, post)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          res
            .status(500)
            .json({ message: "The post information could not be modified" });
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "The post information is busted." });
    }
  } else {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  }
});

// export
module.exports = router;
