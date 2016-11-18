$(function(){
  var sticky = new Waypoint.Sticky({
    element: $('header')[0]
  });
  $('.menuBtn').click(function(){
    $('header nav').toggleClass('open');
  });
})





var app = angular.module('dw4', [
  'ng-backstretch',
  'ngBox',
  'tooltipster',
  'duScroll',
  'slick',
  'angular-loading-bar',
  'ui.router',
  'ngSanitize',
  'ngSanitize',
  'ngDialog'
]);

app.config(function($stateProvider, $urlRouterProvider){




  $stateProvider
    .state('inicio',{
      url   : '/inicio',
      templateUrl : '/app/view/inicio.html',
      controller: 'MainCtrl'
    })
    .state('cultura-y-turismo',{
      url   : '/cultura-y-turismo',
      templateUrl : '/app/view/cultura-y-turismo.html',
      controller: 'MainCtrl'
    })
    .state('pago-de-predial',{
      url   : '/pago-de-predial',
      templateUrl : '/app/view/pago-de-predial.html',
      controller: 'MainCtrl'
    })
    .state('mensaje-del-gobernador',{
      url   : '/mensaje-del-gobernador',
      templateUrl : '/app/view/mensaje-del-gobernador.html',
      controller: 'MainCtrl'
    })
    .state('gabinete',{
      url   : '/gabinete',
      templateUrl : '/app/view/gabinete.html',
      controller: 'MainCtrl'
    })
    .state('directorio',{
      url   : '/directorio',
      templateUrl : '/app/view/directorio.html',
      controller: 'MainCtrl'
    })
    .state('sala-de-prensa',{
      url   : '/sala-de-prensa',
      templateUrl : '/app/view/sala-de-prensa.html',
      controller: 'MainCtrl'
    })
    .state('nota',{
      url   : '/nota/:id',
      templateUrl : '/app/view/nota.html',
      controller: 'MainCtrl'
    })
    .state('gabinete-detalle',{
      url   : '/gabinete/:id',
      templateUrl : '/app/view/gabinete-detalle.html',
      controller: 'MainCtrl'
    });

    $urlRouterProvider.otherwise('/inicio');

});


app.run(function(){

});


app.controller('MainCtrl', function($scope, apis, $location, $stateParams, ngDialog){
  $scope.prensa=null;
  $scope.noticias;
  $scope.eventos;
  $scope.gabinete;
  $scope.directorio;
  $scope.item;

  if($stateParams.id){
    var decodedurl = "https://crossorigin.me/"+decodeURIComponent($stateParams.id)+"?alt=json";
    apis.item( decodedurl ).then(function(result){ $scope.item = result.data.entry; });

  }

  var mail =  $location.path();
  $scope.mail = mail.replace("/", "");

  apis.prensa().then(function(result){
    $scope.prensa = result.data.feed.entry;
    angular.forEach($scope.prensa, function(value,key){
      value.id.$t = encodeURIComponent(value.id.$t);
    })
  });
  apis.gabinete().then(function(result){
    $scope.gabinete = result.data.feed.entry;
    angular.forEach($scope.gabinete, function(value,key){
      value.id.$t = encodeURIComponent(value.id.$t);
    })
  });
  apis.noticias().then(function(result){ $scope.noticias = result.data; });
  apis.eventos().then(function(result){ $scope.eventos = result.data.feed.entry; });

  apis.directorio().then(function(result){ $scope.directorio = result.data.feed.entry; });

  $scope.suscribirme_mail = function(){
    window.location ='suscripcion.html#'+$scope.mail;
  }

  $scope.noticiaOpen = function (id) {
        ngDialog.open({
          template: 'noticiaTmp',
          className: 'ngdialog-theme-default',
          scope: $scope,
          controller: ['$scope', 'apis', function($scope, apis){
            var decodedurl = "https://crossorigin.me/"+decodeURIComponent(id)+"?alt=json";
            apis.item( decodedurl ).then(function(result){ $scope.item = result.data.entry; });
          }]
        });
    };
}); //MainCtrl


app.controller('FormCtrl', function($scope, $http){
  $scope.sent = false;
  $scope.submitForm = function(e){
    var datos = $(e.target).serialize();
    $scope.form = {};
    $http({
      method: 'GET',
      url: 'http://www.dragonbarbudo.com/api/email.php?'+datos
    }).then(function(result){
      if(result.data=="1"){
        $scope.sent = true;
      }
    });

  }
});


