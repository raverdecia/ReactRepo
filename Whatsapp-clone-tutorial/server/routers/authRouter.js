const express = require("express");
const validateForm = require("../controlers/validateForm");
const router = express.Router();

const { handleLoguin, attemptLogin, attemptRegistrer } = require("../controlers/authController");

router.route("/login").get(handleLoguin).post(validateForm, attemptLogin);

router.post("/register", validateForm, attemptRegistrer);

module.exports = router;
