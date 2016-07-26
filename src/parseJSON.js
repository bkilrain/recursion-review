// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var char;
  var position;

  var next = function(num) {
    num = num || 1;
    position += num;
    char = json.charAt(position);
  };

  // sort function
    // check char and call correct parse function

  // boolean and null function

  var isBoolNull = function() {
    if (char === 't') {
      var check = json.slice(position, position + 4);
      if (check === 'true') {
        next(4);
        return true;
      }
    } else if (char === 'f') {
      var check = json.slice(position, position + 5);
      if (check = 'false') {
        next(5);
        return false;
      }
    } else if (char === 'n') {
      var check = json.slice(position, position + 4);
      if (check === 'null') {
        next(4);
        return null;
    }

  };

  // number function
  var isNumber = function() {
    var regex = /-?\d+\.?\d+/;
    var num = regex.exec(json.slice(position));
    var moveAmount = num[0].length;
    next(moveAmount);
    return Number(num[0]);
  }
  // string function
  var isString = function(){
    var regex = 
  }
  // array function

  // object function



};
