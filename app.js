var express = require('express');

var http = require('http');
var url = require('url');

var bodyParser = require('body-parser');
var expressPaginate = require('express-paginate');
var gridStream = require('gridfs-stream');
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var contactDataServiceV100 = require('./modules/contact-data-service-v1.0.0');
var contactDataServiceV200 = require('./modules/contact-data-service-v2.0.0');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(expressPaginate.middleware(10, 20));

mongoose.connect('mongodb://localhost/contacts');

var mongodb = mongoose.connection;

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
contactSchema.plugin(mongoosePaginate);

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

app.get('/contacts', function(request, response) {
  response.writeHead(302, {'Location' : '/v2/contacts/'});
  response.end('Version 2 is found at URI /v2/contacts/ ');
});

app.get('/v2/contacts', function (request, response) {
  var getParams = url.parse(request.url, true).query;

  if (Object.keys(getParams).length === 0) {
    contactDataServiceV200.paginate(Contact, request, response);
  } else {
    if (getParams['limit'] != null || getParams['page'] != null) {
      contactDataServiceV200.paginate(Contact, request, response);
    } else {
      var key = Object.keys(getParams)[0];
      var value = getParams[key];

      contactDataServiceV200.queryByArg(Contact, key, value, response);
    }
  }
});

app.get('/v2/contacts/:primaryContactNumber/image', function (request, response) {
  var gfs = gridStream(mongodb.db, mongoose.mongo);

  contactDataServiceV200.getImage(gfs, request.params.primaryContactNumber, response);
});

app.get('/contacts/:primaryContactNumber/image', function (request, response) {
  var gfs = gridStream(mongodb.db, mongoose.mongo);

  contactDataServiceV200.getImage(gfs, request.params.primaryContactNumber, response);
});

app.post('/v2/contacts/:primaryContactNumber/image', function (request, response) {
  var gfs = gridStream(mongodb.db, mongoose.mongo);

  contactDataServiceV200.updateImage(gfs, request, response);
});

app.post('/contacts/:primaryContactNumber/image', function (request, response) {
  var gfs = gridStream(mongodb.db, mongoose.mongo);

  contactDataServiceV200.updateImage(gfs, request, response);
});

app.put('/v2/contacts/:primaryContactNumber/image', function (request, response) {
  var gfs = gridStream(mongodb.db, mongoose.mongo);

  contactDataServiceV200.updateImage(gfs, request, response);
});

app.put('/contacts/:primaryContactNumber/image', function (request, response) {
  var gfs = gridStream(mongodb.db, mongoose.mongo);

  contactDataServiceV200.updateImage(gfs, request, response);
});

app.del('/v2/contacts/:primaryContactNumber/image', function (request, response) {
  var gfs = gridStream(mongodb.db, mongoose.mongo);

  contactDataServiceV200.deleteImage(gfs, mongodb.db, request.params.primaryContactNumber, response);
});

app.del('/contacts/:primaryContactNumber/image', function (request, response) {
  var gfs = gridStream(mongodb.db, mongoose.mongo);

  contactDataServiceV200.deleteImage(gfs, mongodb.db, request.params.primaryContactNumber, response);
});

http.createServer(app).listen(app.get('port'));
