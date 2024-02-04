const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const flash = require("connect-flash")
const {saveUrl} = require("../middleware.js");
const userController = require("../controller/User.js")

router.route("/signup")
.get(userController.renderSignUp)
.post(wrapAsync(userController.signUp))

router.route("/login")
.get(userController.renderLogin)
.post(saveUrl,
passport.authenticate("local", 
{ failureRedirect: "/login",
failureFlash : true,
}),
userController.login)

router.get("/logout",userController.logout)

module.exports = router;