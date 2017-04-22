var friends = require("../data/friends");
var comp = [];
var currentFriend;
var newFriend;
var prevFriend;
var index;
var check = true;

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    friends.push(req.body);
    if (friends.length > 2) {
      for (var i = 0; i < friends.length - 1; i++) {
        var sum = 0; 
        for (var j = 0; j < friends[i].scores.length; j++) {
          sum += Math.abs(Number(friends[i].scores[j]) - Number(req.body.scores[j]));
        }
        prevFriend = sum;
        console.log("prevFriend: " + prevFriend + " | currentFriend: " + currentFriend);
        if (prevFriend < currentFriend && !check) {
          currentFriend = prevFriend;
          index = i;
          console.log("NEW prevFriend: " + prevFriend + " | currentFriend: " + currentFriend + " | index: " + index);
        }
      }
      console.log("Right here: " + JSON.stringify(friends[index]));
      currentFriend = 1000;
      res.json(friends[index]);
    } else {
      res.json(friends[0]);
      console.log("Right here2: " + JSON.stringify(friends[index]));
      currentFriend = 1000;
      check = false;
    }
  });
};