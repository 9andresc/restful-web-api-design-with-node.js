var math = require('../modules/math');

exports.testAdd = function (test) {
  test.equal(math.add(1, 1), 2);
  test.done();
};

exports.testSubtract = function (test) {
  test.equal(math.subtract(4, 2), 2);
  test.done();
};
