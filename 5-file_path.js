const path = require('path');

console.log(path.sep);

const filePath = path.join('/3-module', 'function.js')
console.log(filePath);

const base = path.basename(filePath)
console.log(base);

const absolute = path.resolve(__dirname, '3-module', 'function.js');
console.log(absolute);
