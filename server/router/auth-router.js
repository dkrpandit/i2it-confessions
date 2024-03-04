const express = require("express");
const router = express.Router();
// const  {home,login} = require("../controllers/auth-controller");
const register = require("../controllers/auth-controller");

// router.get("/", (req, res) => {
//     res.status(200).send("root page router side")
// })


// router.route("/").get((req, res) => {
//     res.status(200).send("root page router side")
// })


router.route("/register").post(register);

module.exports = router;