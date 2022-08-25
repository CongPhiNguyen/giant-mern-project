const fastFolderSize = require("fast-folder-size");

const getFilesizeInBytes = (filename) => {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};

const getFolderSize = (path) => {
  fastFolderSize("path", (err, bytes) => {
    if (err) {
      throw err;
    }

    console.log(bytes);
  });
};

module.exports = {
  getFilesizeInBytes,
  getFolderSize,
};
