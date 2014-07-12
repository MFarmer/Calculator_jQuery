var calculator = {

  values: [],

  engagedButtons: [],

  clearOnNextInput: false,

  lastOperation: null,


  init: function() {
    calculator.setup();
  },

  setup: function() {
    // Add click listeners to digit buttons
    for(var i=0; i<10; i++){
      $("[data-id='"+i+"']").click(function(event){
        calculator.updateOutput($(event.currentTarget).attr("data-id"));
      });
    }

    $("[data-id='AC']").click(function(event){
      calculator.resetOutput();
    });

    $("[data-id='=']").click(function(event){
      if(calculator.values.length > 0){
        calculator.values.push($("#output").html());
        calculator.engagedButtons = [];
        calculator.performCalculation(calculator.lastOperation);
      }
    });

    $("[data-id='+']").click(function(event){
      calculator.handleOperation("+");
    });

    $("[data-id='-']").click(function(event){
      calculator.handleOperation("-");
    });

    $("[data-id='/']").click(function(event){
      calculator.handleOperation("/");
    });

    $("[data-id='*']").click(function(event){
      calculator.handleOperation("*");
    });

    $("[data-id='+/-']").click(function(event){
      var output = $("#output").html();

      if(output[0] === "-"){
        output = output.substr(1,output.length-1);
      } else {
        output = "-" + output;
      }

      $("#output").html(output);
    });
  },

  performCalculation: function(op) {
    var result = 0;

    if(op === "+"){
      result = parseInt(calculator.values[0]) + parseInt(calculator.values[1]);
    } else if(op === "-"){
      result = parseInt(calculator.values[0]) - parseInt(calculator.values[1]);
    } else if(op === "/"){
      result = parseInt(calculator.values[0]) / parseInt(calculator.values[1]);
    } else if(op === "*"){
      result = parseInt(calculator.values[0]) * parseInt(calculator.values[1]);
    }

    $("#output").html(result);
    calculator.values = [];
  },

  handleOperation: function(op) {
    calculator.lastOperation = op;
    calculator.values.push($("#output").html());

    if(calculator.values.length > 1){
      calculator.performCalculation(op);
    }

    $("[data-id='"+op+"']").css("background-color","black");
    calculator.engagedButtons.push("[data-id='"+op+"']");
    calculator.clearOnNextInput = true;
  },

  updateOutput: function(input) {
    if(calculator.clearOnNextInput){

      $("#output").html(input);
      calculator.clearOnNextInput = false;
      calculator.disengageButtons();

    } else {
      var output = $("#output").html();
      if(output.length < 10){
        if(output === "0"){
          $("#output").html(input);
        } else {
          $("#output").html(output + input);
        }
      }
    }
  },

  disengageButtons: function() {
    for(var i=0; i<calculator.engagedButtons.length; i++){
      $(calculator.engagedButtons[i]).css("background-color","gray");
    }
    calculator.engagedButtons = [];
  },

  resetOutput: function() {
    $("#output").html("0");
    for(var i=0; i<calculator.engagedButtons.length; i++){
      $(calculator.engagedButtons[i]).css("background-color","gray");
    }
    calculator.engagedButtons = [];
    calculator.values = [];
    calculator.clearOnNextInput = false;
  }
};

$(document).ready(calculator.init());