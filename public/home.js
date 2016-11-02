function scrollToTop() {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

var app = angular.module('OutdoorAdvCrew', ['ui.router'])
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

app.controller('HomeCtrl', [
    '$scope',
    'factory',
    function($scope, factory){
        $scope.select ='home';
        $scope.jumbotronTitle = 'home - [intro]';
        $scope.contentTemp = 'Lorem ipsum dolor sit amet, electram reprehendunt per no, veri elitr et ius. Quaeque eloquentiam te pri, ne vis novum vitae instructior. Qualisque deterruisset eam ei, vel at quas referrentur. Et placerat indoctum posidonium sed.';
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
          link: '/article?id=x',
        };
        $scope.comments = '';
        $scope.getComments = function() {
          $http.get('../getcomments')
          .then(function(response) {
            console.log('success');
            var json = JSON.parse(response.data);
            var jsonArr = json.comments;
            console.log(response.data);
            for(var i = 0; i < jsonArr.length; ++i) {
              console.log("name: "+jsonArr[i].name);
              console.log("comment: "+jsonArr[i].comment);
            }
            $scope.comments = jsonArr;
          });
        }
        $scope.getComments();

        $scope.articles = blogArticles;
        $scope.getMonthsArray = function() {
          return getMonthsArray();
        };
    }
]);

var articleInfo = {
  id: 0,
  content: {
    title: '',
    body: '',
  },
  images: [],
  comments: {
    name: '',
    comment: '',
  }
}

app.controller('ArticleCtrl', [
    '$scope',
    'factory',
    '$http',
    function($scope, factory, $http) {
      console.log("in article ctrl")
        $scope.currentArticle = {
          title: 'The Trail to Huayna Picchu',
          content: 'Lorem ipsum dolor sit amet, electram reprehendunt per no, veri elitr et ius. Quaeque eloquentiam te pri, ne vis novum vitae instructior. Qualisque deterruisset eam ei, vel at quas referrentur. Et placerat indoctum posidonium sed.',
          imageSrc: 'images/example.png',
          link: '/article?id=x',
        };

        $scope.comments = [];
        $scope.getComments = function() {
          $http.get('../getcomments')
          .then(function(response) {
            console.log('success');
            var json = JSON.parse(response.data);
            var jsonArr = json.comments;
            var commentsArr = [];
            console.log(response.data);
            for(var i = 0; i < jsonArr.length; ++i) {
              var arrName = jsonArr[i].name;
              var arrComment = jsonArr[i].comment;
              commentsArr.push({name:arrName,comment:arrComment});
            }
            $scope.comments = commentsArr;
            console.log("commentsArr: "+$scope.comments);
          });
        }
        $scope.getComments();

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
    link: '#/article?id=x',
  },
  {
    title: 'Hiking the Inca Trail from Ollantaytambo',
    content: 'Lorem ipsum dolor sit amet, electram reprehendunt per no, veri elitr et ius. Quaeque eloquentiam te pri, ne vis novum vitae instructior. Qualisque deterruisset eam ei, vel at quas referrentur. Et placerat indoctum posidonium sed.',
    imageSrc: 'images/example.png',
    link: '#/article?id=x',
  },
  {
    title: 'Indigenous Communities of the Sacred Valley',
    content: 'Lorem ipsum dolor sit amet, electram reprehendunt per no, veri elitr et ius. Quaeque eloquentiam te pri, ne vis novum vitae instructior. Qualisque deterruisset eam ei, vel at quas referrentur. Et placerat indoctum posidonium sed.',
    imageSrc: 'images/example.png',
    link: '#/article?id=x',
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
