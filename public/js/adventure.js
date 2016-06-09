let quest = [];

function loadJSON(callback) {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', 'data/tavern.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState === 4 && xobj.status === 200) {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function spawnButton(buttonId, buttonName) {
  const $input = $('<input id="' +
  buttonId + '" value="' +
  buttonName + '" type="button"  class="btn btn-danger"/><br><br>');
  $input.appendTo($('#answerButtons'));
}

function showQuest(id) {
  const text = quest[id].questText;
  const delay = 50;
  const elem = $('#questText');
  const addTextByDelay = function (text, elem, delay) {
    function displayButtons() {
      $('#answerButtons').fadeIn('slow', function () {
          // start listening for button clicks
        $('#answerButtons').find('.btn').click(function () {
          showQuest(this.id);
        });
      });
    }
    if (text.length > 0) {
              // append first character
      if (text[0] === '|') {
        elem.append('<br>');
      } else {
        elem.append(text[0]);
      }
      setTimeout(
                  function () {
                      // Slice text by 1 character and call function again
                    addTextByDelay(text.slice(1), elem, delay);
                  }, delay
                  );
    } else {
      displayButtons();
    }
  };
  function resetButtons() {
      // clean up div and show the answer buttons
    $('#answerButtons').fadeOut('fast', function () {
        // Animation complete.
      $('#answerButtons').empty();
      for (let i = 0; i < quest[id].answers.length; i++) {
        spawnButton(quest[id].answers[i].route,
          quest[id].answers[i].answerText);
      }
    });
  }

  resetButtons();
  $('#questText').empty();
  addTextByDelay(text, elem, delay);
}

function init() {
  loadJSON(function (response) {
     // Parse JSON string into object
    quest = JSON.parse(response);
     // load first quest when parsed
    showQuest(0);
    console.log('initialized');
  });
}

$(document).ready(function () {
  console.log('page is ready');
  init();
});
