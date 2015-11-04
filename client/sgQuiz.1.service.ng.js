(function(){

  "use strict";

  angular
    .module('app.sgQuiz')
    .factory('$quizService', $quizService);

  $quizService.$inject = ['$rootScope', '$meteor'];

  function $quizService ($rootScope, $meteor) {
    // get quiz from database and watch it, when synced for initQuiz
    var quizCollection = $meteor.collection(Quiz,false);
    $rootScope.$watchCollection(function() { return quizCollection }, initQuiz);

    var quiz = {};      // represent for each quiz
    var complete = {};  // store user progress of completion

    // service API
    var services = {
      getQuiz         : getQuiz,
      nextQuiz        : nextQuiz,
      previousQuiz    : previousQuiz,
      gotoQuiz        : gotoQuiz,
      quizCount       : quizCount,
      isFirstQuiz     : isFirstQuiz,
      isLastQuiz      : isLastQuiz,
      isCurrentQuiz   : isCurrentQuiz,
      isCompleteQuiz  : isCompleteQuiz,
      checkResult     : checkResult
    };
    return services;

    // API implementation

    function getQuiz() {
      return quiz;
    } // end func getQuiz

    function nextQuiz() {
      var qid = quiz.id;
      completeQuiz(qid);
      if (qid < quizCollection.length - 1) {
        qid++;
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
      quiz['data'] = quizCollection[quiz.id];
    } // end func gotoQuiz

    function quizCount() {
      return quizCollection.length;
    }

    function isFirstQuiz(id) {
      return id === 0;
    } // end func isFirstQuiz

    function isLastQuiz(id) {
      return id === quizCollection.length - 1;
    } // end func isLastQuiz

    function isCurrentQuiz(id) {
      return id === quiz.id;
    }

    function isCompleteQuiz(id) {
      console.log ( id + " :--------------------------------------------------");
      console.log ( !isCurrentQuiz(id) );
      console.log ( complete[id] );
      return !isCurrentQuiz(id) && complete[id];
    }

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

    function completeQuiz(id) {
      complete[id] = true;
      console.log (complete);
    }

  }

})();
