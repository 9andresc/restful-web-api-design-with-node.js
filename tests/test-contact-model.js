var mongoose = require('mongoose');
var should = require('should');

var prepare = require('./prepare');

mongoose.connect('mongodb://localhost/contacts-test');

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

describe('Contact: models', function () {
  describe('#create()', function () {
    it('Should create a new Contact', function (done) {
      var contactModel = {
        "firstName": "John",
        "lastName": "Douglas",
        "title": "Mr.",
        "company": "Dev Inc.",
        "jobTitle": "Developer",
        "primaryContactNumber": "+359777223345",
        "primaryEmailAddress": "john.douglas@xyz.com",
        "groups": ["Dev"],
        "emailAddresses": ["j.douglas@xyz.com"],
        "otherContactNumbers": ['+359777223346', '+359777223347']
      };

      Contact.create(contactModel, function (error, createdModel) {
        should.not.exist(error);

        createdModel.firstName.should.equal('John');
        createdModel.lastName.should.equal('Douglas');
        createdModel.title.should.equal('Mr.');
        createdModel.jobTitle.should.equal('Developer');
        createdModel.primaryContactNumber.should.equal('+359777223345');
        createdModel.primaryEmailAddress.should.equal('john.douglas@xyz.com');
        createdModel.groups[0].should.equal('Dev');
        createdModel.emailAddresses[0].should.equal('j.douglas@xyz.com');
        createdModel.otherContactNumbers[0].should.equal('+359777223346');
        createdModel.otherContactNumbers[1].should.equal('+359777223347');

        done();
      });
    });
  });
});
