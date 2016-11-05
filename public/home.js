function scrollToTop() {
  location.reload();
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

//initializing the db for testing
// $(document).ready(function() {
//   //setup post json
//   $.post('../article', function(data, status) {
//     //actually parse this data...
//   });
// });

var app = angular.module('OutdoorAdvCrew', ['ui.router', 'ngSanitize'])
.factory('factory', [function() {
    var o = {
        displayvalue: []
    };
    return o;
}]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'HomeCtrl'
            })
            .state('blog', {
                url: '/blog',
                templateUrl: '/blog.html',
                controller: 'BlogCtrl'
            })
            .state('article', {
                url: '/article',
                templateUrl: '/article.html',
                controller: 'ArticleCtrl'
            })
            // .state('blogarticle', {
            //   url: '/blogarticle',
            //   templateUrl: 'blogarticle.html',
            //   controller: 'BlogArticleCtrl'
            // })
            .state('gearrev', {
                url: '/gearrev',
                templateUrl: '/gearrev.html',
                controller: 'GearRevCtrl'
            })
            .state('gallery', {
                url: '/gallery',
                templateUrl: '/gallery.html',
                controller: 'GalleryCtrl'
            })
            .state('survival', {
                url: '/survival',
                templateUrl: '/survival.html',
                controller: 'SurvivalCtrl'
            })
        $urlRouterProvider.otherwise('home');
    }
]);

var emptyArticle = {
  title:'',
  body:[],
  images:[],
  intro:'',
  date:{day:0,month:0,year:0}
};

app.controller('HomeCtrl', [
    '$scope',
    '$http',
    'factory',
    function($scope, $http, factory) {
        $scope.jumbotronTitle = 'home - [intro]';

        $scope.advlog = {};
        $scope.advlogId = '581c9da9995e4b5b640a2bec';
        $scope.gearrev = {};
        $scope.gearrevId = '581c9d8c995e4b5b640a2beb';//TODO: change to correct id
        $scope.survtip = {};
        $scope.survtipId = '581c9d8c995e4b5b640a2beb';
        $scope.blog1 = {};
        $scope.blog1Id = '581c9d8c995e4b5b640a2beb';
        $scope.blog2 = {};
        $scope.blog2Id = '581c9d8c995e4b5b640a2beb';
        $scope.blog3 = {};
        $scope.blog3Id = '581c9d8c995e4b5b640a2beb';

        var multipleIdUrl = '../getmultiplearticles?id='+$scope.advlogId+'&id='+$scope.gearrevId+'&id='+$scope.survtipId+'&id='+$scope.blog1Id+'&id='+$scope.blog2Id+'&id='+$scope.blog3Id;
        $scope.getMultipleArticles = function() {
          $http.get(multipleIdUrl)
          .then(function(response) {
            console.log(response);
            $scope.advlog = getArticleFromArr($scope.advlogId, response.data);
            $scope.gearrev = getArticleFromArr($scope.gearrevId, response.data);
            $scope.survtip = getArticleFromArr($scope.survtipId, response.data);
            $scope.blog1 = getArticleFromArr($scope.blog1Id, response.data);
            $scope.blog2 = getArticleFromArr($scope.blog2Id, response.data);
            $scope.blog3 = getArticleFromArr($scope.blog3Id, response.data);
          });
        }
        $scope.getMultipleArticles();
    }
]);

function getArticleFromArr(id, responseArr) {
  for(var i = 0; i < responseArr.length; ++i) {
    if(id === responseArr[i]._id) {
      var article = {
        title:'',
        body:[],
        images:[],
        intro:'',
        date:{day:0,month:0,year:0}
      };
      article.title = responseArr[i].title;
      article.body = responseArr[i].body;
      article.images = responseArr[i].images;
      article.intro = responseArr[i].intro;
      article.date.day = responseArr[i].date.day;
      article.date.month = responseArr[i].date.month;
      article.date.year = responseArr[i].date.year;
      return article;
    }
  }
  //if reaches here throw error
  console.log("error, shouldn't reach this line");
}

