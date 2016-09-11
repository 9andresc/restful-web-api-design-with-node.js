var sinon = require('sinon');

exports.testHandleGetRequest = function (test) {
  var response = {
    'writeHead': function () {},
    'end': function () {}
  };
  var responseMock = sinon.mock(response);
  responseMock.expects('end').once().withArgs('GET action was requested');
  responseMock.expects('writeHead').once().withArgs(200, {'Content-Type': 'text/plain'});

  var request = {};
  var requestMock = sinon.mock(request);
  requestMock.method = 'GET';

  var httpHandlers = require('../modules/http-handlers');
  httpHandlers.handleRequest(requestMock, response);

  responseMock.verify();
  test.done();
};

exports.testHandlePostRequest = function (test) {
  var response = {
    'writeHead': function () {},
    'end': function () {}
  };
  var responseMock = sinon.mock(response);
  responseMock.expects('end').once().withArgs('POST action was requested');
  responseMock.expects('writeHead').once().withArgs(200, {'Content-Type': 'text/plain'});

  var request = {};
  var requestMock = sinon.mock(request);
  requestMock.method = 'POST';

  var httpHandlers = require('../modules/http-handlers');
  httpHandlers.handleRequest(requestMock, response);

  responseMock.verify();
  test.done();
};

exports.testHandlePutRequest = function (test) {
  var response = {
    'writeHead': function () {},
    'end': function () {}
  };
  var responseMock = sinon.mock(response);
  responseMock.expects('end').once().withArgs('PUT action was requested');
  responseMock.expects('writeHead').once().withArgs(200, {'Content-Type': 'text/plain'});

  var request = {};
  var requestMock = sinon.mock(request);
  requestMock.method = 'PUT';

  var httpHandlers = require('../modules/http-handlers');
  httpHandlers.handleRequest(requestMock, response);

  responseMock.verify();
  test.done();
};

exports.testHandleDeleteRequest = function (test) {
  var response = {
    'writeHead': function () {},
    'end': function () {}
  };
  var responseMock = sinon.mock(response);
  responseMock.expects('end').once().withArgs('DELETE action was requested');
  responseMock.expects('writeHead').once().withArgs(200, {'Content-Type': 'text/plain'});

  var request = {};
  var requestMock = sinon.mock(request);
  requestMock.method = 'DELETE';

  var httpHandlers = require('../modules/http-handlers');
  httpHandlers.handleRequest(requestMock, response);

  responseMock.verify();
  test.done();
};

exports.testHandleHeadRequest = function (test) {
  var response = {
    'writeHead': function () {},
    'end': function () {}
  };
  var responseMock = sinon.mock(response);
  responseMock.expects('end').once().withArgs('HEAD action was requested');
  responseMock.expects('writeHead').once().withArgs(200, {'Content-Type': 'text/plain'});

  var request = {};
  var requestMock = sinon.mock(request);
  requestMock.method = 'HEAD';

  var httpHandlers = require('../modules/http-handlers');
  httpHandlers.handleRequest(requestMock, response);

  responseMock.verify();
  test.done();
};
