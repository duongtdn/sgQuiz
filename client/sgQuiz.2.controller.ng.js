(function(){

  "use strict";

  angular
    .module('app.sgQuiz')
    .controller('SgQuizController', SgQuizController);

  SgQuizController.$inject = ['$quizService', '$mdDialog'];

  function SgQuizController ($quizService, $mdDialog) {
    var vm = this;

    // using custom service

    vm.quiz = $quizService.getQuiz();
    vm.next = $quizService.nextQuiz;
    vm.back = $quizService.previousQuiz;
    vm.isFirstQuiz = $quizService.isFirstQuiz;
    vm.isLastQuiz = $quizService.isLastQuiz;

    vm.checkResult = checkResult;

    function checkResult() {
      var check = $quizService.checkResult() ? 'correct' : 'incorrect';
      var alert = $mdDialog.alert({
        title : 'Result evaluated',
        content : 'Your answer is ' + check,
        ok : 'Close'
      });
      $mdDialog
        .show ( alert )
        .finally (function () {
          alert = undefined;
        });
    }

  } // end func SgQuizController


})();
