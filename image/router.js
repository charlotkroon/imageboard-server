const express = require("express");
const Image = require("./model");

const router = express.Router();

async function getImage(request, response, next) {
  try {
    const images = await Image.findAll();

    response.send(images);
  } catch (error) {
    next(error);
  }
}

router.post("/image", async (request, response, next) => {
  console.log("Is this working?");
  try {
    const { url, title } = request.body;

    const image = await Image.create({ url, title });

    response.send(image);
  } catch (error) {
    next(error);
  }
});

router.get("/image", getImage);

module.exports = router;
