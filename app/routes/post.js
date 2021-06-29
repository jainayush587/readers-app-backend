const express = require("express")
const router = express.Router()
const story = require("../controllers/post.controller");
const { authJwt } = require("../middlewares");

// /api/blog: GET, POST, DELETE
// /api/blog/:id: GET, PUT, DELETE
// /api/blog/published: GET

// Create a new story
router.post("/", [authJwt.verifyToken], story.create);

// Retrieve all story
router.get("/", story.findAll);

// Retrieve all published story
router.get("/published", story.findAllPublished);

// Retrieve a single story with id
router.get("/:id", story.findOne);

// Update a atory with id
router.put("/:id", [authJwt.verifyToken], story.update);

// Delete a story with id
router.delete("/:id", [authJwt.verifyToken], story.delete);

// Create a new Tutorial
router.delete("/", [authJwt.verifyToken], story.deleteAll);

module.exports = router
