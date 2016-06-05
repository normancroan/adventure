var quest = [
  {
    "questId" : 0,
    "questText": "Greetings traveler, your adventure begins now",
    "answers": [{"answerText": "Go to #2", "route": 1}, {"answerText": "Go to #3", "route": 2}]
  },
  {
    "questId" : 1,
    "questText": "This is the second quest text",
    "answers": [{"answerText": "Go to #3", "route": 2}]
  },
  {
    "questId" : 2,
    "questText": "This is the third quest text",
    "answers": [{"answerText": "Go to #1", "route": 0}]
  }
]

  function spawnButton(buttonId, buttonName){
    var $input = $('<input id="' +buttonId+ '" value="' +buttonName+ '" type="button"  class="btn btn-warning"/>');
    $input.appendTo($("#answerButtons"));
  }

  function showQuest(id){
    //show quest text
    $('#questText').text(quest[id].questText);

    //clean up div and show the answer buttons
    $( "#answerButtons" ).empty();
    for (var i=0; i<quest[id].answers.length; i++){
      spawnButton(quest[id].answers[i].route,
        quest[id].answers[i].answerText);
      }
    //start listening for button clicks
      $("#answerButtons").find(".btn").click(function () {
          showQuest(this.id);
      });
    }

    $( document ).ready(function() {
    showQuest(0);
  });
