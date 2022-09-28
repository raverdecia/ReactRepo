const redisClient = require("../redis");

module.exports.authorizeUser = (socket, next) => {
  if (!socket.request.session || !socket.request.session.user) {
    console.log("Bad request");
    next(new Error("Not Authorized"));
  } else {
    next();
  }
};
module.exports.initializeUser = async (socket) => {
  socket.user = { ...socket.request.session.user };
  await redisClient.hset(`userid:${socket.user.username}`, "userid", socket.user.userid);
  const friendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);
  socket.emit("friends", friendList);

  console.log("conectado por socket io");
  console.log("user id:", socket.user.userid, "/ username:", socket.request.session.user.username);
  console.log(friendList);
};

module.exports.addFriend = async (socket, friendName, cb) => {
  if (friendName === socket.user.username) {
    cb({ done: false, errorMsg: "Cannot log self!" });
    return;
  }
  const friendUserID = await redisClient.hget(`userid:${friendName}`, "userid");
  const currentFriendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);
  if (!friendUserID) {
    cb({ done: false, errorMsg: "User doesn´t exist!" });
    return;
  }
  if (currentFriendList && currentFriendList.indexOf(friendName) !== -1) {
    cb({ done: false, errorMsg: "Friend already added!" });
    return;
  }
  await redisClient.lpush(`friends:${socket.user.username}`, friendName);
  cb({ done: true });
  //cb({ done: false, errorMsg: "sdfksjdhfjksd" });
};
