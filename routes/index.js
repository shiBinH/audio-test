var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('HOME PAGE')
  res.sendFile('indx.html');
});

module.exports = router;