function getArticle($http, article, articleId) {
  $http.get('../getarticle?id='+articleId)
  .then(function(response) {
    console.log('success');
    console.log(response.data)
    article.title = response.data.title;
    article.body = response.data.body;
    article.images = response.data.images;
    article.intro = response.data.intro;
    article.date.day = response.data.date.day;
    article.date.month = response.data.date.month;
    article.date.year = response.data.date.year;
  });
}


app.controller('BlogCtrl', [
    '$scope',
    'factory',
    '$http',
    function($scope, factory, $http) {
      $scope.select ='in the blog';
      $scope.jumbotronTitle = 'adventure log';
      $scope.innerTitle = 'FEATURED ADVENTURES';
      $scope.readMore = 'Click to read more';
      $scope.currentArticle = {
        title: 'The Trail to Huayna Picchu',
        content: 'Lorem ipsum dolor sit amet, electram reprehendunt per no, veri elitr et ius. Quaeque eloquentiam te pri, ne vis novum vitae instructior. Qualisque deterruisset eam ei, vel at quas referrentur. Et placerat indoctum posidonium sed.',
        imageSrc: 'images/example.png',
        link: '/article?id=581b948f00158a3add809fa0',
      };
      $scope.comments = '';

      $scope.articles = blogArticles;
      $scope.getMonthsArray = function() {
        return getMonthsArray();
      };


      //real stuff
      $scope.featured1Id = '';
      $scope.featured2Id = '';
      $scope.featured3Id = '';
    }
]);

app.controller('ArticleCtrl', [
    '$scope',
    'factory',
    '$http',
    function($scope, factory, $http) {
      console.log("in article ctrl");
      var idQuery = getParameterByName("id", null);//null means this url
      console.log(idQuery);

      $scope.artTitle = '';
      $scope.artBody = '';
      $scope.artImages = [];
      $scope.getArticle = function() {
        $http.get('../getarticle?id='+idQuery)
        .then(function(response) {
          console.log('success');
          console.log(response.data)
          $scope.artTitle = response.data.title;
          $scope.artBody = response.data.body;
          $scope.artImages = response.data.images;

        });
      }
      $scope.getArticle();

      $scope.getMonthsArray = function() {
        return getMonthsArray();
      };
    }
]);

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



var blogArticles = [
  {
    title: 'The Trail to Huayna Picchu',
    content: 'Lorem ipsum dolor sit amet, electram reprehendunt per no, veri elitr et ius. Quaeque eloquentiam te pri, ne vis novum vitae instructior. Qualisque deterruisset eam ei, vel at quas referrentur. Et placerat indoctum posidonium sed.',
    imageSrc: 'images/example.png',
    link: '#/article?id=581b948f00158a3add809fa0',
  },
  {
    title: 'Hiking the Inca Trail from Ollantaytambo',
    content: 'Lorem ipsum dolor sit amet, electram reprehendunt per no, veri elitr et ius. Quaeque eloquentiam te pri, ne vis novum vitae instructior. Qualisque deterruisset eam ei, vel at quas referrentur. Et placerat indoctum posidonium sed.',
    imageSrc: 'images/example.png',
    link: '#/article?id=581b948f00158a3add809fa0',
  },
  {
    title: 'Indigenous Communities of the Sacred Valley',
    content: 'Lorem ipsum dolor sit amet, electram reprehendunt per no, veri elitr et ius. Quaeque eloquentiam te pri, ne vis novum vitae instructior. Qualisque deterruisset eam ei, vel at quas referrentur. Et placerat indoctum posidonium sed.',
    imageSrc: 'images/example.png',
    link: '#/article?id=581b948f00158a3add809fa0',
  }
];





var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getMonthsArray() {
  var index = getMonth();
  var monthsArr = [];
  var counter = 0;
  var i = index;
  while(counter < 9) {
    monthsArr.push(months[i]);
    counter++;
    --i;
    if(i < 0) i = 11;
  }
  console.log(months);
  return monthsArr;
}

function getMonth() {
  var d = new Date();
  return d.getMonth();
}



app.controller('GearRevCtrl', [
    '$scope',
    'factory',
    function($scope, factory){
        $scope.select ='gearrev';
        $scope.jumbotronTitle = 'gear reviews';
        $scope.articles = gearReviews;
        $scope.getMonthsArray = function() {
          return getMonthsArray();
        };
    }
]);

