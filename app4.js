var express = require("express");
var app4 = express();
var port = 3002;
var bodyParser = require('body-parser');
app4.use(bodyParser.json());
app4.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
require('mongoose-type-email');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");
var nameSchema = new mongoose.Schema({
    Name  : String,
    Password: String
});
var loginowner = mongoose.model("loginowner", nameSchema);

app4.get("/", (req, res) => {
    res.sendFile(__dirname + "/login-owner-4.html");
});

app4.post("/addname", (req, res) => {
    var myData = new loginowner(req.body);
    myData.save()
        .then(item => {
            res.send("Data saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app4.listen(port, () => {
    console.log("Server listening on port " + port);
});
