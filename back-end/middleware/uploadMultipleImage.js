// const util = require("util");
// const path = require("path");
// const multer = require("multer");

// let storage = multer.diskStorage({
//   // Định nghĩa nơi file upload sẽ được lưu lại
//   destination: (req, file, callback) => {
//     callback(null, path.join(`${__dirname}/../../uploadResults`));
//   },
//   filename: (req, file, callback) => {
//     try {
//       let math = ["image/png", "image/jpeg"];
//       if (math.indexOf(file.mimetype) === -1) {
//         let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
//         return callback(errorMess, null);
//       }
//       let filename = `${Date.now()}-trungquandev-${file.originalname}`;
//       callback(null, filename);
//     } catch (err) {
//       console.log("Lỗi ở bước 1", err);
//     }
//   },
// });

// // Let async-await call this middleware
// let multipleUploadMiddleware = util.promisify((req, res, next) => {
//   try {
//     multer({ storage: storage }).array("listImage[]", 17)(req, res, next);
//   } catch (e) {
//     console.log("error", e);
//   }
// });

// module.exports = multipleUploadMiddleware;
