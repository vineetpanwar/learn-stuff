//Find the max and the min in the rows and columns
var inpArr = [
              [1,2,3,4,5],
              [6,7,8,9,10],
              [11,12,13,14,15]
             ];
var outColumnMax = [];
var outRowMax = [] ;
var outColumnMin = [];
var outRowMin =  [];
for(var i = 0; i < inpArr.length ; i++){
  for(var j = 0; j < inpArr[i].length; j++){
      
      if(!outColumnMax[j]) outColumnMax[j] = inpArr[i][j];
      if(!outRowMax[i]) outRowMax[i] = inpArr[i][j];
      if(!outColumnMin[j]) outColumnMin[j] = inpArr[i][j];
      if(!outRowMin[i]) outRowMin[i] = inpArr[i][j];
      if(outColumnMax[j] !== undefined || outRowMax[i] !== undefined 
      || outColumnMin[j] !== undefined || outRowMin[i] !== undefined){
          //check for max in the column
          if(outColumnMax[j] < inpArr[i][j]) {
            outColumnMax[j] = inpArr[i][j];
          }
          //check for max in the row
          if(outRowMax[i] < inpArr[i][j]) {
            outRowMax[i] = inpArr[i][j]; 
          }
          //check for min in the column
          if(outColumnMin[j] > inpArr[i][j]) {
            outColumnMin[j] = inpArr[i][j];
          }
          //check for min in the row
          if(outRowMin[i] > inpArr[i][j]) {
            outRowMin[i] = inpArr[i][j]; 
          }
      }
        console.log(outColumnMax ,outRowMax,outColumnMin, outRowMin)
  }
}