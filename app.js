const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { redirect } = require("express/lib/response");

var items = [];
const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var url = "mongodb://0.0.0.0:27017/todolistDB";
 mongoose.connect(
    url,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    } 
    ).then(() => console.log("Database connected!"))
    .catch(err => console.log(err + "hiii"));
  
const itemsSchema = {
    name : String
};
const Item = mongoose.model("Item", itemsSchema)

// const item1 = new Item({
//     name: "Chanh"
// });

// const item2 = new Item({
//     name: "Chan"
// });
// const item3 = new Item({
//     name: "Luong"
// });

//const defaultItems = [item1,item2,item3];

app.get("/",function(req,res){ 
    Item.find({}, function(err,foundItems){
        if(foundItems.length === 0){
            Item.insertMany(defaultItems,function(err){
                if(err) console.log(err);
                else console.log("saved to db")
            });
            res.redirect("/");
        }
        else{
            res.render("list",{listTitle:"Today", newListItems:foundItems})
        }
    }); 
});

app.post("/",function(req,res){  
    var itemName =  req.body.newItem;
    const item = new Item({
        name : itemName
    });
    item.save();
    res.redirect("/");
});
app.post("/delete",function(req,res){  
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId,function(err){
        if(!err) 
        {
            console.log("Deleted checked item.");
            res.redirect("/");
        }
        else console.log(err);
    })
});
app.listen(3000,function(){
    console.log("Server started on port 3000");
});