const router = require("express").Router();
const User = require("../models/user");
const crypto =require ("crypto");
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = crypto.createHash("sha256").update(req.body.password).digest("hex");
  const newUser = new User({ username, email, password });
  newUser
    .save()
    .then(() => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "*");
      res.json("User has been added");
    })
    .catch((err) => res.status(400).json("ERROR" + err));
});

module.exports = router;
