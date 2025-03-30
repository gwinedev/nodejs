const { readFile, writeFile } = require('fs').promises;
// const util = require('util');
// const readFilePromise = util.promisify(readFile)
// const writeFilePromise = util.promisify(writeFile)


// 

const start = async () => {
    try {
    const first = await readFile('./3-module/filesystem/first.txt', 'utf-8')
    const second = await readFile('./3-module/filesystem/second.txt', 'utf-8')

    await writeFile('./3-module/filesystem/result.txt', `This is awesome:\n${first}\n/${second}`,  {flag: 'a'})
    console.log(first, second);
    } catch (error) {
        console.log(error);
    }
}
start()

// getText('./3-module/filesystem/third.txt')
//     .then(result => console.log(result))
//     .catch((err => console.log(err)))
// 
// 
// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf-8', (err, data) => {
//             if(err){
//                 reject(err)
//             }
//             resolve(data)
//         })
//     })
// }