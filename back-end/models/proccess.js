const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const processSchema = new Schema(
  {
    userID: { type: "string" },
    imageInfoIDs: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "images" },
        state: "boolean",
      },
    ],
    state: { type: "string" },
    uuid: { type: "string" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("process", processSchema);
