'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

var _images = require('./images');

var _images2 = _interopRequireDefault(_images);

var _lnglat = require('./lnglat');

var _lnglat2 = _interopRequireDefault(_lnglat);

var _embedded = require('./embedded');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (shop) {
  if (!shop) {
    return null;
  }

  var _shop$toJSON = shop.toJSON(),
      objectId = _shop$toJSON.objectId,
      address = _shop$toJSON.address,
      desc = _shop$toJSON.desc,
      name = _shop$toJSON.name,
      areas = _shop$toJSON.areas;

  var thumbnail = (0, _file2.default)(shop.get('thumbnail'));
  var lnglat = (0, _lnglat2.default)(shop.get('lnglat'));
  var images = (0, _images2.default)(shop.get('images'));
  var owner = (0, _embedded.embeddedUserToJSON)(shop.get('owner'));
  var createdAt = shop.get('createdAt').getTime();
  var updatedAt = shop.get('updatedAt').getTime();

  return (0, _omitBy3.default)({ objectId: objectId, thumbnail: thumbnail, desc: desc, name: name, areas: areas, location: { address: address, lnglat: lnglat }, images: images, owner: owner, updatedAt: updatedAt, createdAt: createdAt }, _isUndefined3.default);
};