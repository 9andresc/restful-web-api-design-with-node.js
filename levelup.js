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
db.put('+359777123456', {
  "firstName": "Joe",
  "lastName": "Smith",
  "title": "Mr.",
  "company": "Dev Inc.",
  "jobTitle": "Developer",
  "primaryContactNumber": "+359777123456",
  "otherContactNumbers": [
    "+359777456789",
    "+359777112233"
  ],
  "primaryEmailAddress": "joe.smith@xyz.com",
  "emailAddresses": ["j.smith@xyz.com"],
  "groups": [
    "Dev",
    "Family"
  ]
});

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

http.createServer(app).listen(app.get('port'));
