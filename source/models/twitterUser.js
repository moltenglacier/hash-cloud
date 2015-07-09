'use strict';

angular.module('sif')
.service('twitterUser', function(urls, $http, FBService) {

  var withTokens = function(obj) {
    obj.access_token_key = FBService.currentUser.accessToken;
    obj.access_token_secret = FBService.currentUser.accessTokenSecret;
    return obj;
  };

  this.colorGen = function(followers, friends){
    var ratio = followers / friends;
    if (ratio < 1){
      var rgb = Math.floor(ratio * 255);
      return 'rgb(' + 255 + ", " + rgb + ", " + rgb + ')';
    }
    if (ratio >= 1) {
      return 'rgb(' + Math.floor(ratio) + ", " + 255 + ", " + 51 + ')';
    }
  };

  this.search = function(words) {
    var data = withTokens({ words: words });
    return $http.post(urls.apiUrl + "/search", data);
  };

  this.sendTweet = function(tweet) {
    var data = withTokens({ tweet: tweet });
    return $http.post(urls.apiUrl + "/tweet", data);
  };

});