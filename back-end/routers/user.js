const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// router.use((req, res, next) => {
//   console.log(req.method);
//   if (req.method === "OPTIONS") {
//     res.status(200).send({ optionsDetect: true });
//   } else next();
// });
router.get("/", userController.getUser);
router.post("/exist-username", userController.hasUsername);
router.post("/exist-email", userController.hasEmail);
router.post("/check-login-info", userController.checkLoginInfo);
router.post("/sign-up", userController.signUp);
router.options("/check-login-info", userController.ignoreOption);
router.post("/verify-user", userController.verifyUser);

module.exports = router;
