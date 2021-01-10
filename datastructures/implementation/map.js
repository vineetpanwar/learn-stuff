//this is a simple implementation of map
Array.prototype.myMap = function(callFn){
    var outputArray = [];
    for(i = 0; i < this.length; i++) {
        outputArray.push(callFn(this[i], i , this))
    }
    return outputArray
};

//usage
console.log([1,2,3,4,5].myMap((curr,index) => curr * curr))