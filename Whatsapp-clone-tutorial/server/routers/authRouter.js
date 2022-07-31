const express = require("express");
const router = express.Router();
const Yup = require("yup");

const formSchema = Yup.object({
  username: Yup.string().required("Username require").min(6, "Username to short!").max(28, "Username to long!"),
  password: Yup.string().required("Password require").min(6, "Password to short!").max(28, "Password to long!"),
});

router.post("/login", (req, res) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch((err) => {
      res.status(422).send();
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        console.log("form is good");
      }
    });
});

router.post("/signup", (req, res) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch((err) => {
      res.status(422).send();
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        console.log("form is good");
      }
    });
});

module.exports = router;
