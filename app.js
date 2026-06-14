const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const ExpressError = require("./utils/ExpressError.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStategy = require("passport-local");
const User = require("./models/user.js");


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")))

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;

const sessionOption = {
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
    cookie:{
        exprires: Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main().then(()=> {
    console.log("Connect to DB");
})
.catch(()=> {
    console.log("Error in DB");
})
async function main() {
    await mongoose.connect(dbUrl);
}

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// listings routes
app.use("/listings",listingRouter);

// reviews routes
app.use("/listings/:id/reviews", reviewRouter);

// users router
app.use("/", userRouter);


app.all("/{*splat}",(req,res,next)=>{
    next(new ExpressError(404,"Page not found !"));
})

app.use((err,req,res,next)=>{
    let {statusCode=500, message = "Something went wrong !"} = err;
    // res.status(statusCode).send(message);
    res.render("listings/error", {message});
})

app.listen(port, ()=> {
    console.log("Listening server on port 8080");
})