Function.prototype.customizedCall = function(someOtherThis = global) {
    var uniqueID = Symbol();
    someOtherThis[uniqueID] = this;
    const argsArray = [];
    for(var i  = 1; i < arguments.length; i++) {
        argsArray.push(`arguments[${i}]`)
    }
    var result = eval(`someOtherThis[uniqueID](${argsArray})`);
    delete someOtherThis[uniqueID];
    return result
}

var sayHello = function (message) {
    console.log(`${this.name}: ${message}`)
}
var vineet = {name: "vineet"}

sayHello.customizedCall(vineet, "thanks for the beautiful life")

