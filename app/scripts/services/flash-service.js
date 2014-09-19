'use strict';

angular.module('segoraClientApp')
    .factory("FlashService", function($rootScope) {
  var queue = [];
  var currentMessage = "";
  var type = ""; //success, info, warning, danger

  $rootScope.$on("$routeChangeSuccess", function() {
    $rootScope.$broadcast('displayMessage');
  });

  $rootScope.$on('displayMessage', function() {
    
    currentMessage = queue.shift() || "";
  });

  return {
    setMessage: function(message, messageType, showNow) {
      queue.push(message);
      type = messageType;

      if(showNow){
        $rootScope.$broadcast('displayMessage');
      }
    },
    getMessage: function() {
      return currentMessage;
    },
    clearMessages: function() {
      return queue = [];
    },
    getType: function(){
      return type;
    }
  };
});
