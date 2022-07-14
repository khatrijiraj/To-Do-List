const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = [];
const workItems = []

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    const day = date.getDate();
    res.render("list", { listTitle: day, newListItems: items });
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work - list", newListItems: workItems })
});

app.post("/", function (req, res) {
    const item = req.body.newToDo;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work")
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.listen(3000, function () {
    console.log("Server up and running at 3000");
});