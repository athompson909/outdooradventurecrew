var express = require('express');
var router = express.Router();
var request = require('request');

var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectId;

var mongoose = require('mongoose');
var Article = mongoose.model('Article');

var dbUrl = 'mongodb://localhost/oac';

router.post('/comments', function(req, res, next) {
  var article = new Article(req.body);
  article.save(function(err, comment) {
    if(err){ return next(err); }
    res.json(comment);
  });
});

router.get('/getarticle', function(req,res,next) {
  console.log('in getarticle');
  console.log('***ID: '+req.query.id);
  var id = req.query.id;
  Article.findOne(ObjectId(id), function(err, result) {
    if(err){ return next(err); }
    console.log('found a result');
    console.log(result);
    res.json(result);
  });

});

//figure out how to get this to return correctly
router.get('/getmultiplearticles', function(req,res,next) {
  console.log('in getarticle');
  console.log('***ID: '+req.query.id);
  var idArr = req.query.id;
  // var resultsArr = [];
  // for(var i = 0; i < idArr.length; ++i) {
  //   Article.findOne(ObjectId(idArr[i]), function(err, result) {
  //     if(err){ return next(err); }
  //     console.log('found a result');
  //     resultsArr.push(result);
  //   });
  // }
  // console.log(result);
  // res.json(result);
  var findQueryObj = { _id: {$in: []}};
  for(var i = 0; i < idArr.length; ++i) {
    findQueryObj._id.$in.push(ObjectId(idArr[i]));
  }
  console.log(findQueryObj);
  Article.find(findQueryObj, function(err, result) {
    if(err){ return next(err); }
    console.log('found a result');
    console.log(result);
    res.json(result);
  });

});

module.exports = router;
