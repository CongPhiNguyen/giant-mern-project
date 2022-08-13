const DEFAULT_TILE_SIZE = 256;
const OUTPUT_DIR = "output/";
const OUTPUT_FILE_NAME = "output.zip";

const sharp = require("sharp");
const fs = require("fs");

const createDZIFromBuffer = (buffer, path) => {
  sharp(buffer)
    .png()
    .tile({
      size: 64,
      overlap: 0,
    })
    .toFile(path + "output")
    .then((info) => {
      console.log(info);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = createDZIFromBuffer;
