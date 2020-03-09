const { Router } = require("express");
const Image = require("./model");
const auth = require("../auth/middleware");

const router = new Router();
router.get("/image", (request, response, next) => {
  Image.findAll()
    .then(images => response.send(images))
    .catch(next);
});

router.post("/image", auth, (request, response, next) => {
  Image.create(request.body)
    .then(image => response.send(image))
    .catch(next);
});

module.exports = router;
