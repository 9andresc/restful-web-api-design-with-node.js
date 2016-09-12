var express = require('express');

var http = require('http');
var path = require('path');
var url = require('url');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var contacts = require('./modules/contacts');

var app = express();

app.get('/contacts', function (request, response) {
  var getParams = url.parse(request.url, true).query;

  if (Object.keys(getParams).length === 0) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(contacts.list()));
  } else {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(contacts.queryByArg(getParams['arg'], getParams['value'])));
  }
});

app.get('/contacts/:number', function (request, response) {
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(contacts.query(request.params['number'])));
});

app.get('/groups', function (request, response) {
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(contacts.listGroups()));
});

app.get('/groups/:name', function (request, response) {
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(contacts.getMembers(request.params['name'])));
});

http.createServer(app).listen(3000, function () {
  console.log('Express server listening on port 3000');
});
