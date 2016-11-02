var express = require('express');
// var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/getcomments', function(req, res, next) {
  console.log('in getcomments');
  var jsonfirst = '{"comments":[';
  var str1 = '{"comment":"Lorem ipsum dolor sit amet","name":"Adam"},';
  var str2 = '{"comment":"Sup","name":"Betty"}';
  var jsonlast = ']}'
  var response = jsonfirst + str1+str2 + jsonlast;
  console.log("res: "+response);
  console.log(JSON.parse(response));
  res.status(200).json(response);
});

module.exports = router;
