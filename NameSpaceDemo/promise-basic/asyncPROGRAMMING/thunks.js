//thunk is a wrapper function around certain state which can accept callback 

function fakeAjax(file, cb){
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
function getFileThunk(file){
    var resp,fn;
    fakeAjax(file,function(res){
        if(fn) fn(res)
        else resp = res
    })
    return function(cb){
        if(resp) cb(resp)
        else fn = cb
    }
  }
  
  function output(text){
      console.log(text)
  }

var getFile1 = getFileThunk("file1");
var getFile2 = getFileThunk("file2");
var getFile3 = getFileThunk("file3");
getFile1((text) => {
    output(text);
    getFile2((text) => {
        output(text); 
        getFile3(output)
    })
});
