var express = require('express');

var http = require('http');
var path = require('path');
var url = require('url');

var bodyParser = require('body-parser');
var levelup = require('levelup');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

var db = levelup('./contact', {valueEncoding: 'json'});

app.get('/contacts/:number', function (request, response) {
  db.get(request.params.number, function (error, data) {
    if (error) {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.end('Not Found');
    } else {
      response.setHeader('content-type', 'application/json');
      response.send(data);
    }
  });
});

app.post('/contacts/:number', function (request, response) {
  db.put(request.params.number, request.body, function (error) {
    if (error) {
      response.writeHead(500, {'Content-Type' : 'text/plain'});
      response.end('Internal server error');
    } else {
      response.send(request.params.number + ' successfully inserted');
    }
  });
});

app.del('/contacts/:number', function (request, response) {
  db.del(request.params.number, function (error) {
    if (error) {
      response.writeHead(500, {'Content-Type' : 'text/plain'});
      response.end('Internal server error');
    } else {
      response.send(request.params.number + ' successfully deleted');
    }
  });
});

app.get('/contacts', function (request, response) {
  var isFirst = true;
  response.setHeader('content-type', 'application/json');

  db.createReadStream()
    .on('data', function (data) {
      if (isFirst == true) {
        response.write('[');
      } else {
        response.write(',');
      }

      response.write(JSON.stringify(data.value));
      isFirst = false;
    })
    .on('error', function (error) {
      console.log('Error while reading', error)
    })
    .on('close', function () {
      console.log('Closing dbstream');
    })
    .on('end', function () {
      console.log('Db stream closed');
      response.end(']');
    })
});

http.createServer(app).listen(app.get('port'));
