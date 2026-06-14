if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
};
const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const {storage} = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({storage});

//listing routes

// index route & create route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,
        validateListing,
        upload.single("listing[image]"),
        wrapAsync(listingController.create)
    );

// new route
router.get("/new", isLoggedIn, (req,res)=> {
    res.render("listings/new");
}) 

router.get("/:id", wrapAsync(listingController.show));

// edit route, update route, destroy route
router.route("/:id")
    .put(isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.update))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.delete))


// edit route
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.edit));

module.exports = router;