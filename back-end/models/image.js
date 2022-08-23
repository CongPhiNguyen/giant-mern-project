const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    imageRoot: [{ type: String }],
    imageName: { type: "string" },
    imageOwnKey: { type: "string", default: "" },
    imageSharedKey: { type: "string", default: "" },
    ownPeople: { type: mongoose.Schema.Types.ObjectId, ref: "albums" },
    fatherAlbums: [{ type: mongoose.Schema.Types.ObjectId, ref: "albums" }],
    description: { type: "string" },
    alt: { type: "string" },
    storage: { type: "number", default: 0 },
    dimension: {
      x: { type: "number", default: 0 },
      y: { type: "number", default: 0 },
    },
    generateAt: { type: Date },
    sharedPeople: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    viewedPeople: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    isDelete: { type: "boolean", default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("images", imageSchema);
