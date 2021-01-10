var a = [[3,2,1],[2,3,1],[3,1,2]];
var minMaxRows = [];
var minMaxCols = [];
a.forEach( (curr , index) => {
    curr.forEach((curr1,index1) => {
        if(!minMaxRows[index]) minMaxRows[index] = [...[curr1],...[curr1]]
        else{
            if(minMaxRows[index][0] > curr1 ) minMaxRows[index][0]  = curr1 ;
            if(minMaxRows[index][1] < curr1 ) minMaxRows[index][1] = curr1 ;    
         }
        if(!minMaxCols[index1]) minMaxCols[index1] = [...[curr1],...[curr1]]
        else{
            if(minMaxCols[index1][0] > curr1 ) minMaxCols[index1][0]  = curr1 ;
            if(minMaxCols[index1][1] < curr1 ) minMaxCols[index1][1] = curr1 ; 
        }
    })
});
console.log(minMaxRows , minMaxCols)