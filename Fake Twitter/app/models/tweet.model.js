const sql = require("./db.js");
const User = require("./user.model.js");

// constructor
const Tweet = function(tweet) {
  this.userId = tweet.userId;
  this.parentId = tweet.parentId;
  this.content = tweet.content;
  this.isRetweet = tweet.isRetweet;
};

Tweet.create = (newTweet, result) => {
  sql.query("INSERT INTO tweets SET ?", newTweet, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tweet: ", { id: res.insertId, ...newTweet });
    result(null, { id: res.insertId, ...newTweet });
  });
};

Tweet.findById = (tweetId, result) => {
  sql.query(`SELECT * FROM tweets WHERE id = ${tweetId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tweet: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tweet with the id
    result({ kind: "not_found" }, null);
  });
};

Tweet.findByUserId = (userId, result) => {
    console.log(userId);
    sql.query(`SELECT * FROM tweets WHERE userId = ${userId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found tweets: ", res);
        result(null, res);
        return;
      }
  
      // not found Tweet with the id
      result({ kind: "not_found" }, null);
    });
  };

  Tweet.findByParentId = (parentId, result) => {
    sql.query(`SELECT * FROM tweets WHERE parentId = ${parentId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found tweets: ", res);
        result(null, res);
        return;
      }
  
      // not found Tweet with the id
      result({ kind: "not_found" }, null);
    });
  };


Tweet.getAll = result => {
  sql.query("SELECT * FROM tweets", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tweets: ", res);
    result(null, res);
  });
};

Tweet.updateById = (id, tweet, result) => {
  sql.query(
    "UPDATE tweets SET content = ?, updateTime = now() WHERE id = ?",
    [tweet.content, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tweet with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tweet: ", { id: id, ...tweet });
      result(null, { id: id, ...tweet });
    }
  );
};

Tweet.remove = (id, result) => {
  sql.query("DELETE FROM tweets WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tweet with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tweet with id: ", id);
    result(null, res);
  });
};

Tweet.removeAll = result => {
  sql.query("DELETE FROM tweets", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tweets`);
    result(null, res);
  });
};

module.exports = Tweet;