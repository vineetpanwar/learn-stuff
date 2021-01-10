//simple implementation of filter
Array.prototype.myfilter = function(callFn) {
    outputArr = [];
    for(var i = 0; i < this.length; i++) {
        if(callFn(this[i], i, this)) outputArr.push(this[i])
    }
    return outputArr
}

//usage
var a  = [1,2,3,4,5,6].filter((curr) => 1)
var b  = [1,2,3,4,5,6].myfilter((curr) => 1)
console.log(a,b
)