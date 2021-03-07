const Tweet = require("../models/tweet.model.js");

// Create and Save a new Tweet
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Tweet
    const tweet = new Tweet({
      userId: req.body.userId,
      parentId: req.body.parentId,
      content: req.body.content
    });
  
    // Save Tweet in the database
    Tweet.create(tweet, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tweet."
        });
      else res.send(data);
    });
  };

// Create and Save a new Retweet
exports.retweet = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tweet
  const tweet = new Tweet({
    userId: req.body.userId,
    parentId: req.body.parentId,
    content: req.body.content,
    isRetweet: 1
  });

  // Save Tweet in the database
  Tweet.create(tweet, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tweet."
      });
    else res.send(data);
  });
};

// Post a new Tweet
exports.postTweet = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tweet
  const tweet = new Tweet({
    userId: req.body.userId,
    parentId: req.body.parentId,
    content: req.body.content
  });

  // Save Tweet in the database
  Tweet.create(tweet, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while posting your tweet."
      });
    else {
      req.session.myTweets.push(data);
      res.redirect("/home");
    }
  });
};

// Retrieve all Tweets from the database.
exports.findAll = (req, res) => {
    Tweet.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tweets."
        });
      else res.send(data);
    });
  };

// Find a single Tweet with a tweetId
exports.findOne = (req, res) => {
    Tweet.findById(req.params.tweetId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tweet with id ${req.params.tweetId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Tweet with id " + req.params.tweetId
          });
        }
      } else res.send(data);
    });
  };

// Find all of a user's Tweets with a userId
exports.findUserTweets = (req, res) => {
    console.log(req.params);
    Tweet.findByUserId(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tweet with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Tweet with id " + req.params.userId
          });
        }
      } else res.send(data);
    });
  };

  // Find all of a Tweets's replies by parentId
exports.findReplyTweets = (req, res) => {
    Tweet.findByParentId(req.params.parentId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tweet with id ${req.params.parentId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Tweet with id " + req.params.parentId
          });
        }
      } else res.send(data);
    });
  };


// Update a Tweet identified by the tweetId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Tweet.updateById(
      req.params.tweetId,
      new Tweet(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tweet with id ${req.params.tweetId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Tweet with id " + req.params.tweetId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Tweet with the specified tweetId in the request
exports.delete = (req, res) => {
  Tweet.remove(req.params.tweetId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tweet with id ${req.params.tweetId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tweet with id " + req.params.tweetId
        });
      }
    } else res.send({ message: `Tweet was deleted successfully!` });
  });
};

// Delete all Tweets from the database.
exports.deleteAll = (req, res) => {
    Tweet.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tweets."
        });
      else res.send({ message: `All Tweets were deleted successfully!` });
    });
  };