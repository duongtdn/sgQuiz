(function(){

  "use strict";

  angular
    .module('app.sgQuiz')
    .factory('$quizService', $quizService);

  $quizService.$inject = ['$rootScope', '$meteor'];

  function $quizService ($rootScope, $meteor) {
    // get quiz from database and watch it, when synced for initQuiz
    var quizCol = $meteor.collection(Quiz,false);
    $rootScope.$watchCollection(function() { return quizCol }, initQuiz);

    var quiz = {};

    // service API
    var services = {
      getQuiz       : getQuiz,
      nextQuiz      : nextQuiz,
      previousQuiz  : previousQuiz,
      gotoQuiz      : gotoQuiz,
      isFirstQuiz   : isFirstQuiz,
      isLastQuiz    : isLastQuiz,
      checkResult   : checkResult
    };
    return services;

    // API implementation

    function getQuiz() {
      return quiz;
    } // end func getQuiz

    function nextQuiz() {
      var qid = quiz.id + 1;
      if (qid < quizCol.length) {
        gotoQuiz(qid);
      }
    } // end func nextQuiz

    function previousQuiz() {
      var qid = quiz.id - 1;
      if (qid >=0) {
        gotoQuiz(qid);
      }
    } // end func previousQuiz

    function gotoQuiz(id) {
      quiz['id'] = id;
      quiz['data'] = quizCol[quiz.id];
    } // end func gotoQuiz

    function isFirstQuiz(id) {
      return id === 0;
    } // end func isFirstQuiz

    function isLastQuiz(id) {
      return id === quizCol.length - 1;
    } // end func isLastQuiz

    function checkResult() {
      var choices = quiz.data.option;
      for (var i = 0, len = choices.length; i < len; i++) {
        choices[i].value = choices[i].value || false;
        if (choices[i].value !== choices[i].correct) {
          return false;
        }
      }
      return true;
    } // end func checkResult

    // supporter funcs

    function initQuiz() {
      gotoQuiz(0);
    }

  }

})();
