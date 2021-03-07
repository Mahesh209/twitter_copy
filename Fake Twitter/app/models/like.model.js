const sql = require("./db.js");
const User = require("./user.model.js");

// constructor
const Like = function(like) {
  this.userId = like.userId;
  this.tweetId = like.tweetId;
};

Like.create = (newLike, result) => {
  sql.query("INSERT INTO likes SET ?", newLike, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created like: ", { id: res.insertId, ...newLike });
    result(null, { id: res.insertId, ...newLike });
  });
};

Like.findById = (likeId, result) => {
  sql.query(`SELECT * FROM likes WHERE id = ${likeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found like: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Like with the id
    result({ kind: "not_found" }, null);
  });
};

Like.findByUserId = (userId, result) => {
    console.log(userId);
    sql.query(`SELECT * FROM likes WHERE userId = ${userId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found likes: ", res);
        result(null, res);
        return;
      }
  
      // not found Like with the id
      result({ kind: "not_found" }, null);
    });
  };

  Like.findByTweetId = (tweetId, result) => {
    sql.query(`SELECT * FROM likes WHERE tweetId = ${tweetId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found likes: ", res);
        result(null, res);
        return;
      }
  
      // not found Like with the id
      result({ kind: "not_found" }, null);
    });
  };


Like.getAll = result => {
  sql.query("SELECT * FROM likes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("likes: ", res);
    result(null, res);
  });
};

Like.remove = (id, result) => {
  sql.query("DELETE FROM likes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Like with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted like with id: ", id);
    result(null, res);
  });
};

Like.removeAll = result => {
  sql.query("DELETE FROM likes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} likes`);
    result(null, res);
  });
};

module.exports = Like;