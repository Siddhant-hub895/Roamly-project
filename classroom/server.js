const express = require("express");
const app = express();
const router = require("./routes/users.js");
const postRouter = require("./routes/posts.js")
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true
}));
app.use(flash());

app.get("/register", (req,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    if(name == "anonymous"){
        req.flash("error", "some error occur !");
    }else{
        req.flash("successful", "User register successful !");
    }
    res.redirect("/hello");
});

app.get("/hello", (req,res)=>{
    res.locals.successMsg = req.flash('successful');
    res.locals.errorMsg = req.flash('error');
    res.render("page.ejs", {name:req.session.name});
})

app.get("/reqcount", (req,res)=>{
    if(req.session.count){
        req.session.count ++;
    }else{
        req.session.count = 1;
    }
    res.send(`You sent a request ${req.session.count} times`);
})

app.get("/test", (req,res)=>{
    res.send("test seccessfull !");
})

// app.use(cookieParser());

// app.use("/users", router);
// app.use("/post", postRouter);

// app.get("/get", (req,res)=>{
//     res.cookie("greet","hello");
//     res.cookie("madeIn", "India");
//     res.send("Send you some cookie");
// })
// app.get("/" , (req,res)=>{
//     console.dir(req.cookies);
//     res.send("Root page !");
// })
app.listen(3000, ()=>{
    console.log("Server listening on port 3000");
})