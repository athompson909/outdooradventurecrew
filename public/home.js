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
    function($scope, $http, factory){
        $scope.jumbotronTitle = 'home - [intro]';
        $scope.contentTemp = 'Lorem ipsum dolor sit amet, electram reprehendunt per no, veri elitr et ius. Quaeque eloquentiam te pri, ne vis novum vitae instructior. Qualisque deterruisset eam ei, vel at quas referrentur. Et placerat indoctum posidonium sed.';

        //get ids from db manually
        $scope.getArticle = function(article, articleId) {
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

        $scope.advlog = emptyArticle;
        $scope.advlogId = '581c9da9995e4b5b640a2bec';
        $scope.getArticle($scope.advlog, $scope.advlogId);

        $scope.gearrevId = emptyArticle;
        $scope.survtipId = emptyArticle;
        $scope.blog1Id = emptyArticle;
        $scope.blog2Id = emptyArticle;
        $scope.blog3Id = emptyArticle;
    }
]);

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
      $scope.currentArticle = {
        link: '/article?id=581ba707bf3d7d3c8704af25',
        id: '581ba707bf3d7d3c8704af25',
      };

      $scope.artTitle = '';
      $scope.artBody = '';
      $scope.artImages = [];
      $scope.getArticle = function() {
        $http.get('../getarticle?id='+$scope.currentArticle.id)
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
