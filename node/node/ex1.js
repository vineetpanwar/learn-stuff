const fs  = require("fs")
console.log(fs.readFileSync("./lkandljwand",{encoding:"utf-8"}));

fs.writeFileSync("./lkandljwand", 'var me = "me"')
