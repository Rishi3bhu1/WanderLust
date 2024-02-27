const Listings = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});


module.exports.index = async(req,res)=>{
    const allListings = await Listings.find({});
    res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs")
}

module.exports.add = async(req,res)=>{
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listings.location,
        limit: 1
    })
    .send()
    let url = req.file.path;
    let filename = req.file.filename;
    const newListings = new Listings(req.body.listings);
    newListings.owner = req.user._id;
    newListings.image = {url,filename};
    newListings.geometry = response.body.features[0].geometry;
    let savedListing = await newListings.save();
    console.log(savedListing)
    req.flash("success","New Listing Created !")
    res.redirect("/listings");
}

module.exports.show = async(req,res)=>{
    let {id}= req.params;
    const listings = await Listings.findById(id).
    populate({
    path :"review",
    populate:{
        path :"author"
    },
    })
    .populate("owner");
    if(!listings){
        req.flash("error","Listing doesn't exists");
        res.redirect("/listings")
    }
    res.render("listings/show.ejs",{listings})
}

module.exports.edit = async(req,res)=>{
    let {id} = req.params;
    let listings = await Listings.findById(id);
    if(!listings){
        req.flash("error","Listing doesn't exists");
        res.redirect("/listings")
    }
    let listingImageUrl = listings.image.url;
    originalImageUrl= listingImageUrl.replace("/upload","/upload/h_300,w_300")
    res.render("listings/edit.ejs",{listings,originalImageUrl})
}

module.exports.update = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listings.findByIdAndUpdate(id,{...req.body.listings});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success","Listing edited");
    res.redirect(`/listings/${id}`);
}

module.exports.delete = async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listings.findByIdAndDelete(id);
    console.log(deletedListing)
    req.flash("success","Listing Deleted ");
    res.redirect("/listings")
}

module.exports.filter = async(req,res)=>{
    res.redirect("listings/index.ejs")
}