'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _embedded = require('./embedded');

var _inquiry = require('./inquiry');

var _inquiry2 = _interopRequireDefault(_inquiry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (bid) {
  if (!bid) {
    return null;
  }

  var _bid$toJSON = bid.toJSON(),
      objectId = _bid$toJSON.objectId,
      price = _bid$toJSON.price,
      quantity = _bid$toJSON.quantity,
      message = _bid$toJSON.message;

  var owner = (0, _embedded.embeddedUserToJSON)(bid.get('owner'));
  var createdAt = bid.get('createdAt').getTime();
  var updatedAt = bid.get('updatedAt').getTime();
  var product = (0, _embedded.embeddedProductToJSON)(bid.get('product'));
  var inquiry = (0, _inquiry2.default)(bid.get('inquiry'));

  return (0, _omitBy3.default)({ objectId: objectId, owner: owner, price: price, quantity: quantity, message: message, createdAt: createdAt, updatedAt: updatedAt, inquiry: inquiry, product: product }, _isUndefined3.default);
};