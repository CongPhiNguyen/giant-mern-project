const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig.js"); // connect MongoDB
const PORT = process.env.PORT || 5000; // port number
const app = express();
const cookieParser = require("cookie-parser");
const route = require("./routers/index"); // router impl
// const multer = require("multer");
const bodyParser = require("body-parser");

app.use(cookieParser());
app.use("/privates", express.static("./privates"));
// const upload = multer();
//some middleware
app.use(
  cors({ credentials: true, origin: "https://album-mern-project.vercel.app" })
);
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static("public"));

//connect to MongoDB
connectDB();
// pass app into router
route(app);

//app listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
