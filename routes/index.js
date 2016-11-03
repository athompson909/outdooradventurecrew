var express = require('express');
var router = express.Router();
var request = require('request');

var mongodb = require('mongodb');

// We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var dbUrl = 'mongodb://localhost:27017/oac';

// we will use this variable later to insert and retrieve a "collection" of data
var collection

// Use connect method to connect to the Server
MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', dbUrl);

    // do some work here with the database.
    var myDB = db.db('oac');
    myDB.dropCollection('articles');
    myDB.createCollection('articles', function(err, article) {
      addObject(article, {
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
      });
      addObject(article, {
        content: {
          title: 'Indigenous tribes of the sacred valley',
          body: '',
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
            name: 'Bobby',
            comment: 'poo',
          }
        ]
      });
    });
    collection = db.collection('articles');

  }
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

router.get('/getarticle', function(req,res,next) {
  console.log('***TESTING***')
  collection.find().toArray(function(err, result) {
    if(err) {
      console.log(err);
    } else if (result.length) {
      console.log("Query Worked");
      console.log(result);
      res.send(result);
    } else {
      console.log("No Documents found");
    }
  });
  console.log("***END***")

});

router.get('/getcomments', function(req, res, next) {
  console.log('in getcomments');

  // var jsonfirst = '{"comments":[';
  // var str1 = '{"comment":"Lorem ipsum dolor sit amet","name":"Adam"},';
  // var str2 = '{"comment":"Sup","name":"Betty"}';
  // var jsonlast = ']}'
  // var response = jsonfirst + str1+str2 + jsonlast;
  // console.log("res: "+response);
  // console.log(JSON.parse(response));
  res.status(200).json('[]');
});




// dealing with content:
// to read in a file (not currently being used)
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
