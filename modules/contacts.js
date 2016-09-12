var fs = require('fs');

function readJsonFile() {
  var pathFile = './data/contacts.json';
  return fs.readFileSync(pathFile);
}

exports.list = function () {
  return JSON.parse(readJsonFile());
};

exports.query = function (number) {
  var jsonResult = JSON.parse(readJsonFile());
  var result = jsonResult.result;

  for (var i = 0; i < result.length; i++) {
    var contact = result[i];
    if (contact['primaryContactNumber'] === number) {
      return contact;
    }
  }

  return null;
};

exports.queryByArg = function (arg, value) {
  var jsonResult = JSON.parse(readJsonFile());
  var result = jsonResult.result;

  for (var i = 0; i < result.length; i++) {
    var contact = result[i];
    if (contact[arg] == value) {
      return contact;
    }
  }

  return null;
};

exports.listGroups = function () {
  var jsonResult = JSON.parse(readJsonFile());
  var result = jsonResult.result;
  var resultArray = [];

  for (var i = 0; i < result.length; i++) {
    var groups = result[i]['groups'];
    for (var j = 0; j < groups.length; j++) {
      if (resultArray.indexOf(groups[j]) === -1) {
        resultArray.push(groups[j]);
      }
    }
  }

  return resultArray;
};

exports.getMembers = function (groupName) {
  var jsonResult = JSON.parse(readJsonFile());
  var result = jsonResult.result;
  var resultArray = [];

  for (var i = 0; i < result.length; i++) {
    if (result[i]['groups'].indexOf(groupName) > -1) {
      resultArray.push(result[i]);
    }
  }

  return resultArray;
};
