const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const User = require("../user/model");
const bcrypt = require("bcrypt");
const auth = require("../auth/middleware");

const router = new Router();

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(400).send({
      message: "please suppy a valid email and password"
    });
  } else {
    // find user by email
    User.findOne({
      where: { email: req.body.email }
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: "user with that email does not exist"
          });
        } else if (bcrypt.compareSync(req.body.password, entity.password)) {
          res.send({
            jwt: toJWT({ userId: entity.id })
          });
        } else {
          res.status(400).send({
            message: "password was incorrect"
          });
        }
      })
      .catch(next);
  }
});

router.get("/user", (req, res, next) => {
  User.findAll({ include: [Image] })
    .then(users => {
      if (users) {
        users.map(user => (user.password = ""));
        res.json(users);
      } else {
        res.status(404).send({
          message: "Sorry no Users found"
        });
      }
    })
    .catch(next);
});

router.get("/secret-endpoint", auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}`
  });
});

module.exports = router;
