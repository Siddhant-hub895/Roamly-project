const express = require("express");
const router = express.Router();

//posts
//index
router.get("/", (req,res)=>{
    res.send("GET for posts")
})

//show
router.get("/:id", (req,res)=>{
    res.send("Show for posts");
})

//new
router.post("/id", (req,res)=>{
    res.send("New for posts");
})

//destroy
router.delete("/:id",(req,res)=>{
    rres.send("Delete foer posts");
})

module.exports = router;
