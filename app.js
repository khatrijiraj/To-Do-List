const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/ToDoListDB");
const itemSchema = {
    name: String
};
const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({
    name: "Welcome to your To-Do list!"
});

const item2 = new Item({
    name: "Hit the + button to add a new item"
});

const item3 = new Item({
    name: "<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

app.get("/", function (req, res) {
    const day = date.getDate();
    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully saved default items to DB");
                }
            });
            res.redirect("/");
        } else {
            res.render("list", { listTitle: day, newListItems: foundItems });
        }
    });
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work - list", newListItems: workItems })
});

app.post("/", function (req, res) {
    const itemName = req.body.newToDo;
    const item = new Item({
        name: item
    });
    item.save();
    res.redirect("/");
});

app.post("/delete", function (req, res) {
    const chekcedItemID = req.body.checkbox.toString().trim();
    Item.findByIdAndRemove(chekcedItemID, function (err) {
        if (!err) {
            console.log("deleted");
            res.redirect("/");
        }
    });
});

app.listen(3000, function () {
    console.log("Server up and running at 3000");
});