var quest = [];

 function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data/quest.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }

 function init() {
   loadJSON(function(response) {
     // Parse JSON string into object
     quest = JSON.parse(response);
     // load first quest when parsed
     showQuest(0);
   });
 }

  function spawnButton(buttonId, buttonName){
    var $input = $('<input id="' +buttonId+ '" value="' +buttonName+ '" type="button"  class="btn btn-info"/><br><br>');
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
    init();
});
