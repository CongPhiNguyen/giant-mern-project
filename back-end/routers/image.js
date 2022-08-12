const express = require("express");
const imageControler = require("../controllers/imageController");
const router = express.Router();
const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "./images/"));
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
//     );
//   },
// });

// const multi_upload = multer({
//   storage,
// }).array("listImage", 10);

router.post(
  "/upload",
  multer().array("listImages"),
  imageControler.uploadImages
);

router.get("/:id", imageControler.displayImage);

module.exports = router;
