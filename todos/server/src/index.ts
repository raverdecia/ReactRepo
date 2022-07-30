import express from "express";
const app = express();
const cors = require("cors");
const { Client } = require("pg");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const indexRouter = require("./routes/indexRouter");

app.use("/", indexRouter);

app.listen(3001);
