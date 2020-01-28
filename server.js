import express from "express";
import apiRouter from "./src/routers/apiRouter";
import pagesRouter from "./src/routers/pagesRouter";
import DataController from "./src/controllers/DataController";

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + "/dist"));
app.use(express.json());

app.use("/api", apiRouter);
app.use(pagesRouter);

app.listen(port, DataController.updateData);
