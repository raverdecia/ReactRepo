const express = require("express");
const validateForm = require("../controlers/validateForm");
const router = express.Router();
const { handleLoguin, attemptLogin, attemptRegistrer } = require("../controlers/authController");
const { rateLimiter } = require("../controlers/rateLimiter");

router.route("/login").get(handleLoguin).post(validateForm, rateLimiter(60, 10), attemptLogin);

router.post("/register", validateForm, rateLimiter(30, 4), attemptRegistrer);

module.exports = router;
