var express = require("express");
var app5 = express();
var port = 3003;
var bodyParser = require('body-parser');
app5.use(bodyParser.json());
app5.use(bodyParser.urlencoded({ extended: true }));

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
var logintenant = mongoose.model("logintenant", nameSchema);

app5.get("/", (req, res) => {
    res.sendFile(__dirname + "/login-tenant-5.html");
});

app5.post("/addname", (req, res) => {
    var myData = new logintenant(req.body);
    myData.save()
        .then(item => {
            res.send("Data saved to database");
            response = {
                Name:myData.Name,
                Password:myData.Password
             };
             console.log("hi");
             res.send(JSON.stringify(response));
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
       
});

app5.listen(port, () => {
    console.log("Server listening on port " + port);
});
