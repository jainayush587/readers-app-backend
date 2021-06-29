const db = require("../models");
const Story = db.post;

// Create and Save a new blog
exports.create = (req, res) => {
    // Validate request
  if (!req.body.content) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a blog
  const story = new Story({
    author: req.body.author,
    content: req.body.content,
    published: req.body.published ? req.body.published : false
  });

  // Save blog in the database
  story
    .save(story)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the story."
      });
    });

};

// Retrieve all blogs from the database.
exports.findAll = (req, res) => {
    const content = req.query.content;
    var condition = content ? { content: { $regex: new RegExp(content), $options: "i" } } : {};

    Story.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving stories."
        });
      });

};

// Find a single blog with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Story.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found story with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving story with id=" + id });
      });

};

// Update a blog by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }

      const id = req.params.id;

      Story.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Story with id=${id}. Maybe Blog was not found!`
            });
          } else res.send({ message: "Story was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Story with id=" + id
          });
        });

};

// Delete a blog with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Story.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Stori with id=${id}. Maybe Story was not found!`
          });
        } else {
          res.send({
            message: "Story was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Story with id=" + id
        });
      });

};

// Delete all blogs from the database.
exports.deleteAll = (req, res) => {
    Story.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Stories were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stories."
      });
    });
};

// Find all published blogs
exports.findAllPublished = (req, res) => {
    Story.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stories."
      });
    });
};
