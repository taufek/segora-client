angular.module('segoraClientApp')
    .filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    }
});