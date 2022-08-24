const express = require("express");
const imageController = require("../controllers/imageController");
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
  imageController.uploadImages
);

router.get("/get-all-own-images", imageController.getAllOwnImage);
router.get("/check-progress-upload", imageController.checkUploadProgress);
router.get("/get-concrete-image", imageController.getConcreteImagebyPathName);
router.get("/:user-root/:image-root", imageController.displayImage);
router.get("/own/search", imageController.searchOwnImage);

router.patch("/", imageController.editImage);
router.delete("/", imageController.deleteImage);

module.exports = router;
