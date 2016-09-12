var express = require('express');

var http = require('http');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var contactDataService = require('./modules/contact-data-service');

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

app.get('/contacts/:number', function (request, response) {
  contactDataService.findByNumber(Contact, request.params.number, response);
});


app.post('/contacts', function (request, response) {
  contactDataService.update(Contact, request.body, response)
});

app.put('/contacts', function (request, response) {
  contactDataService.create(Contact, request.body, response)
});

app.del('/contacts/:primaryContactNumber', function (request, response) {
  console.log(contactDataService.remove(Contact, request.params.primaryContactNumber, response));
});

app.get('/contacts', function (request, response) {
  contactDataService.list(Contact, response);
});

http.createServer(app).listen(app.get('port'));
