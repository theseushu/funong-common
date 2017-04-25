'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _embedded = require('./embedded');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (order) {
  if (!order) {
    return null;
  }

  var _order$toJSON = order.toJSON(),
      objectId = _order$toJSON.objectId,
      amount = _order$toJSON.amount,
      address = _order$toJSON.address,
      fees = _order$toJSON.fees,
      type = _order$toJSON.type,
      status = _order$toJSON.status,
      items = _order$toJSON.items,
      message = _order$toJSON.message,
      services = _order$toJSON.services;

  var owner = (0, _embedded.embeddedUserToJSON)(order.get('owner'));
  var user = (0, _embedded.embeddedUserToJSON)(order.get('user'));
  var agent = (0, _embedded.embeddedShopToJSON)(order.get('agent'));
  var shop = (0, _embedded.embeddedShopToJSON)(order.get('shop'));

  var createdAt = order.get('createdAt').getTime();
  var updatedAt = order.get('updatedAt').getTime();

  return (0, _omitBy3.default)({
    objectId: objectId, amount: amount, address: address, fees: fees, type: type, status: status, items: items, message: message, services: services, owner: owner, user: user, agent: agent, shop: shop, createdAt: createdAt, updatedAt: updatedAt }, _isUndefined3.default);
};