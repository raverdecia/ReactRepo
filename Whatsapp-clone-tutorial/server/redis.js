const Redist = require("ioredis");

const redisClient = new Redist();

module.exports = redisClient;
