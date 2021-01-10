//this file has the polyfill code of insertion sorting
//here we tranverse from left to right such that everything to the left is sorted and everything to the right is 
//unsorted. for performance optimization we trasverse oly if we swap the elements.
const sortArray = (arr,currIndex) => {
    var swapped;
    for(var i = currIndex; i >= 0; i--) {
        swapped = false;
        if(arr[i-1] && arr[i] < arr[i-1]) {
            swapped = true;
            var temp = arr[i-1];
            arr[i-1] = arr[i];
            arr[i] = temp;
        }
        if(!swapped) break;
    }
    return arr;
}
const insertionSort = (inpArray) => {
    for(let a = 0; a < inpArray.length; a++) {
        //since the left part is sorted array, if the lst element of the left subarray is greater than 
        //the current element, sorting is not required.
        if(inpArray[a-1] && (inpArray[a] < inpArray[a-1])){
            sortArray(inpArray,a);
        }
    }
    return inpArray;
}

console.log(insertionSort([5,3,4,4,8,6,7]))
console.log(insertionSort([5,3,4,4,-1,-8,100,4,6,7,8,6,7]))
