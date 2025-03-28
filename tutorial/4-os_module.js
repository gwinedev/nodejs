const os = require('os')

// info on current user
const user = os.userInfo()

console.log(user);

// method returns the system uptime ins seconds

console.log(`The system uptime is ${os.uptime()} seconds`);

const currentOsS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem()
}

console.log(currentOsS);

