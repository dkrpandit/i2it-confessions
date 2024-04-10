const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth-controller");
const sighupSchema = require("../validator/auth-validator");
const postSchema  =require("../validator/post-validator");
const validator = require("../middleware/validate-middleware");

router.route("/register").post(validator(sighupSchema),controller.register);
router.route("/verify-otp").post(controller.verifyOtp);
router.route("/send-otp").post(controller.sendOtp);
router.route("/login").post(controller.login);

router.route("/confession-message").post(validator(postSchema),controller.confessionMessage);
router.route("/get-confessions").get(controller.getConfessions);



module.exports = router;