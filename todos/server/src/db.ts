const { Pool } = require("pg");

const pool_serv = new Pool({
  user: "me",
  host: "postgres",
  database: "todos",
  password: "password",
  port: 5432,
});

module.exports = pool_serv;
