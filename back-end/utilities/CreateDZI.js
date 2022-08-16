const sharp = require("sharp");
const fs = require("fs");
const extract = require("extract-zip");

const createDZIFromBuffer = (buffer, path, fileName) => {
  sharp(buffer)
    .png()
    .tile({
      size: 256,
      overlap: 0,
    })
    .toFile(path + fileName + ".zip")
    .then((info) => {
      console.log(info);
      try {
        extract(path + fileName + ".zip", { dir: path + fileName })
          .then(() => {
            console.log("Extraction complete");
            fs.unlink(path + fileName + ".zip", (err) => {
              if (err) throw err;
              console.log(`${path + fileName + ".zip"} was deleted`);
            });
          })
          .catch((err) => {
            console.log("err", err);
          });
      } catch (err) {
        console.log("err", err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = createDZIFromBuffer;
