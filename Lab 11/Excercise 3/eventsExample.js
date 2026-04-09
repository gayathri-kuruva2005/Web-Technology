// Import events module
const EventEmitter = require('events');

// Create event emitter object
const eventEmitter = new EventEmitter();

console.log("Program started");

// Listener 1 for custom event
eventEmitter.on('greet', (name) => {
    console.log("Hello " + name);
});

// Listener 2 for the same event
eventEmitter.on('greet', (name) => {
    console.log("Welcome to Node.js, " + name);
});

// Another custom event listener
eventEmitter.on('bye', () => {
    console.log("Goodbye! Event execution completed.");
});

// Trigger greet event with data
eventEmitter.emit('greet', 'Gayathri');

// Trigger bye event
eventEmitter.emit('bye');