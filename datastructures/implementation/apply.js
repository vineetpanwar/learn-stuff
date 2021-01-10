Function.prototype.customizedApply = function(someOtherThis = global, arr) {

    var uniqueID = Symbol();
    someOtherThis[uniqueID] = this;
    var result;
    var argumentArr = []

    if(!arr) {
        result = someOtherThis[uniqueID]()
    } else {
        for(var i = 0; i < arr.length;i++) {
            argumentArr.push(`arr[${i}]`)
        }

        result = eval(`someOtherThis[uniqueID](${argumentArr})`);
    }

    delete someOtherThis[uniqueID] ;
    return result;

}

var sayHello = function (...message) {
    console.log(`${this.name}: ${message.reduce((prev,curr) => prev + curr, "")}`)
}
var vineet = {name: "vineet"}

sayHello.customizedApply(vineet, ["thanks", "for", "the", "beautiful", "life"])