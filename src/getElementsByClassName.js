// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className,element) {
  element = element || document.body;

  var results = [];
  var classes = element.className;
  
  //if element has class name
  if (classes && classes.indexOf(className) >= 0){
    //push to results
    results.push(element);
  }
  //if element has children
  if(element.hasChildNodes()){
    var children = element.childNodes;
    //iterate through children
    for (var i = 0;i<children.length;i++){
      //to find class name
      var child = getElementsByClassName(className,children[i]);
      if (child.length > 0) {
        results = results.concat(child);
      }

    }
    
  }


  // your code here
  return results;
};
