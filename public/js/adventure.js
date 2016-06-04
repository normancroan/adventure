function spawnButton(buttonId, buttonName){
    var $input = $('<input id=' +buttonId+ ' value=' +buttonName+ ' type="button"  class="btn btn-warning"/>');
    $input.appendTo($("#answers"));
}

$( document ).ready(function() {
    console.log( "ready!" );

    for (var i=0; i<5; i++){
      spawnButton(i,"PushMe");
    }

    $("#answers").find(".btn").click(function () {
        console.log((this.id));
    });

});
