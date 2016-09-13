var express = require('express');

var http = require('http');
var url = require('url');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var contactDataServiceV100 = require('./modules/contact-data-service-v1.0.0');
var contactDataServiceV200 = require('./modules/contact-data-service-v2.0.0');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/contacts');

var contactSchema = new mongoose.Schema({
  primaryContactNumber: {type: String, index: {unique: true}},
  firstName: String,
  lastName: String,
  title: String,
  company: String,
  jobTitle: String,
  otherContactNumbers: [String],
  primaryEmailAddress: String,
  emailAddresses: [String],
  groups: [String]
});

var Contact = mongoose.model('Contact', contactSchema);

app.get('/v1/contacts/:number', function (request, response) {
  contactDataServiceV100.findByNumber(Contact, request.params.number, response);
});


app.post('/v1/contacts', function (request, response) {
  contactDataServiceV100.update(Contact, request.body, response)
});

app.put('/v1/contacts', function (request, response) {
  contactDataServiceV100.create(Contact, request.body, response)
});

app.del('/v1/contacts/:primaryContactNumber', function (request, response) {
  console.log(contactDataServiceV100.remove(Contact, request.params.primaryContactNumber, response));
});

app.get('/v1/contacts', function (request, response) {
  contactDataServiceV100.list(Contact, response);
});

app.get('/contacts', function (request, response) {
  var getParams = url.parse(request.url, true).query;

  if (Object.keys(getParams).length === 0) {
    contactDataServiceV200.list(Contact, response);
  } else {
    var key = Object.keys(getParams)[0];
    var value = getParams[key];

    JSON.stringify(contactDataServiceV200.queryByArg(Contact, key, value, response));
  }
});

http.createServer(app).listen(app.get('port'));
