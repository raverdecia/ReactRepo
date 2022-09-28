const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redisClient = require("./redis");
const { sessionMiddleware, wrap, corsConfig } = require("./controlers/serverController");
const { authorizeUser, addFriend, initializeUser } = require("./controlers/socketContrtoller");
require("dotenv").config();

const server = require("http").createServer(app);

const io = new Server(server, {
  cors: corsConfig,
});
app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);

app.use("/auth", authRouter);

io.use(wrap(sessionMiddleware));
io.use(authorizeUser);
io.on("connect", (socket) => {
  initializeUser(socket);
  socket.on("add_friend", (friendName, cb) => {
    addFriend(socket, friendName, cb);
  });
});

server.listen(4000, () => {
  console.log("listening in port 4000");
});
