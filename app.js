const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

var items = [];
const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongoose://localhost:27017/todolistDB", {useNewUrlParser: true});

app.get("/",function(req,res){ 
    res.render("list",{newListItems : items});
});

app.post("/",function(req,res){  
    var item =  req.body.newItem;
    items.push(item);
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("Server started on port 3000");
});