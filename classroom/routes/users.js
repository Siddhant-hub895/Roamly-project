const express = require("express");
const router = express.Router();


//users
//index
router.get("/", (req,res)=>{
    res.send("GET for users")
})

//show
router.get("/:id", (req,res)=>{
    res.send("Show for users");
})

//new
router.post("/id", (req,res)=>{
    res.send("New for users");
})

//destroy
router.delete("/:id",(req,res)=>{
    rres.send("Delete foer users");
})

module.exports = router;