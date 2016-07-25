// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {

  var result;
  var type = typeof obj;

  if (type === 'boolean' || type === 'number' || obj === null) {
    result = '' + obj;
  } else if (type === 'string') {
    result = '"' + obj + '"';
  } else if (Array.isArray(obj)) {
    var arr = [];
    for(var i = 0;i<obj.length;i++){
      arr.push(stringifyJSON(obj[i]));
    }
    return '['+ arr.join(',') + ']';
  } else if (type === 'object'){
    var objArray = [];
    for(var key in obj){
      if(obj[key] === undefined || typeof obj[key] === 'function'){
        continue;
      }
      var keyString = stringifyJSON(key);
      var valString = stringifyJSON(obj[key]);
      objArray.push(keyString + ":" + valString); 
    }
    return '{'+ objArray.join(',') + '}';
  }

  return result;

};
