//using streams + notifier
var fs = require('fs');
var path = require('path');
var {Transform} = require('stream');
var zlip = require('zlib');
const { resolve } = require('path');

var args = require('minimist')(process.argv.slice(2), {
    boolean: ["help","in","out","compress","decompress"],
    string : ["file"]
})

var BASE_PATH = path.resolve(
    process.env.BASE_PATH || __dirname
)

var OUTFILE = path.join(
    process.env.BASE_PATH,"out.txt"
)

var isStreamingDone = (stream) => {
    return new Promise((resolve,reject) => {
        stream.on("end",() => {
            resolve();
        })
    })
}

console.log('VINEET',BASE_PATH);

if(args.help) {
    printHelp()
} else if (args.in || args._.includes("-")) {
  processFile(process.stdin)
  .then(() => {
      console.log('completed')
  })
  .catch(error)
} 
else if(args.file) {
    try {
        var streamRead = fs.createReadStream(path.join(BASE_PATH,args.file));
        processFile(streamRead)
        .then(() => {
            console.log(`......`+"completed")
        })
        .catch(error)
    } catch(err) {
        error(err.toString())
    }
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
    console.log("ex3 usage:");
    console.log("ex3.js --file={FILENAME}");
    console.log("");
    console.log("--help               print this help");
    console.log("--file={FILENAME}    process the file");
    console.log("--in,-               process stdin");
    console.log("--out                print to stdout stream");
    console.log("--compress           gzip compress the file output");
    console.log("--decompress         decompress a gzipped file input")
    console.log("")
}

async function processFile(stream) {
    var outStream;

    if(args.decompress) {
        var gunzipStream = zlip.createGunzip();
        stream = stream.pipe(gunzipStream);
    }

    var inpStream = new Transform({
        transform(chunk,enc,cb) {
            console.log("vineet processing chunk",chunk);
            this.push(chunk.toString().toUpperCase());
            cb();
        }
    })

    if(args.compress) {
        OUTFILE = `${OUTFILE}.zip`
        var gzipStream = zlip.createGzip();
        inpStream = inpStream.pipe(gzipStream);
    }
 
    if(args.out) {
        outStream = process.stdout
    } else {
        outStream = fs.createWriteStream(OUTFILE);
    }
    stream.pipe(inpStream).pipe(outStream)
    return await isStreamingDone(stream);
}

