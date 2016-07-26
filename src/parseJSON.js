// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var char = json.charAt(0);
  var position = 0;

  var next = function(num) {
    num = num || 1;
    position += num;
    char = json.charAt(position);
  };

  // sort function
    // check char and call correct parse function
  var sort = function() {
    if (char === 't' || char === 'f' || char === 'n') {
      return isBoolNull();
    } else if (char === '-' || (/\d/).test(char)) {
      return isNumber();
    } else if (char === '"') {
      return isString();
    } else if (char === '[') {
      next();
      return isArray();
    } else if (char === '{') {
      next();
      return isObject();
    } else if (char === ' ') {
      next();
      return sort();
    }
  };


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
    }

  };

  // number function
  var isNumber = function() {
    var regex = /-?\d*\.?\d+/;
    var num = regex.exec(json.slice(position));
    var moveAmount = num[0].length;
    next(moveAmount);
    return Number(num[0]);
  };


  var weird = {
    '\"': '\"',
    '\\': '\\',
    '/': '/',
    b: '\b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t'
  };

  //   " + "//" + " " \"\"a\""   
  // string function
  var isString = function() {
    var stringArr = [];

    if (json.charAt(position + 1) === '"') {
      next(2);
      return '';
    }

    var regex = /(["'])(?:(?=(\\?))\2.)*?\1/;
    var str = regex.exec(json.slice(position));
    var quotes = str[0];
    var moveAmount = quotes.length;
    var noQuotes = quotes.slice(1, -1);
    next(moveAmount);

    //Look for escape character
    for (var i = 0; i < noQuotes.length; i++) {
      if (noQuotes.charAt(i) === '\\') {
        if (weird[noQuotes.charAt(i + 1)]) {
          stringArr.push(weird[noQuotes.charAt(i + 1)]);
          i++;
        } 
      } else {
        stringArr.push(noQuotes.charAt(i));
      }

    }
    //compare to weird database
    //replace escape character with break
    //return

    return stringArr.join('');
  };
  // array function
  var isArray = function() {
    var resultsArr = [];
    if (char === ']') {
      next();
      return resultsArr;
    }
    
    while (char !== ']') {
      resultsArr.push(sort()); 
      if (char !== ']') {
        next();
      }
    }
    return resultsArr; 
  };

  // object function

  var isObject = function() {
    var resultsObj = {};
    while (char !== '}') {
      var key = sort();
      next();
      var value = sort();
      resultsObj[key] = value;
      if (char !== '}') {
        next();
      }
    }
    next();
    return resultsObj;
  };


  return sort();


};
