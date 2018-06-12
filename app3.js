var express = require("express");
var app3 = express();
var port = 3001;
var bodyParser = require('body-parser');
app3.use(bodyParser.json());
app3.use(bodyParser.urlencoded({ extended: true }));

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
var tenantsign = mongoose.model("tenantsign", nameSchema);

app3.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup-tenant-3.html");
});

app3.post("/addname", (req, res) => {
    var myData = new tenantsign(req.body);
    myData.save()
        .then(item => {
            res.send("Data saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app3.listen(port, () => {
    console.log("Server listening on port " + port);
});
