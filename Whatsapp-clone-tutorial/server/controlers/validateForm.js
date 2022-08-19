const Yup = require("yup");

const formSchema = Yup.object({
  username: Yup.string().required("Username require").min(6, "Username to short!").max(28, "Username to long!"),
  password: Yup.string().required("Password require").min(6, "Password to short!").max(28, "Password to long!"),
});

const validateForm = (req, res, next) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch(() => {
      res.status(422).send();
    })
    .then((valid) => {
      if (valid) {
        console.log("form is good");
        next();
      } else {
        res.status(422).send();
      }
    });
};

module.exports = validateForm;
