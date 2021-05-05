const express = require("express");
const {scraper} = require("../potusScraper");
const router = express.Router();
router.get("/", (req, res) => {
  res.send({ response: "alive now" }).status(200);
});

router.get("/question", scraper);

module.exports = router;
