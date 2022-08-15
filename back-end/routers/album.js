const express = require("express");
const albumController = require("../controllers/albumController");
const router = express.Router();

router.post("/create-album", albumController.createAlbum);
router.get("/get-all-user-album", albumController.getAllUserAlbum);

module.exports = router;
