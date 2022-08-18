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

    const listIDFileSaved = [];

    if (req.files.length !== 0) {
      for (let index = 0; index < req.files.length; index++) {
        const file = req.files[index];
        let imgInfo;
        if (req.files.length !== 1) {
          imgInfo = JSON.parse(req.body.imgInfo[index]);
        } else imgInfo = JSON.parse(req.body.imgInfo);
        sharp(file.buffer).toFile(filePath + `${fileNameList[index]}.jpg`);
        sharp(file.buffer)
          .resize({ width: 200 })
          .toFile(filePath + `${fileNameList[index]}_resize.jpg`);
        const newImage = await new image({
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
        })
          .save()
          .then((data) => {
            // console.log(data._id);
            listIDFileSaved.push(data._id);
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    }
    // console.log(listIDFileSaved);
    const currentListFile = ownUser.ownImages;
    // console.log([...currentListFile, ...listIDFileSaved]);
    await user
      .findByIdAndUpdate(req.body.userID, {
        ownImages: [...currentListFile, ...listIDFileSaved],
      })
      .then((data) => {
        // console.log(data);
      })
      .catch((err) => {
        //TODO: Rollback added image
        console.log("err", err);
      });
    res.status(200).send({ run: true });
    try {
      req.files.forEach((file, index) => {
        createDZIFromBuffer(
          file.buffer,
          __dirname + `/../privates/${ownUser.userRoot}/`,
          `${fileNameList[index]}`
        );
      });
    } catch (err) {
      console.log("error when create dzi");
    }
  };

  displayImage = async (req, res) => {
    // console.log(req.url);
    const [dirName, fileName] = req.url.slice(1).split("/");
    // console.log(__dirname + `../privates/${dir}`);

    let options = {
      root: dirName + `/../privates/${dirName}`,
    };

    // var fileName = "GeeksforGeeks.txt";
    res.sendFile(fileName + ".jpg", options, function (err) {
      if (err) {
        console.log("err", err);
      } else {
        // console.log("Sent:", fileName);
      }
    });
  };

  displayDeeepZoomImage = async (req, res) => {
    // console.log(req.url);
    // console.log(req.params);
    const [dirName, fileName] = req.url.slice(1).split("/");
    // console.log(__dirname + `../privates/${dir}`);

    let options = {
      root:
        dirName +
        `/../privates/${req.params.userID}/${req.params.imgID}/${req.params.imgID}_files/${req.params.tile}/`,
    };

    // var fileName = "GeeksforGeeks.txt";
    res.sendFile(req.params.number, options, function (err) {
      if (err) {
        // console.log("err", err);
      } else {
        // console.log("Sent:", fileName);
      }
    });
  };

  getAllOwnImage = async (req, res) => {
    // console.log(req.query);
    console.log("get user image");
    const dataUser = await user
      .findById(req.query.userID)
      .populate({ path: "ownImages", options: { strictPopulate: false } });
    // console.log("dataUser", dataUser);
    res.status(200).send({ run: true, imageInfo: dataUser?.ownImages || [] });
  };
}
module.exports = new imageController();
