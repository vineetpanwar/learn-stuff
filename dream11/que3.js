function perfectSubstringCount(str , k){
    var len = str.length;
    var pairVal = k;
    var numberOfPerfectSubstrings = 0;
    while( pairVal <= len){
        for(var i =0 ;  (i+pairVal) <= len ; i++){
            if (checkIfPerfectString(str.slice(i,i+pairVal),k)) numberOfPerfectSubstrings++;
        }
        pairVal = pairVal + k;
    }
    return numberOfPerfectSubstrings;
}
function checkIfPerfectString(str , k){
    var isPerfectString = true;
    var TempObj = {}
    str.split('').forEach(curr => {
        if(TempObj[curr]){
        TempObj[curr]++;
        }
        else{
            TempObj[curr] = 1;
        }
    });
    for(var key in TempObj){
        if(TempObj[key] !== k){
            isPerfectString = false;
        } 
    }
    return isPerfectString;
}

console.log(perfectSubstringCount("1221221121",3))