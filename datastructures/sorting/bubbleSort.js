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
console.log(bubbleSort([-1,7,4,-4,6,5,-8]))