function resurrectedArray(input , query){
    var rowLength = input[0];
    var answers = [];
    query.forEach(curr => {
        answers.push(input[rowLength*(curr[0]-1) + curr[1]]);
    });
    return answers;
};

console.log(resurrectedArray([5,1,2,3,4,5,6,7,8,9,10],[[1,1],[1,2],[2,1],[2,2]]));
console.log(resurrectedArray([13,4,1,2,3,4,5,6,7,8,9,10,11,12],[[3,2],[2,1]]));
