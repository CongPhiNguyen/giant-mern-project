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
  multer({
    limits: { fileSize: 10 * 1024 * 1024 },
    onError: function (err, next) {
      console.log("error", err);
      req.err = true;
      next();
    },
  }).array("listImages"),
  imageControler.uploadImages
);

router.get("/get-all-own-images", imageControler.getAllOwnImage);
router.get("/check-progress-upload", imageControler.checkUploadProgress);

// router.get("/dzi/:user-root/:image-root", imageControler.displayImage);
router.get("/:user-root/:image-root", imageControler.displayImage);

module.exports = router;
