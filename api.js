var express = require('express');
var router = express.Router();

router.get('/temperature', function(req, res) {
  getData(req.app.locals.db, 'temperature')
    .then(function (result) {
      res.send(result[0].value);
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.get('/humidity', function (req, res) {
  getData(req.app.locals.db, 'humidity')
    .then(function (result) {
      res.send(result[0].value);
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.get('/pm1', function (req, res) {
  getData(req.app.locals.db, 'pm1')
    .then(function (result) {
      res.send(result[0].value);
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.get('/pm2', function (req, res) {
  getData(req.app.locals.db, 'pm2')
    .then(function (result) {
      res.send(result[0].value);
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.get('/pm3', function (req, res) {
  getData(req.app.locals.db, 'pm3')
    .then(function (result) {
      res.send(result[0].value);
    })
    .catch(function (err) {
      console.log(err);
    });
});

function getData(db, collectionName) {
  return new Promise(function (resolve, reject) {
    var collection = db.collection(collectionName);
    collection.find().limit(1).sort({$natural:-1}).toArray(function (err, docs) {
      if(err) reject();
      else resolve(docs)
    });
  });
}

module.exports = router;