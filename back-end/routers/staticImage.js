const express = require("express");
const imageControler = require("../controllers/imageController");
const router = express.Router();

router.get("/:userID/:imgID", imageControler.displayImage);
router.get(
  "/dzi/:userID/:imgID/:tile/:number",
  imageControler.displayDeeepZoomImage
);

module.exports = router;
