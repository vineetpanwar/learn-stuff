function binarySearch(arr,ele){
  var left=0, right=arr.length-1, found = false, result;
  
  
  while(!found) {
    var middle = Math.floor((left + right) / 2);
    if(arr[middle] === ele){
      result = middle;
      found = true;
    } else if(ele > arr[middle]) {
      left = middle +1;
    } else {
      right = middle-1;
    }
  }
  console.log(left,right,middle)
  return result? result : -1
}
              
console.log(binarySearch([1,2,3,4,5,6,7,8,9], -10))
