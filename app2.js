var express = require("express");
var app2 = express();
var port = 3000;
var bodyParser = require('body-parser');
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
require('mongoose-type-email');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");
var nameSchema = new mongoose.Schema({
    Name  : String,
    Phone : String,
    Email: String ,
    Password: String
});
var User = mongoose.model("User", nameSchema);

app2.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup-owner-2.html");
});

app2.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Data saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app2.listen(port, () => {
    console.log("Server listening on port " + port);
});
