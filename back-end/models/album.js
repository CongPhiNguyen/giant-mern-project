const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema(
  {
    albumRoot: { type: "string" },
    albumName: { type: "string" },
    albumOwnKey: { type: "string", default: "" },
    albumSharedKey: { type: "string", default: "" },
    fatherAlbums: [{ type: mongoose.Schema.Types.ObjectId, ref: "albums" }],
    haveAlbums: [{ type: mongoose.Schema.Types.ObjectId, ref: "albums" }],
    haveImages: [{ type: mongoose.Schema.Types.ObjectId, ref: "images" }],
    description: { type: "string" },
    ownPeople: { type: mongoose.Schema.Types.ObjectId, ref: "albums" },
    storage: { type: "number", default: 0 },
    sharedPeople: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    viewedPeople: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    isDelete: { type: "boolean", default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("albums", albumSchema);
