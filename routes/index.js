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
      addObject(collection, {
        title: 'The Trail to Huayna Picchu',
        body: '<div class=text-left><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas at magna in elementum. Donec elementum metus sit amet orci venenatis sagittis. Morbi venenatis ex in nulla vulputate ornare. Suspendisse in suscipit erat. Quisque diam nibh, convallis non purus sed, pellentesque lobortis magna. Donec vel nibh leo. Etiam posuere, arcu vitae pretium tincidunt, velit lacus ullamcorper nunc, sit amet rhoncus tortor eros et nulla. Vivamus venenatis justo lorem, at hendrerit velit venenatis in. Etiam ut aliquam felis. Quisque nisl dolor, mattis quis faucibus non, volutpat a lectus. Integer ac sapien sit amet dolor dictum fringilla. Integer at ultricies nunc, at venenatis ipsum. Nullam varius mi nec lorem tempor, in aliquet augue semper. Pellentesque blandit dignissim vestibulum. Cras dui libero, rhoncus non sagittis in, semper vel lacus. Sed vestibulum, est maximus semper feugiat, neque augue dignissim dui, sit amet interdum eros erat sed nulla.</p><br></div><div class=\\"text-center\\"><img src=\\"images/example.png\\"><br></div><div class=\\"text-left\\"><p>In hac habitasse platea dictumst. Praesent non elit id dolor dictum cursus. Quisque id feugiat lacus, sit amet porttitor neque. Aliquam sit amet eros at leo pharetra convallis. In fermentum eleifend turpis ut pellentesque. Curabitur ac odio rhoncus, consequat sem vehicula, accumsan ligula. Etiam iaculis pellentesque posuere. Donec a sapien pellentesque, lacinia magna sit amet, bibendum neque. Nunc euismod sapien quis ipsum ultrices, sed dapibus enim ornare. Suspendisse at nunc ut ante bibendum tincidunt. Aenean imperdiet massa a sem accumsan, at tincidunt nisi convallis. Cras commodo, eros id volutpat convallis, lacus ex scelerisque augue, ut consectetur nunc tortor sed nisl. Quisque ac semper massa, eu euismod libero.</p><br><p>In luctus, leo sed venenatis tincidunt, nibh ligula vehicula arcu, quis gravida diam dui at nibh. Praesent maximus metus eget porta rutrum. Vestibulum quis malesuada erat. Nam lacus dui, euismod non ex in, efficitur placerat nibh. Quisque feugiat ipsum odio, nec faucibus risus lobortis ac. Nunc cursus nec lectus a faucibus. Nunc euismod ligula nec eros vulputate, eu maximus dui placerat. Nullam libero mi, tincidunt vitae ipsum ac, dictum semper nibh. Integer sagittis maximus dictum. Fusce sed diam ac massa convallis fringilla. Praesent quis consequat leo. Vivamus urna sapien, maximus sed eros at, elementum viverra elit. Quisque sit amet libero sit amet dui porta laoreet. Nunc fermentum mattis maximus. Aliquam efficitur consequat porta.</p><br></div><div class=\\"text-center\\"><img src=\\"images/example.png\\"><br></div><div class=\\"text-left\\"><p>Aliquam maximus blandit nunc, luctus pellentesque sapien varius sit amet. Vestibulum ut mattis magna. Maecenas vel elit vel dui tempus tincidunt in nec mauris. Suspendisse sed arcu non massa volutpat tempus dignissim nec odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam lacinia at felis sed tincidunt. Aenean rhoncus dolor est, laoreet venenatis nulla maximus ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam tristique nulla et sem aliquet, dignissim venenatis eros pharetra. Morbi quis elementum lorem. Suspendisse euismod molestie velit ac porta. Mauris ut mi aliquet, accumsan enim id, dapibus quam. Vivamus sit amet magna fermentum, interdum arcu vel, interdum nibh. Quisque eu justo quam. In et dui consequat sem eleifend auctor non auctor massa.</p><br></div><div class=\\"text-center\\"><img src=\\"images/example.png\\"><br></div><div class=\\"text-left\\"><p>Suspendisse in dui eu lorem dignissim facilisis eu sed turpis. Vestibulum faucibus lobortis dolor, quis tincidunt neque tincidunt quis. Donec ac varius sem. Suspendisse efficitur sit amet augue sed convallis. Vivamus at neque risus. Curabitur sem erat, finibus ut ex id, placerat ullamcorper arcu. Aenean tristique hendrerit laoreet.</p><br></div>',
        images: [
          'images/example.png',
          'images/example.png',
          'images/example.png'
        ]});
      addObject(collection, {
        title: 'Indigenous tribes of the Sacred Valley',
        body: '<div class=text-left><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas at magna in elementum. Donec elementum metus sit amet orci venenatis sagittis. Morbi venenatis ex in nulla vulputate ornare. Suspendisse in suscipit erat. Quisque diam nibh, convallis non purus sed, pellentesque lobortis magna. Donec vel nibh leo. Etiam posuere, arcu vitae pretium tincidunt, velit lacus ullamcorper nunc, sit amet rhoncus tortor eros et nulla. Vivamus venenatis justo lorem, at hendrerit velit venenatis in. Etiam ut aliquam felis. Quisque nisl dolor, mattis quis faucibus non, volutpat a lectus. Integer ac sapien sit amet dolor dictum fringilla. Integer at ultricies nunc, at venenatis ipsum. Nullam varius mi nec lorem tempor, in aliquet augue semper. Pellentesque blandit dignissim vestibulum. Cras dui libero, rhoncus non sagittis in, semper vel lacus. Sed vestibulum, est maximus semper feugiat, neque augue dignissim dui, sit amet interdum eros erat sed nulla.</p><br></div><div class=\\"text-center\\"><img src=\\"images/example.png\\"><br></div><div class=\\"text-left\\"><p>In hac habitasse platea dictumst. Praesent non elit id dolor dictum cursus. Quisque id feugiat lacus, sit amet porttitor neque. Aliquam sit amet eros at leo pharetra convallis. In fermentum eleifend turpis ut pellentesque. Curabitur ac odio rhoncus, consequat sem vehicula, accumsan ligula. Etiam iaculis pellentesque posuere. Donec a sapien pellentesque, lacinia magna sit amet, bibendum neque. Nunc euismod sapien quis ipsum ultrices, sed dapibus enim ornare. Suspendisse at nunc ut ante bibendum tincidunt. Aenean imperdiet massa a sem accumsan, at tincidunt nisi convallis. Cras commodo, eros id volutpat convallis, lacus ex scelerisque augue, ut consectetur nunc tortor sed nisl. Quisque ac semper massa, eu euismod libero.</p><br><p>In luctus, leo sed venenatis tincidunt, nibh ligula vehicula arcu, quis gravida diam dui at nibh. Praesent maximus metus eget porta rutrum. Vestibulum quis malesuada erat. Nam lacus dui, euismod non ex in, efficitur placerat nibh. Quisque feugiat ipsum odio, nec faucibus risus lobortis ac. Nunc cursus nec lectus a faucibus. Nunc euismod ligula nec eros vulputate, eu maximus dui placerat. Nullam libero mi, tincidunt vitae ipsum ac, dictum semper nibh. Integer sagittis maximus dictum. Fusce sed diam ac massa convallis fringilla. Praesent quis consequat leo. Vivamus urna sapien, maximus sed eros at, elementum viverra elit. Quisque sit amet libero sit amet dui porta laoreet. Nunc fermentum mattis maximus. Aliquam efficitur consequat porta.</p><br></div><div class=\\"text-center\\"><img src=\\"images/example.png\\"><br></div><div class=\\"text-left\\"><p>Aliquam maximus blandit nunc, luctus pellentesque sapien varius sit amet. Vestibulum ut mattis magna. Maecenas vel elit vel dui tempus tincidunt in nec mauris. Suspendisse sed arcu non massa volutpat tempus dignissim nec odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam lacinia at felis sed tincidunt. Aenean rhoncus dolor est, laoreet venenatis nulla maximus ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam tristique nulla et sem aliquet, dignissim venenatis eros pharetra. Morbi quis elementum lorem. Suspendisse euismod molestie velit ac porta. Mauris ut mi aliquet, accumsan enim id, dapibus quam. Vivamus sit amet magna fermentum, interdum arcu vel, interdum nibh. Quisque eu justo quam. In et dui consequat sem eleifend auctor non auctor massa.</p><br></div><div class=\\"text-center\\"><img src=\\"images/example.png\\"><br></div><div class=\\"text-left\\"><p>Suspendisse in dui eu lorem dignissim facilisis eu sed turpis. Vestibulum faucibus lobortis dolor, quis tincidunt neque tincidunt quis. Donec ac varius sem. Suspendisse efficitur sit amet augue sed convallis. Vivamus at neque risus. Curabitur sem erat, finibus ut ex id, placerat ullamcorper arcu. Aenean tristique hendrerit laoreet.</p><br></div>',
        images: [
          'images/example.png',
          'images/example.png',
          'images/example.png'
        ]});
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
  collection.findOne({"title": "The Trail to Huayna Picchu"}, function(err, result) {
    if(err) console.log("error");

    console.log(result);
    console.log("query successful");
    var json = '{"title":"'+result.title+'","body":"'+result.body+'",';
    json += '"images":[';
    for(var i = 0; i < result.images.length; ++i) {
      json += '"'+result.images[i]+'"';
      if(i != result.images.length-1) {
        json +=',';
      }
    }
    json += ']}';
    res.status(200).json(json);
  });
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
