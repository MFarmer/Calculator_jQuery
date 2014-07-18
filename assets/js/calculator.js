/*
  Programmer: Matthew Farmer
  Date: July 17, 2014
 */
(function(root){
  var Widgets = root.Widgets = ( root.Widgets || {} );

  var Calculator = Widgets.Calculator = function() {
    this.values = [];
    this.engagedButtons = [];
    this.clearOnNextInput = false;
    this.lastOperation = null;
    this.$output = $("#output");
  };

  Calculator.prototype.setup = function() {
    var that = this;

    for(var i=0; i<10; i++){
      $("[data-id='"+i+"']").click(function(event){
        that.updateOutput($(event.currentTarget).attr("data-id"));
      });
    }

    $("[data-id='AC']").click(function(event){
      that.resetOutput();
    });

    $("[data-id='=']").click(function(event){
      if(that.values.length > 0){
        that.values.push($("#output").html());
        that.engagedButtons = [];
        that.performCalculation(that.lastOperation);
      }
    });

    $("[data-id='+']").click(function(event){
      that.handleOperation("+");
    });

    $("[data-id='-']").click(function(event){
      that.handleOperation("-");
    });

    $("[data-id='/']").click(function(event){
      that.handleOperation("/");
    });

    $("[data-id='*']").click(function(event){
      that.handleOperation("*");
    });

    $("[data-id='+/-']").click(function(event){
      var output = that.$output.html();

      console.log("Output is " + output);

      if(output[0] === "-"){
        output = output.substr(1,output.length-1);
      } else {
        output = "-" + output;
      }

      that.$output.html(output);
    });

    $("[data-id='%']").click(function(event){
      var output = that.$output.html();
      output = parseFloat(output) / 100;
      that.$output.html(output);
    });

    $("[data-id='.']").click(function(event){
      var output = that.$output.html();
      if(output.indexOf(".") === -1){
        output += ".";
      }
      that.$output.html(output);
    });
  };

  Calculator.prototype.performCalculation = function(op) {
    var result = 0;

    if(op === "+"){
      result = parseFloat(this.values[0]) + parseFloat(this.values[1]);
    } else if(op === "-"){
      result = parseFloat(this.values[0]) - parseFloat(this.values[1]);
    } else if(op === "/"){
      result = parseFloat(this.values[0]) / parseFloat(this.values[1]);
    } else if(op === "*"){
      result = parseFloat(this.values[0]) * parseFloat(this.values[1]);
    }

    this.$output.html((""+result).substr(0,10));
    this.values = [];
  };

  Calculator.prototype.handleOperation = function(op) {
    this.lastOperation = op;
    this.values.push($("#output").html());

    if(this.values.length > 1){
      this.performCalculation(op);
    }

    $("[data-id='"+op+"']").css("background-color","black");
    this.engagedButtons.push("[data-id='"+op+"']");
    this.clearOnNextInput = true;
  };

  Calculator.prototype.updateOutput = function(input) {

    if(this.clearOnNextInput){

      this.$output.html(input);
      this.clearOnNextInput = false;
      this.disengageButtons();

    } else {
      var output = this.$output.html();
      if(output.length < 10){
        if(output === "0"){
          $("#output").html(input);
        } else {
          $("#output").html(output + input);
        }
      }
    }
  };

  Calculator.prototype.disengageButtons = function() {
    for(var i=0; i<this.engagedButtons.length; i++){
      $(this.engagedButtons[i]).css("background-color","#7f8c8d");
    }
    this.engagedButtons = [];
  };

  Calculator.prototype.resetOutput = function() {
    this.$output.html("0");
    this.disengageButtons();
    this.values = [];
    this.clearOnNextInput = false;
  };

})(window);

$(document).ready(function(){
  var test = new Widgets.Calculator();
  test.setup();
});