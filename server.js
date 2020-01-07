const express = require("express");
const port = process.env.PORT || 8080;
const app = express();

const apiRouter = require("./src/routers/apiRouter.js");
const pagesRouter = require("./src/routers/pagesRouter.js");

app.use(express.static(__dirname + "/dist"));

app.use(apiRouter);
app.use(pagesRouter);

app.listen(port);
