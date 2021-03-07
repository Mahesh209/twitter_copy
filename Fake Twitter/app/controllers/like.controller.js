const Like = require("../models/like.model.js");

// Create and Save a new Like
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Like
    const like = new Like({
      userId: req.body.userId,
      tweetId: req.body.tweetId,

    });
  
    // Save Like in the database
    Like.create(like, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Like."
        });
      else res.send(data);
    });
  };

// Retrieve all Likes from the database.
exports.findAll = (req, res) => {
    Like.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving likes."
        });
      else res.send(data);
    });
  };

// Find a single Like with a likeId
exports.findOne = (req, res) => {
    Like.findById(req.params.likeId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Like with id ${req.params.likeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Like with id " + req.params.likeId
          });
        }
      } else res.send(data);
    });
  };

// Find all of a user's Likes with a userId
exports.findUserLikes = (req, res) => {
    console.log(req.params);
    Like.findByUserId(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Like with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Like with id " + req.params.userId
          });
        }
      } else res.send(data);
    });
  };

  // Find all of Tweet's likes with tweetId
exports.findTweetLikes = (req, res) => {
    Like.findByTweetId(req.params.tweetId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Like with id ${req.params.tweetId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Like with id " + req.params.tweetId
          });
        }
      } else res.send(data);
    });
  };

// Delete a Like with the specified likeId in the request
exports.delete = (req, res) => {
  Like.remove(req.params.likeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Like with id ${req.params.likeId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Like with id " + req.params.likeId
        });
      }
    } else res.send({ message: `Like was deleted successfully!` });
  });
};

// Delete all Likes from the database.
exports.deleteAll = (req, res) => {
    Like.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all likes."
        });
      else res.send({ message: `All Likes were deleted successfully!` });
    });
  };