var quest = [];

 function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data/tavern.json', true); // Replace 'my_data' with the path to your file
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
    var $input = $('<input id="' +buttonId+ '" value="' +buttonName+ '" type="button"  class="btn btn-danger"/><br><br>');
    $input.appendTo($("#answerButtons"));
  }

  function showQuest(id){
    /* not fading quest anymore, using scroll
    resetButtons();
    //fade quest text out, load correct quest, fade in
    $( "#questText" ).fadeOut( "fast", function() {
        $('#questText').text(quest[id].questText);
            $( "#questText" ).fadeIn( "slow", function() {
              displayButtons();
            });
    });
    */
    //scroll the text REFACTOR THIS UGLY THING :P
      var text = quest[id].questText;
      var delay=50;
      var elem = $("#questText");
      var addTextByDelay = function(text,elem,delay){
          if(text.length >0){
              //append first character
              if (text[0] === "|") {
                elem.append("<br>")
              } else {
                elem.append(text[0]);
              }
              setTimeout(
                  function(){
                      //Slice text by 1 character and call function again
                      addTextByDelay(text.slice(1),elem,delay);
                   },delay
                  );
          } else {
            displayButtons();
          }
      }

    resetButtons();
    $( "#questText" ).empty();
    addTextByDelay(text,elem,delay);

    function displayButtons(){
      $( "#answerButtons" ).fadeIn( "slow", function() {
        //start listening for button clicks
          $("#answerButtons").find(".btn").click(function () {
              showQuest(this.id);
            });
          });
    }
    function resetButtons(){
      //clean up div and show the answer buttons
      $( "#answerButtons" ).fadeOut( "fast", function() {
        // Animation complete.
        $( "#answerButtons" ).empty();
        for (var i=0; i<quest[id].answers.length; i++){
        spawnButton(quest[id].answers[i].route,
          quest[id].answers[i].answerText);
        }
      });
    }
  }

$( document ).ready(function() {
    init();
});
