'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _appConstants = require('../../appConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var type = _ref.type,
      items = _ref.items;

  switch (type) {
    case _appConstants.productTypes.logistics:
      return -1;
    default:
      return (0, _reduce3.default)(items, function (sum, _ref2) {
        var quantity = _ref2.quantity,
            spec = _ref2.product.spec;
        return sum + quantity * spec.price;
      }, 0);
  }
};