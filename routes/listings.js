const express = require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})


router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listings[image]"),wrapAsync(listingController.add));

//create listings
router.get("/new",isLoggedIn,wrapAsync(listingController.renderNewForm));

router.route("/:id")
.get(wrapAsync(listingController.show))
.put(isLoggedIn,isOwner,upload.single("listings[image]"),wrapAsync(listingController.update))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.delete));

//edit listings
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.edit))

//filter listings
router.get("/listings/filter",wrapAsync(listingController.filter))

module.exports = router;