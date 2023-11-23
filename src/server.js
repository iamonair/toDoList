const http = require('http');
const server = http.createServer((request, response) => {
    console.log('Got request');
});

server.listen(3345, '127.0.0.1', () => {
    console.log('Server started');
});
