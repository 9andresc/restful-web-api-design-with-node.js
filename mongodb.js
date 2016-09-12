var mongoose = require('mongoose');

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

var johnDouglas = new Contact({
  firstName: "John",
  lastName: "Douglas",
  title: "Mr.",
  company: "Dev Inc.",
  jobTitle: "Developer",
  primaryContactNumber: "+359777223345",
  otherContactNumbers: [],
  primaryEmailAddress: "john.douglas@xyz.com",
  emailAddresses: ["j.douglas@xyz.com"],
  groups: ["Dev"]
});

var db = mongoose.connection;
mongoose.connect('mongodb://localhost/contacts');

johnDouglas.save(function (error) {
  if (error) {
    console.log('Error while saving contact for Mr. John Douglas');
    console.log(error);
  } else {
    johnDouglas.save();
    console.log('Contact for Mr. John Douglas has been successfully stored');
  }
});

Contact.find({groups: 'Dev', title: 'Mr.'}, function (error, result) {
  if (error) {
    console.error(error);
  } else {
    console.dir(result);
  }
});

Contact.findOne({primaryContactNumber: '+359777223345'}, function (error, data) {
  if (error) {
    console.error(error);
  } else {
    if (data) {
      data.remove(function (error) {
        if (error) {
          console.error(error);
        } else {
          data.remove();
        }
      });
    } else {
      console.error('Contact not found');
    }
  }
});
