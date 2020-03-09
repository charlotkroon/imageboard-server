const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/user", async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    const userCreate = await User.create(user);
    res.send(userCreate);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
