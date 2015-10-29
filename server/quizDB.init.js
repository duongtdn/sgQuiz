(function(){

  Meteor.startup(function () {
    if ( Quiz.find().count() === 0 ) {

      var quizDB = [
        {
          title : 'First Quiz',
          content : [
            {
              align : 'stat center',
              items : [{type:'text', src:'How many <code>pictures</code> appeared below?'}]
            },
            {
              align : 'start center',
              items : [{type:'image', src:'/asset/img1.png'},{type:'image', src:'/asset/img2.png'}]
            },
            {
              align : 'start center',
              items : [{type:'text', src:'Hope it works'}]
            }
          ],
          option : [
            {id : 'A', label : 'Option A', correct : true},
            {id : 'B', label : 'Option B', correct : false},
            {id : 'C', label : 'Option C', correct : true,},
            {id : 'D', label : 'Option D', correct : false}
          ]
        },
        {
          title : 'Second Quiz',
          content : [
            {
              align : 'stat center',
              items : [{type:'text', src:'How many <code>pictures</code> appeared below?'}]
            },
            {
              align : 'start center',
              items : [{type:'image', src:'/asset/img2.png'},{type:'image', src:'/asset/img1.png'}]
            },
            {
              align : 'start center',
              items : [{type:'text', src:'Hope it works'}]
            }
          ],
          option : [
            {id : 'A', label : 'Option 1', correct : false},
            {id : 'B', label : 'Option 2', correct : true},
            {id : 'C', label : 'Option 3', correct : false,}
          ]
        },
        {
          title : 'Third Quiz',
          content : [
            {
              align : 'stat center',
              items : [{type:'text', src:'bla bla bla'}]
            },
            {
              align : 'start center',
              items : [{type:'image', src:'/asset/img2.png'}]
            },
            {
              align : 'start center',
              items : [{type:'text', src:'Hope it works'}]
            }
          ],
          option : [
            {id : 'A', label : 'Here the Choice 1', correct : false},
            {id : 'B', label : 'And the Choice 2', correct : true},
            {id : 'C', label : 'Anyway, there still Choice 3', correct : false,},
            {id : 'D', label : 'Not finish, Choice 4 is here', correct : false,}
          ]
        }
      ];

      for (var i = 0; i < quizDB.length; i++) {
        Quiz.insert(quizDB[i]);
      }

    }

  });

})();
