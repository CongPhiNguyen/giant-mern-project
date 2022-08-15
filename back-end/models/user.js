const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    salt: String,
    verify: {
      type: String,
      default: false,
    },
    userRoot: {
      type: String,
    },
    avatarURL: {
      type: String,
      default:
        "https://i.pinimg.com/736x/65/78/5e/65785ecadc0a23cc81af0a4d41bae1be.jpg",
    },
    firstName: {
      type: String,
      default: "",
    },
    familyName: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: Date.now(),
    },
    ownImages: {
      type: Array,
      default: [],
    },
    receivedImages: {
      type: Array,
      default: [],
    },
    ownAlbums: [{ type: mongoose.Schema.Types.ObjectId, ref: "albums" }],
    receivedAlbums: [{ type: mongoose.Schema.Types.ObjectId, ref: "albums" }],
    accountState: {
      type: String,
      default: "normal",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
