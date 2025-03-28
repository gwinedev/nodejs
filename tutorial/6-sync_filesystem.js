// reading synchronously
const { readFileSync, writeFileSync } = require('fs')

console.log("Start");

const first = readFileSync('./3-module/filesystem/first.txt', 'utf-8');
const second = readFileSync('./3-module/filesystem/second.txt', 'utf-8');

// console.log(first);
// console.log(second);

writeFileSync('./3-module/filesystem/third.txt',
    `Here is the third text file:\n${first}\n${second}`,
    { flag: 'a'}
);

console.log("Done with the task");
console.log("Starting the next task");
