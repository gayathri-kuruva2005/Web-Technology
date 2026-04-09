const http = require('http');

const PORT = 3000;

const server = http.createServer((request, response) => {

    console.log("Request received");

    response.setHeader('Content-Type', 'text/html');

    response.write("<h1>Welcome to Node.js Server</h1>");
    response.write("<p>Server is working successfully.</p>");

    response.end();
});

server.listen(PORT, () => {
    console.log("Server is running at http://localhost:3000");
});