app.factory('apis', function($q, $http){



  function noticias(){
    var deferred = $q.defer();
    $http({
      method    : "GET",
      url       : "data/noticias.json",
      headers   : { 'Content-type':'application/x-www-form-urlencoded; charset=UTF-8' }
    }).then(function(result){
      deferred.resolve(result);
    });
    return deferred.promise;
  }

  function eventos(){
    var deferred = $q.defer();
    $http({
      method    : "GET",
      //url       : "data/eventos.json",
      url        : "https://crossorigin.me/https://spreadsheets.google.com/feeds/list/1aRSdMP9EvlDHt7S7kkDoc2WGob-CxIMocY9EkpYyXR8/od6/public/values?alt=json",
      headers   : { 'Content-type':'application/x-www-form-urlencoded; charset=UTF-8' }
    }).then(function(result){
      deferred.resolve(result);
    });
    return deferred.promise;
  }

  function gabinete(){
    var deferred = $q.defer();
    $http({
      method    : "GET",
      //url       : "data/gabinete.json",
      url       : "https://crossorigin.me/https://spreadsheets.google.com/feeds/list/1CmY-2-blJMcBpstS3sVrDdMtUsUqMo3IZvwNJerHvKI/od6/public/values?alt=json",
      headers   : { 'Content-type':'application/x-www-form-urlencoded; charset=UTF-8' }
    }).then(function(result){
      deferred.resolve(result);
    });
    return deferred.promise;
  }

  function directorio(){
    var deferred = $q.defer();
    $http({
      method    : "GET",
      //url       : "data/directorio.json",
      url       : "https://crossorigin.me/https://spreadsheets.google.com/feeds/list/1UoBayKCH9DSJeOkwnNE07apiBK6PwtvuTjwTb5wxTfg/od6/public/values?alt=json",
      headers   : { 'Content-type':'application/x-www-form-urlencoded; charset=UTF-8' }
    }).then(function(result){
      deferred.resolve(result);
    });
    return deferred.promise;
  }

  function prensa(){
    var deferred = $q.defer();
    $http({
      method    : "GET",
      //url       : "data/prensa.json",
      url       : "https://crossorigin.me/https://spreadsheets.google.com/feeds/list/1nIBrB1x6Sc6fAsLeIakNuCkSSMbLVNm3kfQLOxbt2H8/od6/public/values?alt=json",
      headers   : { 'Content-type':'application/x-www-form-urlencoded; charset=UTF-8' }
    }).then(function(result){
      deferred.resolve(result);
    });
    return deferred.promise;
  }

  function item(id){
    var deferred = $q.defer();
    $http({
      method    : "GET",
      //url       : "data/prensa.json",
      url       : id,
      headers   : { 'Content-type':'application/x-www-form-urlencoded; charset=UTF-8' }
    }).then(function(result){
      deferred.resolve(result);
    });
    return deferred.promise;
  }


  return{
    prensa      : prensa,
    noticias    : noticias,
    eventos     : eventos,
    gabinete    : gabinete,
    directorio  : directorio,
    item        : item
  }

});

app.filter('htmlToPlaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);



/* OTHER CODES */
/* http://embed.plnkr.co/UAELQkmh18RVDn1cOAaW/ */
angular.module("tooltipster",[]).directive('tooltip', function () {
    return {
      restrict: 'C',
      link: function (scope, element, attrs) {
        $(element).tooltipster({
          animation: attrs.animation
        });
      }
    };
  });

/* NgBox */
angular.module("ngBox",[]).directive("ngBox",["$timeout",function(a){return{restrict:"C",scope:{useCss:"=",useSvg:"=",initialIndexOnArray:"=",removeBarsOnMobile:"=",hideCloseButtonOnMobile:"=",hideBarsDelay:"=",videoMaxWidth:"=",vimeoColor:"=",loopAtEnd:"=",autoplayVideos:"=",queryStringData:"=",toggleClassOnLoad:"=",beforeOpen:"&beforeOpen",afterOpen:"&afterOpen",afterClose:"&afterClose",nextSlide:"&nextSlide",prevSlide:"&prevSlide"},link:function(b){var c;return t={useCSS:b.useCss,useSVG:b.useSvg,initialIndexOnArray:b.initialIndexOnArray||0,removeBarsOnMobile:b.removeBarsOnMobile,hideCloseButtonOnMobile:b.hideCloseButtonOnMobile||!1,hideBarsDelay:0||3e3,videoMaxWidth:b.videoMaxWidth||1140,vimeoColor:b.vimeoColor||"cccccc",loopAtEnd:b.loopAtEnd||!1,autoplayVideos:b.autoplayVideos||!1,queryStringData:b.queryStringData||{},toggleClassOnLoad:b.toggleClassOnLoad||"",beforeOpen:b.beforeOpen||function(){},afterOpen:b.afterOpen||null,afterClose:b.afterClose||function(){},nextSlide:b.nextSlide||null,prevSlide:b.prevSlide||null},a(function(){angular.element(".ng-box").swipebox(c)})}}}]);




/* Facebook Widget */
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.async=true; js.src = "//connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.5&appId=944726105603358";
	fjs.parentNode.insertBefore(js, fjs);
} ( document, 'script', 'facebook-jssdk' ) );



/* Twitter Widget */
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
  return t;
}(document, "script", "twitter-wjs"));