var gearReviews = [
  {
    title: 'Gear Review 1',
    content: 'Lorem ipsum dolor sit amet, electram reprehendunt per no, veri elitr et ius. Quaeque eloquentiam te pri, ne vis novum vitae instructior. Qualisque deterruisset eam ei, vel at quas referrentur. Et placerat indoctum posidonium sed.',
    imageSrc: 'images/example.png',
    link: '#/article?id=x',
  },
  {
    title: 'Gear Review 2',
    content: 'Lorem ipsum dolor sit amet, electram reprehendunt per no, veri elitr et ius. Quaeque eloquentiam te pri, ne vis novum vitae instructior. Qualisque deterruisset eam ei, vel at quas referrentur. Et placerat indoctum posidonium sed.',
    imageSrc: 'images/example.png',
    link: '#/article?id=x',
  },
  {
    title: 'Gear Review 3',
    content: 'Lorem ipsum dolor sit amet, electram reprehendunt per no, veri elitr et ius. Quaeque eloquentiam te pri, ne vis novum vitae instructior. Qualisque deterruisset eam ei, vel at quas referrentur. Et placerat indoctum posidonium sed.',
    imageSrc: 'images/example.png',
    link: '#/article?id=x',
  }
];


app.controller('GalleryCtrl', [
    '$scope',
    'factory',
    function($scope, factory){
        $scope.select ='gallery';
        $scope.photos = [
          {
            image1: 'images/example.png',
            image2: 'images/example.png',
            image3: 'images/example.png'
          },
          {
            image1: 'images/example.png',
            image2: 'images/example.png',
            image3: 'images/example.png'
          },
          {
            image1: 'images/example.png',
            image2: 'images/example.png',
            image3: 'images/example.png'
          },
          {
            image1: 'images/example.png',
            image2: 'images/example.png',
            image3: 'images/example.png'
          },
          {
            image1: 'images/example.png',
            image2: 'images/example.png',
            image3: 'images/example.png'
          },
          {
            image1: 'images/example.png',
            image2: 'images/example.png',
            image3: 'images/example.png'
          },
          {
            image1: 'images/example.png',
            image2: 'images/example.png',
            image3: 'images/example.png'
          },
          {
            image1: 'images/example.png',
            image2: 'images/example.png',
            image3: 'images/example.png'
          },
          {
            image1: 'images/example.png',
            image2: 'images/example.png',
            image3: 'images/example.png'
          }
        ]
    }
]);

app.controller('SurvivalCtrl', [
    '$scope',
    'factory',
    function($scope, factory){
      $scope.select ='survival';//todo: delete
      $scope.jumbotronTitle = 'Survival Guide';
      $scope.articles = survivalGuides;
      $scope.getMonthsArray = function() {
        return getMonthsArray();
      };
    }
]);

var survivalGuides = [
  {
    title: 'Survival Guide Article 1',
    content: 'Lorem ipsum dolor sit amet, electram reprehendunt per no, veri elitr et ius. Quaeque eloquentiam te pri, ne vis novum vitae instructior. Qualisque deterruisset eam ei, vel at quas referrentur. Et placerat indoctum posidonium sed.',
    imageSrc: 'images/example.png',
    link: '#/article?id=x',
  },
  {
    title: 'Survival Guide Article 2',
    content: 'Lorem ipsum dolor sit amet, electram reprehendunt per no, veri elitr et ius. Quaeque eloquentiam te pri, ne vis novum vitae instructior. Qualisque deterruisset eam ei, vel at quas referrentur. Et placerat indoctum posidonium sed.',
    imageSrc: 'images/example.png',
    link: '#/article?id=x',
  },
  {
    title: 'Survival Guide Article 3',
    content: 'Lorem ipsum dolor sit amet, electram reprehendunt per no, veri elitr et ius. Quaeque eloquentiam te pri, ne vis novum vitae instructior. Qualisque deterruisset eam ei, vel at quas referrentur. Et placerat indoctum posidonium sed.',
    imageSrc: 'images/example.png',
    link: '#/article?id=x',
  }
];

app.controller('CommentsCtrl', [
  '$scope',
  function($scope) {

  }
]);
