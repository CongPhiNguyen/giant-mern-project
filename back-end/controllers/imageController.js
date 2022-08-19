const Resize = require("../utilities/Resize");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const user = require("../models/user");
const image = require("../models/image");
let imageUploadingProgress = [];
const createDZIFromBuffer = require("../utilities/CreateDZI");
// const multipleUploadMiddleware = require("../middleware/uploadMultipleImage");

class imageController {
  uploadImages = async (req, res) => {
    console.log("req.err", req.err);
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

    let processID = uuidv4();

    if (req.files.length !== 0) {
      imageUploadingProgress.push({ id: processID, img: [] });
      for (let index = 0; index < req.files.length; index++) {
        const file = req.files[index];
        let imgInfo;
        if (req.files.length !== 1) {
          imgInfo = JSON.parse(req.body.imgInfo[index]);
        } else imgInfo = JSON.parse(req.body.imgInfo);
        const addNewUploadInfor = (imgInfo) => {
          imageUploadingProgress.forEach((value) => {
            if (value.id === processID) {
              value.img.push(imgInfo);
            }
          });
        };
        try {
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
          addNewUploadInfor("uploaded");
          console.log(imageUploadingProgress);
          // console.log("aaa");
          // imageUploadingProgress.[processID].push("uploaded");
        } catch (err) {
          addNewUploadInfor("failed to uploaded");
          // imageUploadingProgress.[processID].push("failed to uploaded");
        }
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
    let currentUploadProcess = {};
    for (let i = 0; i < imageUploadingProgress.length; i++) {
      if (imageUploadingProgress[i].id == processID)
        currentUploadProcess = imageUploadingProgress[i];
    }
    console.log(currentUploadProcess);
    res
      .status(200)
      .send({ run: true, currentUploadProcess: currentUploadProcess });

    req.files.forEach((file, index) => {
      try {
        createDZIFromBuffer(
          file.buffer,
          __dirname + `/../privates/${ownUser.userRoot}/`,
          `${fileNameList[index]}`,
          () => {
            for (let i = 0; i < imageUploadingProgress.length; i++) {
              if (imageUploadingProgress[i].id === processID) {
                imageUploadingProgress[i].img[index] = "deepzoom created";
              }
            }
          }
        );
      } catch (err) {
        for (let i = 0; i < imageUploadingProgress.length; i++) {
          if (imageUploadingProgress[i].id === processID) {
            imageUploadingProgress[i].img[index] = "deepzoom created failed";
          }
        }
      }
    });
  };

  checkUploadProgress = async (req, res) => {
    console.log("req.query", req.query);
    console.log(imageUploadingProgress);
    let currentProcess;
    imageUploadingProgress.forEach((value) => {
      if (value.id == req.query.processID) {
        currentProcess = value;
      }
    });
    res.status(200).send({ run: true, currentProcess: currentProcess });
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
