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
  'slickCarousel',
  'angular-loading-bar'
]);

app.config(function(){

});


app.run(function(){

});


app.controller('MainCtrl', function($scope, apis, $location){
  $scope.prensa;
  $scope.noticias;
  $scope.eventos;
  $scope.gabinete;
  $scope.directorio;

  var mail =  $location.path();
  $scope.mail = mail.replace("/", "");

  apis.prensa().then(function(result){ $scope.prensa = result.data; });
  apis.noticias().then(function(result){ $scope.noticias = result.data; });
  apis.eventos().then(function(result){ $scope.eventos = result.data; });
  apis.gabinete().then(function(result){ $scope.gabinete = result.data; });
  apis.directorio().then(function(result){ $scope.directorio = result.data; });

  $scope.suscribirme_mail = function(){
    window.location ='suscripcion.html#'+$scope.mail;
  }

});

app.controller('FormCtrl', function($scope, $http){
  $scope.sent = false;
  $scope.submitForm = function(e){
    console.log(e.target);
    var datos = $(e.target).serialize();
    $scope.form = {};
    $http({
      method: 'GET',
      url: 'http://www.dragonbarbudo.com/api/email.php?'+datos
    }).then(function(result){
      console.log('http://www.dragonbarbudo.com/api/email.php?'+datos);
      if(result.data=="1"){
        console.log('done');
        $scope.sent = true;
      }
    });

  }
});


app.factory('apis', function($q, $http){

  function prensa(){
    var deferred = $q.defer();
    $http({
      method    : "GET",
      url       : "data/prensa.json",
      headers   : { 'Content-type':'application/x-www-form-urlencoded; charset=UTF-8' }
    }).then(function(result){
      deferred.resolve(result);
    });
    return deferred.promise;
  }

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
      url       : "data/eventos.json",
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
      url       : "data/gabinete.json",
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
      url       : "data/directorio.json",
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
    directorio  : directorio
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
