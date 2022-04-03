var express = require('express');
require('dotenv').config();
var bodyParser = require("body-parser");
var ping = require("./request/ping.js");
var setLed = require("./request/setLed.js");
var getLedStatus = require("./request/getLedStatus.js");
const LedManager = require("./service/ledManager");

console.log("Starting Raspy Smart LED Server");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', ping);
app.get('/setLed', setLed);
app.get('/getLedStatus', getLedStatus);
app.listen(process.env.PORT);

console.log("Inizializing Led Manager");
LedManager.getInstance();

console.log("Server is running on: "+process.env.PORT);

