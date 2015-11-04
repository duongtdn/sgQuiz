(function() {

  "use strict";

  angular
    .module('app.sgQuiz')
    .filter('range', range);

  function range() {
    return function (input) {
      var lowBound, highBound;
      switch (input.length) {
        case 1:
          lowBound = 0;
          highBound = parseInt(input[0]) - 1;
          break;
        case 2:
          lowBound = parseInt(input[0]);
          highBound = parseInt(input[1]);
          break;
        default:
          return input;
      } // end switch
      var result = [];
      for (var i = lowBound; i <= highBound; i++) {
        result.push(i);
      }
      return result;
    }
  }

})();
