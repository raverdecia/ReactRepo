const redisClient = require("../redis");

module.exports.rateLimiter = (limitSeconds, limitAmount) => async (req, res, next) => {
  const ip = req.connection.remoteAddress;
  const [response] = await redisClient.multi().incr(ip).expire(ip, limitSeconds).exec();
  console.log(response[1]);
  if (response[1] > limitAmount)
    res.json({ loggedIn: false, status: `Slow down!! Try again in a ${limitSeconds} seconds` });
  else next();
};
