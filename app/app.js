


var app = angular.module('dw4', [
  'ng-backstretch',
  'ngBox',
  'tooltipster',
  'duScroll',
  'slickCarousel'
]);

app.config(function(){

});


app.run(function(){

});


app.controller('MainCtrl', function($scope){


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
