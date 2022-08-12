const express = require("express");
const imageControler = require("../controllers/imageController");
const router = express.Router();

router.get("*", imageControler.displayImage);

module.exports = router;
