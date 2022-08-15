const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const user = require("../models/user");
const album = require("../models/album");

class albumController {
  getAllUserAlbum = async (req, res) => {
    const schemas = [];
    // mongoose.modelNames().forEach(function (modelName) {
    //   schemas.push(mongoose.model(modelName).schema.path());
    // });

    // mongoose.model('albums').schema.path()
    // console.log("schemas", schemas);
    // console.log(mongoose.modelNames());
    // console.log(mongoose.model("users").schema);

    // console.log(req.query);
    const userInfo = await user
      .findOne({ username: req.query.username })
      .populate({ path: "ownAlbums", options: { strictPopulate: false } });
    console.log("userInfo", userInfo);
    if (userInfo === null) {
      res.status(200).send({ run: false });
    } else {
      res.status(200).send({ run: true, albumList: userInfo.ownAlbums });
    }
  };
  createAlbum = async (req, res) => {
    console.log(req.body);
    const userInfo = await user.findOne({ username: req.body.username });
    if (!userInfo) {
      res.status(200).send({ error: "User not found" });
      return;
    }
    // TODO: Add authen here
    // TODO: Check trùng tên ở đây
    const folderRoot = uuidv4();
    try {
      const filePath =
        __dirname + `/../privates/${userInfo.userRoot}/${folderRoot}`;
      fs.promises.mkdir(filePath, { recursive: true });
      const newAlbum = new album({
        albumRoot: folderRoot,
        albumName: req.body.albumTitle,
        description: req.body.description,
        ownPeople: req.body.username,
      });

      newAlbum
        .save()
        .then((data) => {
          //addAlbumToUser
          // console.log(data);
          user
            .findOneAndUpdate({ ownAlbums: [...userInfo.ownAlbums, data._id] })
            .then((data) => {
              res.status(200).send({ run: true });
            })
            .catch((err) => {
              //TODO: Rollback việc thêm album ở đây
              res.status(201).send({ run: false });
            });
        })
        .catch((err) => {
          res.status(200).send({ run: false });
        });
    } catch (e) {
      res.status(400).send({ run: false });
    }
  };
}
module.exports = new albumController();
