function handleGetRequest(response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.end('GET action was requested');
}

function handlePostRequest(response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.end('POST action was requested');
}

function handlePutRequest(response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.end('PUT action was requested');
}

function handleHeadRequest(response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.end('HEAD action was requested');
}

function handleDeleteRequest(response) {
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

exports.handleRequest = function (request, response) {
  switch (request.method) {
    case 'GET':
      handleGetRequest(response);
      break;
    case 'POST':
      handlePostRequest(response);
      break;
    case 'PUT':
      handlePutRequest(response);
      break;
    case 'DELETE':
      handleDeleteRequest(response);
      break;
    case 'HEAD':
      handleHeadRequest(response);
      break;
    default:
      handleBadRequest(response);
      break;
  }
  console.log('Request processing ended');
};