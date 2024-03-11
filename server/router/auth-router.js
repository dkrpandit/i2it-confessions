const express = require("express");
const router = express.Router();
// const  {home,login} = require("../controllers/auth-controller");
const controller = require("../controllers/auth-controller");

// router.get("/", (req, res) => {
//     res.status(200).send("root page router side")
// })


// router.route("/").get((req, res) => {
//     res.status(200).send("root page router side")
// })


router.route("/register").post(controller.register);
router.route("/verify-otp").post(controller.verifyOtp);
router.route("/send-otp").post(controller.sendOtp);

router.route("/confession-message").post(controller.confessionMessage);



module.exports = router;