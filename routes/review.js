const express = require("express");
const router = express.Router({mergeParams : true});
const Review = require("../models/review.js");
const {reviewSchema} = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listings = require("../models/listing.js");
const {validateReview,isLoggedIn,isAuthor} = require("../middleware.js");
const reviewController = require("../controller/review.js")


//delete review
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewController.delete))

//add Review
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.add));

module.exports = router;

