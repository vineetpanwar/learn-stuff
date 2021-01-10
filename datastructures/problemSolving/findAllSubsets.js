var inputArr = [3,3,9,9,5];

let createSubsets = (inputArr,subset,i) => {
    if( i >= inputArr.length){
        return ;
    }
        const temp = [...subset];
        temp.forEach(curr => {
            const ele = [...curr]
            if(Array.isArray(curr)) ele.push(inputArr[i]);
            subset.push(ele)
        });
        createSubsets(inputArr,subset,++i);
        return subset
}

const findAllSubsets = (inputArr) => {
    const subset = [[]];
    var subsets = createSubsets(inputArr, subset, 0);
    console.log(subsets)
}

findAllSubsets(inputArr);