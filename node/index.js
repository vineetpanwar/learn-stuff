//with just file system
var fs = require('fs');
var path = require('path');
var util = require('util')
var getStdin = require('get-stdin');

var args = require('minimist')(process.argv.slice(2), {
    boolean: ["help","in"],
    string : ["file"]
})

var BASE_PATH = path.resolve(
    process.env.BASE_PATH || __dirname
)

console.log('VINEET',BASE_PATH);

if(args.help) {
    printHelp()
} else if (args.in || args._.includes("-")) {
  getStdin().then(processFile).catch(error)
} 
else if(args.file) {
    fs.readFile(path.join(BASE_PATH,args.file), (err, contents) => {
        if (err) {
            error(err.toString() )
            return
        }
        processFile(contents.toString())
    });
} else {
    error("Incorrect Usage.",true)
}

function error(msg, includeHelp = false) {
    console.error(msg);
    if (includeHelp) {
        console.log("");
        printHelp();
    }
}


function printHelp() {
    console.log("ex1 usage:");
    console.log("ex1.js --file={FILENAME}");
    console.log("");
    console.log("--help               print this help");
    console.log("--file={FILENAME}    process the file");
    console.log("--in,-               process stdin");
    console.log("")
}

function processFile(contents) {
     
    contents = contents.toUpperCase();
    process.stdout.write(contents);
}

