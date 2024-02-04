const Review = require("../models/review.js");
const Listings = require("../models/listing.js")

module.exports.delete = async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listings.findByIdAndUpdate(id,{$pull :{review : reviewId}})
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`)
}

module.exports.add = async(req,res)=>{
    let listings = await Listings.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listings.review.push(newReview);
    await newReview.save();
    await listings.save();
    req.flash("success"," review added");
    console.log("Review saved");
    res.redirect(`/listings/${listings._id }`);
    
}