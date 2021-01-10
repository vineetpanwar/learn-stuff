//this file has the polyfill code of merge sorting
//split the array into groups of 1 and then slowly slowly reconstruct array by combinng two groups each 

//the below code is merging the arrays
const mergeArray = (leftArr, rightArr, inpArr) => {
    const leftLength = leftArr.length;
    const rightLength = rightArr.length;
    //i represents the smallest unpicked nuber in leftArr
    //j represents the smallest unpicked nuber in rightArr
    //k represents the position index where the element has to be placed 
    let i = j = k = 0;
    //this while is executed when both of the array has unpicked elements 
    while(i < leftLength && j < rightLength) {
        //we compare the smallest of unpicked elements of each array and place it right in the parent array
        if(leftArr[i] <= rightArr[j]){
            //left elements current element is smaller than right arrays current element
            inpArr[k] = leftArr[i];
             i++;
        } else {
            //right elements current element is smaller than left arrays current element
            inpArr[k] = rightArr[j];
            j++;
        }
        k++;
    }

    //this while is executed when only left array has unpicked elements
    while(i < leftLength) {
        inpArr[k] = leftArr[i]
        i++;
        k++;
    }
    //this while is executed when only right array has unpicked elements
    while(j < rightLength) {
        inpArr[k] = rightArr[j]
        j++;
        k++;
    }
}

// 
const mergeSort = (inpArray) => {
    const n = inpArray.length;
    if(n < 2) return inpArray
    const mid = Math.ceil(n / 2);
    const leftArr = inpArray.slice(0, mid);
    const rightArr = inpArray.slice(mid, n);
    mergeSort(leftArr);
    mergeSort(rightArr);
    mergeArray(leftArr, rightArr,inpArray);
    return inpArray;
}

console.log(mergeSort([3,8,2,1,5,4,6,7]))
console.log(mergeSort([5,3,4,4,-1,-8,100,4,6,7,8,6,7]))
