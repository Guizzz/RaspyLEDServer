const express = require('express');
require('dotenv').config();
const bodyParser = require("body-parser");
const ping = require("./request/ping.js");
const setLed = require("./request/setLed.js");
const setRainbow = require("./request/setRainbow.js");
const stopRainbow = require("./request/stopRainbow.js");
const getLedStatus = require("./request/getLedStatus.js");
const setRainbowBrightness = require('./request/setRainbowBrightness.js');
const LedManager = require("./service/ledManager");

console.log("Starting Raspy Smart LED Server");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', ping);
app.get('/setLed', setLed);
app.get('/getLedStatus', getLedStatus);
app.get('/setRainbow', setRainbow);
app.get('/setRainbowBrightness', setRainbowBrightness);
app.get('/stopRainbow', stopRainbow);

app.listen(process.env.PORT);

console.log("Inizializing Led Manager");
LedManager.getInstance();

console.log("Server is running on: "+process.env.PORT);

