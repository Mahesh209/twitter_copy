module.exports = app => {
    const tweets = require("../controllers/tweet.controller.js");
  
    // Create a new Tweet
    app.post("/tweet", tweets.create);
  
    // Retrieve all Tweets
    app.get("/tweets", tweets.findAll);
  
    // Retrieve a single Tweet with tweetId
    app.get("/tweets/:tweetId", tweets.findOne);
  
    // Update a Tweet with tweetId
    app.put("/tweets/:tweetId", tweets.update);
  
    // Delete a Tweet with tweetId
    app.delete("/tweets/:tweetId", tweets.delete);
  
    // Delete all Tweets
    app.delete("/tweets", tweets.deleteAll);

    // Post Tweet
    app.post("/postTweet", tweets.postTweet);

    // Retrieve all Tweets from a User with userId
    app.get("/getUserTweets/:userId", tweets.findUserTweets);

    // Retrieve all Tweets that are replies to another Tweet with parentId
    app.get("/getReplyTweets/:parentId", tweets.findReplyTweets);

    // Retweet
    app.post("/retweet", tweets.retweet);
  };