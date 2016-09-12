function toContact(body, Contact) {
  return new Contact({
    firstName: body.firstName,
    lastName: body.lastName,
    title: body.title,
    company: body.company,
    jobTitle: body.jobTitle,
    primaryContactNumber: body.primaryContactNumber,
    primaryEmailAddress: body.primaryEmailAddress,
    emailAddresses: body.emailAddresses,
    groups: body.groups,
    otherContactNumbers: body.otherContactNumbers
  });
}

exports.remove = function (model, primaryContactNumber, response) {
  model.findOne({primaryContactNumber: primaryContactNumber}, function (error, data) {
    if (error) {
      console.error(error);

      if (response != null) {
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.end('Internal server error');
      }
    } else {
      if (data) {
        data.remove(function (error) {
          if (error) {
            console.error(error);
          } else {
            data.remove();
          }
        });

        if (response != null) {
          response.send('Deleted');
        }
      } else {
        console.log('Contact not found');

        if (response != null) {
          response.writeHead(404, {'Content-Type': 'text/plain'});
          response.end('Contact not found');
        }
      }
    }
  });
};

exports.update = function (model, requestBody, response) {
  var primaryNumber = requestBody.primaryContactNumber;

  model.findOne({primaryContactNumber: primaryNumber}, function (error, data) {
    if (error) {
      console.error(error);

      if (response != null) {
        response.writeHead(500, {'Content-Type' : 'text/plain'});
        response.end('Internal server error');
      }
    } else {
      var contact = toContact(requestBody, model);

      if (!data) {
        console.log('Contact with primary number: ' + primaryNumber + ' does not exist. The contact will be created.');
        contact.save(function (error) {
          if (!error)
            contact.save();
        });
        if (response != null) {
          response.writeHead(201, {'Content-Type' : 'text/plain'});
          response.end('Contact created');
        }
      } else {
        data.firstName = contact.firstName;
        data.lastName = contact.lastName;
        data.title = contact.title;
        data.company = contact.company;
        data.jobTitle = contact.jobTitle;
        data.primaryContactNumber = contact.primaryContactNumber;
        data.otherContactNumbers = contact.otherContactNumbers;
        data.emailAddresses = contact.emailAddresses;
        data.primaryEmailAddress = contact.primaryEmailAddress;
        data.groups = contact.groups;

        data.save(function (error) {
          if (!error) {
            data.save();
          } else {
            console.log('Error on save the contact');
          }
        });

        if (response != null) {
          response.send('Contact updated');
        }
      }
    }
  });
};

exports.create = function (model, requestBody, response) {
  var contact = toContact(requestBody, model);
  var primaryNumber = requestBody.primaryContactNumber;
  
  contact.save(function (error) {
    if (!error) {
      contact.save();
    } else {
      model.findOne({primaryContactNumber: primaryNumber}, function (error, data) {
        if (error) {
          console.log(error);
          
          if (response != null) {
            response.writeHead(500, {'Content-Type' : 'text/plain'});
            response.end('Internal server error');
          }
        } else {
          var contact = toContact(requestBody, model);
          
          if (!data) {
            console.log('The contact does not exist. It will be created');
            contact.save(function (error) {
              if (!error) {
                contact.save();
              } else {
                console.error(error);
              }
            });
            
            if (response != null) {
              response.writeHead(201, {'Content-Type' : 'text/plain'});
              response.end('Contact created');
            }
          } else {
            data.firstName = contact.firstName;
            data.lastName = contact.lastName;
            data.title = contact.title;
            data.company = contact.company;
            data.jobTitle = contact.jobTitle;
            data.primaryContactNumber = contact.primaryContactNumber;
            data.otherContactNumbers = contact.otherContactNumbers;
            data.emailAddresses = contact.emailAddresses;
            data.primaryEmailAddress = contact.primaryEmailAddress;
            data.groups = contact.groups;

            data.save(function (error) {
              if (!error) {
                data.save();
                response.end('Contact Updated');
              } else {
                console.log('Error while saving contact with primary contact number:' + primaryNumber);
                console.error(error);
              }
            });
          }
        }
      });
    }
  });
};

exports.findByNumber = function (model, primaryContactNumber, response) {
  model.findOne({primaryContactNumber: primaryContactNumber}, function (error, result) {
    if (error) {
      console.error(error);
      response.writeHead(500, {'Content-Type' : 'text/plain'});
      response.end('Internal server error');
    } else {
      if (!result) {
        if (response != null) {
          response.writeHead(404, {'Content-Type' : 'text/plain'});
          response.end('Contact not Found');
        }
      }

      if (response != null) {
        response.setHeader('Content-Type', 'application/json');
        response.send(result);
      }
    }
  });
};

exports.list = function (model, response) {
  model.find({}, function (error, result) {
    if (error) {
      console.error(error);
      return null;
    }

    if (response != null) {
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify(result));
    }

    return JSON.stringify(result);
  });
};
