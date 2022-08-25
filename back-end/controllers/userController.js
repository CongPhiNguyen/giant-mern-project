const user = require("../models/user");
const image = require("../models/image");

const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const SALT_ROUND = 10;
const JWT_SECRET = "congphi";
const otpController = require("./otpController");

const parseJwt = require("../utilities/JWT");

const createUserFolder = (username) => {
  const filePath = __dirname + "/../privates/" + username;
  fs.promises.mkdir(filePath, { recursive: true });
};

// TODO: verified user when sign up
class userController {
  getUser = async (req, res) => {
    // console.log("req", req);
    // res.status(200).send({ run: true });
    await user
      .find()
      .exec()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        console.log(error.message);
        res.status(200).send(JSON.stringify({ error: error.message }));
      });
  };

  getUserByID = async (req, res) => {
    // console.log("req", req);
    // res.status(200).send({ run: true });
    // console.log(req.params.id);
    await user
      .findOne({ _id: req.params.id })
      .exec()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        console.log(error.message);
        res.status(200).send(JSON.stringify({ error: error.message }));
      });
  };

  hasUsername = async (req, res) => {
    console.log("req.body", req.body);
    let dataUser;
    try {
      dataUser = await user.find({ username: req.body.username }).exec();
      // console.log("dataUser", dataUser);
    } catch (error) {
      res.status(400).send({
        error: true,
        find: false,
      });
    }

    if (dataUser === null || dataUser?.length === 0) {
      res.status(200).send({
        error: false,
        find: false,
      });
    } else {
      res.status(200).send({
        error: false,
        find: true,
      });
    }
  };

  hasEmail = async (req, res) => {
    // console.log("req.body", req.body);
    let dataUser;
    try {
      dataUser = await user.find({ email: req.body.email }).exec();
      // console.log("dataUser", dataUser);
    } catch (error) {
      res.status(400).send({
        error: true,
        find: false,
      });
    }

    if (dataUser === null || dataUser.length == 0) {
      res.status(200).send({
        error: false,
        find: false,
      });
    } else {
      res.status(200).send({
        error: false,
        find: true,
      });
    }
  };

  checkLoginInfo = async (req, res) => {
    console.log("req.body Login", req.body);
    const validateOTP = await otpController.checkOTP(
      req.body.username,
      req.body.otp,
      req.body.time
    );
    if (true || validateOTP?.success) {
      let dataUser;
      try {
        dataUser = await user.findOne({ username: req.body.username }).exec();
        console.log("dataUser", dataUser);
      } catch (error) {
        res.status(400).send({
          error: true,
          success: false,
        });
      }
      if (dataUser === null || dataUser.length == 0) {
        res.status(200).send({
          error: false,
          success: false,
        });
      } else {
        if (
          bcrypt.compareSync(
            req.body.password + dataUser.salt,
            dataUser.password
          )
        ) {
          let token = jwt.sign(
            {
              userID: dataUser._id,
              email: dataUser.email,
              username: dataUser.username,
            },
            JWT_SECRET
          );
          console.log(token);
          res.status(200).send({
            error: false,
            success: true,
            token: token,
          });
        } else
          res.status(400).send({
            error: false,
            success: false,
          });
      }
    } else {
      res.status(400).send({
        error: true,
        success: false,
      });
    }
  };

  signUp = async (req, res) => {
    console.log("req.body", req.body);
    const salt = crypto.randomBytes(20).toString("hex");
    const hashPass = bcrypt.hashSync(req.body.password + salt, SALT_ROUND);
    const userRoot = uuidv4();
    try {
      const newUser = new user({
        email: req.body.email,
        password: hashPass,
        username: req.body.username,
        salt: salt,
        userRoot: userRoot,
      });
      newUser
        .save()
        .then((data) => {
          console.log("data", data);
          createUserFolder(userRoot);
          res.status(200).send({
            error: false,
            success: true,
          });
        })
        .catch((error) => {
          console.log("error.message", error.message);
          res.status(400).send({
            error: true,
            success: false,
          });
        });
    } catch (error) {
      res.status(400).send({
        error: true,
        success: false,
      });
    }
    // res.status(200).send({ run: true });
  };

  ignoreOption = async (req, res) => {
    console.log("aaa");
    res.status(200).send({ optionDetect: true });
    return;
  };

  verifyUser = async (req, res) => {
    if (!req.body.token)
      return res.status(401).send({ message: "Unathorized token", run: false });
    const decodeToken = jwt.verify(req.body.token, JWT_SECRET);

    const userInfo = user
      .findOne({ email: decodeToken.email, username: decodeToken.username })
      .then((data) => {
        // console.log(data);
        if (data !== null)
          res.status(200).send({ run: true, username: data.username });
        else
          return res.status(404).send({ message: "Use notfound", run: false });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send({ run: false });
      });
  };

  getConcreteUserInfo = async (req, res) => {
    // console.log(req.query);
    const token = req.query.token;
    try {
      let jwtInfo = parseJwt(token);
      // console.log("jwtInfo", jwtInfo);
      const userInfo = await user.findOne({ username: jwtInfo.username });
      if (userInfo === null || userInfo === {}) {
        res.status(201).send({ find: false });
      } else res.status(200).send({ find: true, userInfo: userInfo });
    } catch (e) {
      console.log(e);
      res.status(400).send({ error: "Unauthorize token", find: false });
    }
  };

  searchUser = async (req, res) => {
    console.log("req.query", req.query);
    if (!req.query.pattern) {
      res.status(200).send({ success: false });
    } else {
      user
        .find({
          $or: [
            {
              username: { $regex: req.query.pattern },
              _id: { $ne: req.query.userID },
            },
            {
              email: { $regex: req.query.pattern },
              _id: { $ne: req.query.userID },
            },
          ],
        })
        .then((data) => res.status(200).send({ success: true, userInfo: data }))
        .catch((err) => {
          res.status(200).send({ success: false, err: err.message });
        });
    }
  };

  grantedAccess = async (req, res) => {
    console.log(req.query);
    const addImageIDToUser = (nextFunction) => {
      user
        .findByIdAndUpdate(req.query.userID, {
          $push: { receivedImages: req.query.imageID },
        })
        .then((data) => {
          nextFunction();
        })
        .catch((err) => {
          res.status(200).send({
            success: false,
            err: err.message,
            message: "Can't add imageID into user",
          });
        });
    };
    const addImageReceiverUser = (nextFunction) => {
      image
        .findByIdAndUpdate(req.query.imageID, {
          $push: { sharedPeople: req.query.userID },
        })
        .then((data) => {
          nextFunction();
        })
        .catch((err) => {
          res.status(200).send({
            success: false,
            err: err.message,
            message: "Can't add userID into image",
          });
        });
    };
    const finalFunction = () => {
      res.status(200).send({ success: true });
    };

    addImageIDToUser(() => {
      addImageReceiverUser(() => {
        finalFunction();
      });
    });
  };
}

module.exports = new userController();
