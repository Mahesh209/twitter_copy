module.exports = app => {
    const likes = require("../controllers/like.controller.js");

    // Create a new Like
    app.post("/like", likes.create);

    // Retrieve all Likes
    app.get("/likes", likes.findAll);

    // Retrieve a single Like with likeId
    app.get("/likes/:likeId", likes.findOne);

    // Delete a Like with likeId
    app.delete("/likes/:likeId", likes.delete);

    // Delete all Likes
    app.delete("/likes", likes.deleteAll);

    // Retrieve all Likes from a User with userId
    app.get("/getUserLikes/:userId", likes.findUserLikes);

    // Retrieve all Likes on a Tweet tweetId
    app.get("/getTweetLikes/:tweetId", likes.findTweetLikes);

}