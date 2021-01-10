function getFile(file,cb){
    var fakeResponses = {
      "file1" : "The first File",
      "file2" : "The Second File",
      "file3" : "The third File"
    }
    
    const randomNum = Math.floor(Math.random()* 10);
    setTimeout(() => {
      cb(fakeResponses[file]);
    },randomNum);
  }
  
  function output(text){
      console.log(text)
  }

  //this way the file output will not be in an order
//   getFile("file1",output);
//   getFile("file2",output);
//   getFile("file3",output);

getFile("file1",(text) => {
    output(text);
    getFile("file2",(text) => {
    output(text);
    getFile("file3",output);
    });
});