const Resize = require("../utilities/Resize");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const user = require("../models/user");
const image = require("../models/image");

const createDZIFromBuffer = require("../utilities/CreateDZI");
// const multipleUploadMiddleware = require("../middleware/uploadMultipleImage");

class imageController {
  uploadImages = async (req, res) => {
    console.log("req.body", req.body);
    //Get user root
    const ownUser = await user.findById(req.body.userID);
    if (ownUser === null) {
      res.status(201).send({ err: "User not found" });
      return;
    }
    const filePath = __dirname + `/../privates/${ownUser.userRoot}/`;
    fs.promises.mkdir(filePath, { recursive: true });
    //Add to mongo
    const fileNameList = [];

    for (let i = 0; i < req.files.length; i++) {
      const fileName = uuidv4();
      fileNameList.push(fileName);
    }

    if (req.files.length !== 0) {
      req.files.forEach((file, index) => {
        const imgInfo = JSON.parse(req.body.imgInfo[index]);
        sharp(file.buffer).toFile(filePath + `${fileNameList[index]}.jpg`);
        const newImage = new image({
          imageRoot: [ownUser.userRoot, fileNameList[index]],
          imageName: imgInfo.title,
          ownPeople: ownUser._id,
          dimension: {
            x: imgInfo.dimension.x,
            y: imgInfo.dimension.y,
          },
          generateAt: imgInfo.generateTime,
          sharedPeople: [],
          viewedPeople: [],
        }).save();
      });
    }
    res.status(200).send({ run: true });
    // Create deepzoom
    // try {
    //   req.files.forEach((file, index) => {
    //     createDZIFromBuffer(
    //       file.buffer,
    //       __dirname + `/../privates/${ownUser.userRoot}/`,
    //       `${fileNameList[index]}`
    //     );
    //   });

    //   res.status(200).send({ run: true });
    // } catch (err) {
    //   res.status(400).send({ run: false });
    // }
  };

  displayImage = async (req, res) => {
    console.log(req.url);
    // DIsplay path here
    res.status(200).send({ run: true });
  };
}
module.exports = new imageController();
