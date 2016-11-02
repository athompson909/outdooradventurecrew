var express = require('express');
var fs = require('fs');
var router = express.Router();



// *** MONGO STUFF ***
var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost/';
var collection;

MongoClient.connect(dbUrl, function(err, db) {
  //initialize article content:
  readFile();

  var myDB = db.db('oac');
  // myDB.dropCollection('articles');
  // myDB.createCollection('articles', function(err, article){
  //   addObject(article, {
  //     content: {
  //       title: 'The Trail to Huayna Picchu',
  //       body: articleContent,
  //     },
  //     images: [
  //       'images/example.png',
  //       'images/example.png',
  //       'images/example.png'
  //     ],
  //     comments: [
  //       {
  //         name: 'Adam',
  //         comment: 'hey',
  //       },
  //       {
  //         name: 'Betty',
  //         comment: 'sup',
  //       }
  //     ]
  //   });
  // });


  collection = db.collection('articles');

  setTimeout(function(){ db.close(); }, 3010);

});

function addObject(collection, object) {
  collection.insert(object, function(err, result) {
    if(!err){
      console.log("Inserted : ");
      console.log(result);
    }
  });
}
// *** *** ***


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/getcomments', function(req, res, next) {
  console.log('in getcomments');

  // get data from collection... take db _id from req
  console.log(collection.toString());



  var jsonfirst = '{"comments":[';
  var str1 = '{"comment":"Lorem ipsum dolor sit amet","name":"Adam"},';
  var str2 = '{"comment":"Sup","name":"Betty"}';
  var jsonlast = ']}'
  var response = jsonfirst + str1+str2 + jsonlast;
  console.log("res: "+response);
  console.log(JSON.parse(response));
  res.status(200).json(response);
});




// dealing with content:

var articleContent = '';
function readFile() {
  fs.readFile(__dirname + '/articleContent.txt', function(err, data) {
    if(err) throw err;
    articleContent = data.toString().split('\n');
    // console.log("articleContent: "+articleContent);
  });
}

//not currently in use
var testArticle = {
  content: {
    title: 'The Trail to Huayna Picchu',
    body: articleContent,
  },
  images: [
    'images/example.png',
    'images/example.png',
    'images/example.png'
  ],
  comments: [
    {
      name: 'Adam',
      comment: 'hey',
    },
    {
      name: 'Betty',
      comment: 'sup',
    }
  ]
};


module.exports = router;

