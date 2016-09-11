var http = require('http');
var port = 8180;

function handleGETRequest(response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.end('GET action was requested');
}

function handlePOSTRequest(response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.end('POST action was requested');
}

function handlePUTRequest(response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.end('PUT action was requested');
}

function handleHEADRequest(response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.end('HEAD action was requested');
}

function handleDELETERequest(response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.end('DELETE action was requested');
}

function handleBadRequest(response) {
  response.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  response.end('Bad request');
}

function handleRequest(request, response) {
  switch (request.method) {
    case 'GET':
      handleGETRequest(response);
      break;
    case 'POST':
      handlePOSTRequest(response);
      break;
    case 'PUT':
      handlePUTRequest(response);
      break;
    case 'DELETE':
      handleDELETERequest(response);
      break;
    case 'HEAD':
      handleHEADRequest(response);
      break;
    default:
      handleBadRequest(response);
      break;
  }
  console.log('Request processing ended');
}

http.createServer(handleRequest).listen(port, '127.0.0.1');
console.log('Started Node.js HTTP server at http://127.0.0.1:' + port);
