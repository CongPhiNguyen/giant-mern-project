const userRouter = require("./user.js");
const otpRouter = require("./otp.js");
const imgRouter = require("./image.js");
const staticImgRouter = require("./staticImage.js");
function route(app) {
  app.use("/api/user", userRouter);
  app.use("/api/otp", otpRouter);
  app.use("/api/image", imgRouter);
  app.use("/images/", staticImgRouter);
}

module.exports = route;
