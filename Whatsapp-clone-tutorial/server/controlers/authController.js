const pool = require("../db");
const bcrypt = require("bcrypt");

module.exports.handleLoguin = (req, res) => {
  if (req.session.user && req.session.user.username) {
    res.json({ loggedIn: true, username: req.session.user.username });
  } else {
    res.json({ loggedIn: false });
  }
};

module.exports.attemptLogin = async (req, res) => {
  const potencialLoguin = await pool.query("SELECT id, username, passhash FROM users u WHERE u.username=$1", [
    req.body.username,
  ]);
  if (potencialLoguin.rowCount > 0) {
    const isSamePass = await bcrypt.compare(req.body.password, potencialLoguin.rows[0].passhash);

    if (isSamePass) {
      //login

      req.session.user = {
        username: req.body.username,
        id: potencialLoguin.rows[0].id,
      };
      res.json({ loggedIn: true, username: req.body.username });
    } else {
      //not loguin
      console.log("not good");
      res.json({ loggedIn: false, status: "Wrong username or password!" });
    }
  } else {
    //not loguin
    console.log("not good");
    res.json({ loggedIn: false, status: "Wrong username or password!" });
  }
};

module.exports.attemptRegistrer = async (req, res) => {
  const existingUser = await pool.query("SELECT username FROM users WHERE username=$1", [req.body.username]);
  if (existingUser.rowCount === 0) {
    //register
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users (username, passhash) VALUES ($1, $2) RETURNING id, username",
      [req.body.username, hashedPass]
    );
    req.session.user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
    };
    res.json({ loggedIn: true, username: req.body.username });
  } else {
    res.json({ loggedIn: false, status: "Username taken" });
  }
};
