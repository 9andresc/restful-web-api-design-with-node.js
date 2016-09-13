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

exports.queryByArg = function (model, key, value, response) {
  var filterArg = '{"' + key + '": ' + '"' + value + '"}';
  var filter = JSON.parse(filterArg);

  model.find(filter, function (error, result) {
    if (error) {
      console.error(error);
      response.writeHead(500, {'Content-TYpe': 'text/plain'});
      response.end('Internal server error');
    } else {
      if (!result) {
        if (response != null) {
          response.writeHead(404, {'Content-Type': 'text/plain'});
          response.end('Contact not found');
        }
      }

      if (response != null) {
        response.setHeader('Content-Type', 'application/json');
        response.send(result);
      }
    }
  });
};

exports.updateImage = function (gfs, request, response) {
  var primaryContactNumber = request.params.primaryContactNumber;

  request.pipe(gfs.createWriteStream({
    _id: primaryContactNumber,
    filename: 'image',
    mode: 'w'
  }));
  response.send('Successfully uploaded image for primary contact number: ' + primaryContactNumber);
};

exports.getImage = function (gfs, primaryContactNumber, response) {
  var imageStream = gfs.createReadStream({
    _id: primaryContactNumber,
    filename: 'image',
    mode: 'r'
  });

  imageStream.on('error', function (error) {
    console.error(error);
    response.send('404', 'Contact image not Found');
  });

  response.setHeader('Content-Type', 'image/jpeg');
  imageStream.pipe(response);
};

exports.deleteImage = function (gfs, mongodb, primaryContactNumber, response) {
  var collection = mongodb.collection('fs.files');

  collection.remove({_id: primaryContactNumber, filename: 'image'}, function (error, contact) {
    if (error) {
      console.error(error);
    }

    if (contact === null) {
      response.send('404', 'Contact image not found');
    }
  });

  response.send('Successfully deleted image for primary contact number: ' + primaryContactNumber);
};
