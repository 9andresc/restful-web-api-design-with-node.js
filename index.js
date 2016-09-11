var http = require('http');
var port = 8180;

function handleRequest(request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.end('Hello World. Are you restless to go restful?\n');
  console.log('index.js was requested');
}

http.createServer(handleRequest).listen(port, '127.0.0.1');
console.log('Started Node.js HTTP server at http://127.0.0.1:' + port);