
function countNumRegion(inputArray){
    var countRegion = inputArray.length;
    inputArray.forEach((curr,index) => {
    var leftIndex = 1;
    var rightIndex = 1;
    
    //navigat towards left and right and find valid region
    while( inputArray[index - leftIndex] && curr >= inputArray[index - leftIndex] || inputArray[index + rightIndex] && curr >= inputArray[index + rightIndex]){
       
      if(curr >= inputArray[index - leftIndex]) {leftIndex++ ; countRegion++;}
      if(curr >= inputArray[index + rightIndex]) {rightIndex ++; countRegion++;}
    }
    
  });
    return countRegion;
  }
  
  
  var a = [1,2,1,3,4,2,2,1];
  var b = [1,2,1];
  var c = [1,1,2,1];
  console.log(countNumRegion(a));
  console.log(countNumRegion(b));
  console.log(countNumRegion(c));
  
  