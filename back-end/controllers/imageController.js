const Resize = require("../utilities/Resize");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "congphi";
const user = require("../models/user");
const image = require("../models/image");
const process = require("../models/proccess");
const getFolderSize = require("get-folder-size");
const getFilesizeInBytes = (filename) => {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};

let imageUploadingProgress = [];
const createDZIFromBuffer = require("../utilities/CreateDZI");
// const multipleUploadMiddleware = require("../middleware/uploadMultipleImage");

const baseFilePath = __dirname + "/../privates/";

class imageController {
  uploadImages = async (req, res) => {
    //Get user root
    const ownUser = await user.findById(req.body.userID);
    if (ownUser === null) {
      res.status(201).send({ err: "User not found" });
      return;
    }

    const filePath = baseFilePath + ownUser.userRoot;
    fs.promises.mkdir(filePath, { recursive: true });
    //Add to mongo
    const fileNameList = [];

    for (let i = 0; i < req.files.length; i++) {
      const fileName = uuidv4();
      fileNameList.push(fileName);
    }

    const listIDFileSaved = [];

    let processID = uuidv4();

    const addSizeToUserDatabase = (size) => {
      user
        .findByIdAndUpdate(req.body.userID, { $inc: { storage: size } })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

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
          sharp(file.buffer).toFile(filePath + `/${fileNameList[index]}.jpg`);
          sharp(file.buffer)
            .resize({ width: 200 })
            .toFile(filePath + `/${fileNameList[index]}_resize.jpg`);

          const newImage = await new image({
            imageRoot: [ownUser.userRoot, fileNameList[index]],
            imageName: imgInfo.title,
            alt: imgInfo.alt,
            ownPeople: ownUser._id,
            storage: imgInfo.storage,
            dimension: {
              x: imgInfo.dimension.x,
              y: imgInfo.dimension.y,
            },
            description: imgInfo.description,
            generateAt: imgInfo.generateTime,
            sharedPeople: [],
            viewedPeople: [],
          })
            .save()
            .then((data) => {
              listIDFileSaved.push(data._id);
              const fileSize =
                getFilesizeInBytes(
                  filePath + `/${fileNameList[index]}_resize.jpg`
                ) +
                getFilesizeInBytes(filePath + `/${fileNameList[index]}.jpg`);
              addSizeToUserDatabase(fileSize);
            })
            .catch((err) => {});
          addNewUploadInfor("uploaded");
          console.log(imageUploadingProgress);
        } catch (err) {
          addNewUploadInfor("failed to uploaded");
        }
      }
    }
    const currentListFile = ownUser.ownImages;
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
    // console.log(currentUploadProcess);
    res
      .status(200)
      .send({ run: true, currentUploadProcess: currentUploadProcess });

    const listIDAndBool = listIDFileSaved.map((value) => {
      return { id: value, state: false };
    });

    // Create process in the database
    const newProcess = new process({
      userID: req.body.userID,
      imageInfoIDs: listIDAndBool,
      state: "running",
      uuid: processID,
    });

    let databaseProcessID;
    const finishProcessDatabase = () => {
      process
        .findByIdAndUpdate(databaseProcessID, { state: "processed" })
        .then((data) => {
          // console.log(data);
        })
        .catch((err) => {
          console.log("err add storage", err);
        });
    };
    const updateImageProcess = () => {
      req.files.forEach((file, index) => {
        try {
          createDZIFromBuffer(
            file.buffer,
            __dirname + `/../privates/${ownUser.userRoot}/`,
            `${fileNameList[index]}`,
            () => {
              const dir =
                __dirname +
                `/../privates/${ownUser.userRoot}/${fileNameList[index]}`;
              // fastFolderSize(
              //   __dirname +
              //     `/../privates/${ownUser.userRoot}/${fileNameList[index]}`,
              //   (err, bytes) => {
              //     if (err) {
              //     } else addSizeToUserDatabase(bytes);
              //   }
              // );
              getFolderSize(dir, function (err, size) {
                if (err) {
                  throw err;
                } else {
                  addSizeToUserDatabase(size);
                }
              });
              const updateProcess = () => {
                process
                  .findByIdAndUpdate(
                    databaseProcessID,
                    {
                      $set: {
                        "imageInfoIDs.$[imageInfoID].state": true,
                      },
                    },
                    {
                      arrayFilters: [
                        { "imageInfoID.id": listIDFileSaved[index] },
                      ],
                    }
                  )
                  .then((data) => {
                    // console.log(data);
                  })
                  .catch((er) => {
                    console.log(er);
                  });
              };
              // Cập nhật thành công thay đổi database
              updateProcess();
              for (let i = 0; i < imageUploadingProgress.length; i++) {
                if (imageUploadingProgress[i].id === processID) {
                  imageUploadingProgress[i].img[index] = "deepzoom created";
                }
                if (
                  imageUploadingProgress[i].img.every(
                    (value) =>
                      value === "deepzoom created" ||
                      value === "deepzoom created failed"
                  )
                ) {
                  finishProcessDatabase();
                }
                // console.log(imageUploadingProgress[i].img);
              }
            }
          );
        } catch (err) {
          const updateProcess = () => {
            process
              .findByIdAndUpdate(
                databaseProcessID,
                {
                  $set: {
                    "imageInfoIDs.$[imageInfoID].state": true,
                  },
                },
                {
                  arrayFilters: [{ "imageInfoID.id": listIDFileSaved[index] }],
                }
              )
              .then((data) => {
                // console.log(data);
              })
              .catch((er) => {
                console.log(er);
              });
          };
          // Cập nhật thành công thay đổi database
          updateProcess();
          for (let i = 0; i < imageUploadingProgress.length; i++) {
            if (imageUploadingProgress[i].id === processID) {
              imageUploadingProgress[i].img[index] = "deepzoom created failed";
              if (
                imageUploadingProgress[i].img.every(
                  (value) =>
                    value === "deepzoom created" ||
                    value === "deepzoom created failed"
                )
              ) {
                finishProcessDatabase();
              }
            }
          }
        }
      });
    };
    await newProcess
      .save()
      .then((data) => {
        databaseProcessID = data._id;
        updateImageProcess();
      })
      .catch((err) => {});
  };

  checkUploadProgress = async (req, res) => {
    // console.log("req.query", req.query);
    // console.log(imageUploadingProgress)

    // database
    process
      .find({ userID: req.query.userID })
      .populate("imageInfoIDs.id")
      .then((data) => {
        res.status(200).send({ success: true, data: data });
      })
      .catch((err) => {
        res.status(200).send({
          success: false,
          err: err,
          message: err.message,
        });
      });
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
        res.status(400).send({
          err: err.message,
        });
      } else {
      }
    });
  };

  displayDeeepZoomImage = async (req, res) => {
    // console.log(req.url);
    // console.log(req.params);
    // console.log(req.cookies);
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
        res.status(400).send({
          err: err.message,
        });
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

  getConcreteImagebyPathName = async (req, res) => {
    const verifyUser = (nextFunction) => {
      jwt.verify(req.cookies._jwt, JWT_SECRET, function (err, decoded) {
        if (err) {
          console.log(err);
          res.status(200).send({ success: false, err: err.message });
        } else {
          console.log(decoded);
          if (decoded?.userID) {
            nextFunction(decoded.userID);
          } else res.status(200).send({ success: false, err: err.message });
        }
      });
    };
    const checkPermitAndSendInfor = (userID) => {
      image
        .findOne({
          imageRoot: [req.query.userID, req.query.imgID],
          $or: [{ ownPeople: userID }, { sharedPeople: userID }],
        })
        .then((data) => {
          // console.log(data);
          res.status(201).send({
            success: true,
            find: true,
            imgInfo: data,
          });
        })
        .catch((err) => {
          res.status(201).send({ sucess: false, find: false });
        });
    };
    verifyUser((userID) => {
      checkPermitAndSendInfor(userID);
    });
  };

  deleteImage = async (req, res) => {
    console.log("req.query", req.query);
    console.log("req.cookies", req.cookies);

    // With database
    const deleteImageInImage = (nextFunction) => {
      image
        .findByIdAndDelete(req.query.imgID)
        .then((data) => {
          nextFunction();
        })
        .catch((err) => {
          res.status(400).send({
            success: true,
            message: "Fail to delete image in user database",
          });
        });
    };

    const deleteImageInUser = (nextFunction) => {
      user
        .findByIdAndUpdate(req.query.ownUserID, {
          $pull: { ownImages: req.query.imgID },
        })
        .then((data) => {
          nextFunction();
        })
        .catch((err) => {
          res.status(400).send({
            success: true,
            message: "Fail to delete image in user database",
          });
        });
    };

    // With server
    const deleteImageAndFolderInServer = (nextFunction) => {
      const imagePath = baseFilePath + JSON.parse(req.query.path).join("/");
      console.log(imagePath);
      try {
        fs.rmSync(imagePath, { recursive: true, force: true });
        fs.unlink(imagePath + ".jpg", (err) => {
          if (err) {
            throw err;
          } else
            fs.unlink(imagePath + "_resize.jpg", (err) => {
              if (err) {
                throw err;
              } else nextFunction();
            });
        });
      } catch (err) {
        res.status(400).send({
          err: err.message,
          message: "Failed to delete image in host server",
        });
      }
    };

    const finalFunction = () => {
      res
        .status(200)
        .send({ success: true, message: "Delete image successfully" });
    };

    // Final chain
    deleteImageInUser(() => {
      deleteImageInImage(() => {
        deleteImageAndFolderInServer(() => {
          finalFunction();
        });
      });
    });
  };

  editImage = async (req, res) => {
    console.log(req.body);
    console.log(req.cookies);

    let editInfo = {};
    if (req.body.imageName) {
      editInfo.imageName = req.body.imageName;
    }
    if (req.body.description) {
      editInfo.description = req.body.description;
    }
    if (req.body.alt) {
      editInfo.alt = req.body.alt;
    }
    image
      .findByIdAndUpdate(req.body.id, editInfo)
      .then((data) => {
        res.status(200).send({ success: true });
      })
      .catch((err) => {
        res.status(204).send({
          err: err.message,
          message: "Error when changing image information",
        });
      });
  };

  getAllReceivedImage = async (req, res) => {
    // console.log(req.query);
    console.log("get user received image");
    await user
      .findById(req.query.userID)
      .populate({ path: "receivedImages", options: { strictPopulate: false } })
      .then((data) => {
        res
          .status(200)
          .send({ success: true, imageInfo: data.receivedImages || [] });
      })
      .catch((err) => {
        res.status(200).send({
          success: false,
          err: err.message,
          message: "Can't get user received images",
        });
      });
  };

  searchOwnImage = async (req, res) => {
    console.log(req.query);
    let searchInfo = { ownPeople: req.query.userID };
    if (req.query.namePattern) {
      searchInfo.imageName = { $regex: req.query.namePattern };
    }
    if (req.query.altPattern) {
      searchInfo.alt = { $regex: req.query.altPattern };
    }
    if (req.query.descriptionPattern) {
      searchInfo.description = { $regex: req.query.descriptionPattern };
    }
    if (req.query.fromDate) {
      searchInfo.createdAt = {
        $gte: new Date(req.query.fromDate),
        $lt: new Date(req.query.toDate),
      };
    }
    await image
      .find(searchInfo)
      .then((data) => {
        res.status(200).send({ success: true, data: data });
      })
      .catch((err) => {
        res.status(201).send({ success: false, err: err.message });
      });
  };
}
module.exports = new imageController();
