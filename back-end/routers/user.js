const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/", userController.getUser);
router.post("/exist-username", userController.hasUsername);
router.post("/exist-email", userController.hasEmail);
router.post("/check-login-info", userController.checkLoginInfo);
router.post("/sign-up", userController.signUp);
router.post("/verify-user", userController.verifyUser);
router.get("/get-concrete-information", userController.getConcreteUserInfo);
router.get("/search", userController.searchUser);
router.get("/granted-access", userController.grantedAccess);
router.get("/:id", userController.getUserByID);

module.exports = router;
