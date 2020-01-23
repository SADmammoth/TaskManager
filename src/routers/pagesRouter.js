import express from "express";
import path from "path";

const router = express.Router();

let showApp = (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
};

router.all("/", showApp);

router.all("/add", showApp);

router.all("/404-error-page", showApp);

router.all("*", (req, res) => {
  res.redirect("/404-error-page");
});

export default router;
