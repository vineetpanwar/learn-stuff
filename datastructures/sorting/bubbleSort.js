function bubbleSort(arr){
  var noSwaps ;
  for(var i = arr.length - 1; i >=0; i--) {
    noSwaps = true;
    for(var j = 0; j <= i; j++) {
      if(arr[j] > arr[j+1]) {
        [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
        noSwaps = false;
      }
    }
    if(noSwaps) break;
  }
  return arr
}


console.log(bubbleSort([3,1,2,5,6,0]))
console.log(bubbleSort([-1,7,4,-4,6,5,-8]))


//there is also one more approach

//this file has the polyfill code of bubble sorting
//we traverse form left to right and the bigger number are swapped to the right
//we do this recursively until the swwpping has taken place
const bubbleSort = (inpArray) => {
    let swapped = false;
    for(let a = 0; a < inpArray.length; a++) {
        if(inpArray[a+1] && (inpArray[a] > inpArray[a+1])){
            swapped = true;
            var temp = inpArray[a];
            inpArray[a] = inpArray[a+1];
            inpArray[a+1] = temp;
        }
    }
    if(!global.numberOfPasses) global.numberOfPasses = 1;
    else global.numberOfPasses++;
    if(swapped) bubbleSort(inpArray);
    var ai = global.numberOfPasses;
    const returnVal = {val:inpArray,iterations:ai};
    console.log('vinet',JSON.stringify(returnVal))
    delete global.numberOfPasses;
    return returnVal;
}
console.log(bubbleSort([3,7,4,4,6,5,8]))
