console.log('loaded script');

const  API_URL = "https://swapi.co/api/starships1/";
const  outputList = document.getElementById("starships");
const spinner = document.getElementsByClassName("fa fa-circle-o-notch fa-spin")[0];
fetch(API_URL)
    .then(response => {
        console.log("response",response);
        //in case of the bad result by the api for eg empty array  
        // if(!response.ok) throw Error("unsuccessful response from the API");
        if(!response.ok) return Promise.reject(new Error("Unsucessful response"))
        //good result from the API 
        return response.json().then(res => {
        console.log(res);
        outputList.innerText = getStarWars(res)
    });
}).catch( err => {
    console.warn(":("+err);
    outputList.innerText = ":("+err
}).finally(() => {
    spinner.remove();
});

const getStarWars = (list) => {
    return list.results.map((curr,index) => `${index} - ${curr.name}`).join("\n");
}

