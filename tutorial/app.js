const { log } = require('console');
const { subscribe } = require('diagnostics_channel');
const EventEmitter = require('events'); //EventEmitter is a class

// let's instantiate it i.e. make an object of the class
const customEmitter = new EventEmitter()

// subscribe to the response event
customEmitter.on('response', (name, id) => {
    console.log(`data emitted from ${name} with id ${id}`);
})

customEmitter.on('response', () => {
    console.log(`data received`);
})
// to emit it by mimicking the browser since we don't have one
customEmitter.emit('response', 'Luke', 32)