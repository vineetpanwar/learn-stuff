function selectionSort(arr){
  for(var i = 0; i<arr.length ;i++) {
    var min=arr[i],minIndex=i;
    
    for(var j=i+1; j <arr.length;j++){
     if(arr[j] < min) {
       min=arr[j];
       minIndex=j;
     }
    }
    if(i !== minIndex) {
    [arr[minIndex],arr[i]] = [arr[i],arr[minIndex]]
    }
  }
  return arr
}

console.log(selectionSort([3,5,4,7,2,1]))




//this file has the polyfill code of selection sorting
//traverse from left to right, find the min and store it index wise
const findMin = (arr,currIndex) => {
    var min,pos;
    for(var i = currIndex; i < arr.length; i++) {
        if(!min || arr[i] < min) {
            min = arr[i];
            pos = i;
        }
    }
    return {min, pos};
}
const selectionSort = (inpArray) => {
    for(let a = 0; a < inpArray.length; a++) {
        const {min,pos} = findMin(inpArray,a);
        var temp = inpArray[a];
        inpArray[a] = min;
        inpArray[pos] = temp;
    }
    return inpArray;
}

console.log(selectionSort([3,8,2,1,5,4,6,7]))
console.log(selectionSort([5,3,4,4,-1,-8,100,4,6,7,8,6,7]))
