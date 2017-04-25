'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _lnglat = require('./lnglat');

var _lnglat2 = _interopRequireDefault(_lnglat);

var _embedded = require('./embedded');

var _category = require('./category');

var _category2 = _interopRequireDefault(_category);

var _species = require('./species');

var _species2 = _interopRequireDefault(_species);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (inquiry) {
  if (!inquiry) {
    return null;
  }

  var _inquiry$toJSON = inquiry.toJSON(),
      objectId = _inquiry$toJSON.objectId,
      address = _inquiry$toJSON.address,
      price = _inquiry$toJSON.price,
      quantity = _inquiry$toJSON.quantity,
      name = _inquiry$toJSON.name,
      range = _inquiry$toJSON.range,
      desc = _inquiry$toJSON.desc,
      status = _inquiry$toJSON.status;

  var lnglat = (0, _lnglat2.default)(inquiry.get('lnglat'));
  var owner = (0, _embedded.embeddedUserToJSON)(inquiry.get('owner'));
  var endAt = inquiry.get('endAt').getTime();
  var createdAt = inquiry.get('createdAt').getTime();
  var updatedAt = inquiry.get('updatedAt').getTime();
  var category = (0, _category2.default)(inquiry.get('category'));
  var species = (0, _species2.default)(inquiry.get('species'));

  return (0, _omitBy3.default)({ objectId: objectId, category: category, species: species, owner: owner, location: { address: address, lnglat: lnglat }, price: price, quantity: quantity, name: name, range: range, desc: desc, endAt: endAt, createdAt: createdAt, updatedAt: updatedAt, status: status }, _isUndefined3.default);
};