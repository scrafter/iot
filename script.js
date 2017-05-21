var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker.mqttdashboard.com:1883');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/iot';

//express
var express = require('express');
var app = express();
var database = {};
var cors = require('cors');
app.use(cors());

var parseMessage = require('./parser').parse;

MongoClient.connect(mongoUrl, function (err, db) {
  if(err) console.log(err);
  else {
    console.log('Connected correctly to DB');
    database = db;
    app.locals.db = db;
    app.listen(3000);
  }
});

client.on('connect', function () {
  client.subscribe('testtopic/mytopic1');
});

client.on('message', function (topic, message) {
  var temperature = parseMessage(message, 'T');
  var humidity = parseMessage(message, 'H');
  var pm1 = parseMessage(message, 'PM1');
  var pm2 = parseMessage(message, 'PM2');
  var pm3 = parseMessage(message, 'PM3');
  insertToDb(database, temperature, 'temperature');
  insertToDb(database, humidity, 'humidity');
  insertToDb(database, pm1, 'pm1');
  insertToDb(database, pm2, 'pm2');
  insertToDb(database, pm3, 'pm3');
});

function insertToDb(db, message, collectionName) {
  var collection = db.collection(collectionName);
  collection.insertMany([
    message
  ], function (err, result) {
    if(err) console.log(err);
    else console.log(result);
  });
}

app.use('/', require('./api'));
