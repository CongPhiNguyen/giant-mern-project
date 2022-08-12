const Resize = require("../utilities/Resize");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const createDZIFromBuffer = require("../utilities/CreateDZI");
// const multipleUploadMiddleware = require("../middleware/uploadMultipleImage");

class imageController {
  uploadImages = async (req, res) => {
    const filePath = __dirname + "/../privates/";
    fs.promises.mkdir(filePath, { recursive: true });

    if (req.files.length !== 0) {
      req.files.forEach((file) => {
        sharp(file.buffer).toFile(filePath + `${uuidv4()}.jpg`);
      });
    }
    createDZIFromBuffer(req.files[0].buffer, __dirname + "/../privates/");
    res.status(200).send({ run: true });
  };

  displayImage = async (req, res) => {
    console.log(req.url);
    // DIsplay path here
    res.status(200).send({ run: true });
  };
}
module.exports = new imageController();
