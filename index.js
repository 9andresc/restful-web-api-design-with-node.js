var http = require('http');

var httpHandlers = require('./modules/http-handlers');

var port = 8180;

http.createServer(httpHandlers.handleRequest).listen(port, '127.0.0.1');
