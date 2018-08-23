const path = require('path');
const os = require('os');
const fs = require('fs');

const Logger = require('./logger');
const logger = new Logger();


logger.log('message');
var pathObject = path.parse(__filename);
console.log(pathObject);

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

//Template string
// ES6 / ES2015: ECMAScript 6

console.log(`Total memory: ${totalMemory}`);
console.log(`Free memory: ${freeMemory}`);

const files = fs.readdirSync('./');
fs.readdir('./', function(err, result) {
    if(err) console.log('Error', err);
    else console.log('Result', result);
});
console.log(files);


logger.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
})

logger.log('message');