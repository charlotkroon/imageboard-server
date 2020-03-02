const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
console.log("hello?!");

const parserMiddleware = bodyParser.json();
const imageRouter = require("./image/router");
const authRouter = require("./auth/router");

const app = express();
const port = process.env.PORT || 4000;
const corsMiddleware = cors();

app.use(corsMiddleware);
app.use(parserMiddleware);
app.use(imageRouter);
app.use(authRouter);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
