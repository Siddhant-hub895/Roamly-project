const mongoose = require("mongoose");
const { listingSchema } = require("../schema");
const Review = require("./review");
const User = require("./user.js");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    image:{
        url:String,
        filename:String,
    },  
    price:{
        type:Number,
        require:true
    },
    location:{
        type:String
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    country:{
        type:String
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});


ListingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
