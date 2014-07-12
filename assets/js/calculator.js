var calculator = {
  init: function() {
    calculator.setup();
  },

  setup: function() {
    // Add click listeners to digit buttons
    for(var i=0; i<10; i++){
      $("[data-id='"+i+"']").click(function(event){
        //console.log($(event.currentTarget).attr("data-id"));
        calculator.updateOutput($(event.currentTarget).attr("data-id"));
      });
    }

    $("[data-id='AC']").click(function(event){
      calculator.resetOutput();
    });

    $("[data-id='+']").click(function(event){
      $("[data-id='+']").css("background-color","black");

      calculator.operation = "+";
    });
  },

  updateOutput: function(input) {

    //Is an operation queued?
    if(calculator.operation && calculator.operation.length > 0){
      console.log("op in queue!");
    }

    var output = $("#output").html();
    if(output.length < 10){
      if(output === "0"){
        $("#output").html(input);
      } else {
        $("#output").html(output + input);
      }
    }
  },

  resetOutput: function() {
    $("#output").html("0");
  }
};

$(document).ready(calculator.init());