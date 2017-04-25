'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.originalProductToJSON = exports.embeddedProductToJSON = exports.embeddedShopToJSON = exports.embeddedUserToJSON = undefined;

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

var _lnglat = require('./lnglat');

var _lnglat2 = _interopRequireDefault(_lnglat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var embeddedUserToJSON = exports.embeddedUserToJSON = function embeddedUserToJSON(user) {
  if (!user) {
    return undefined;
  }

  var _user$toJSON = user.toJSON(),
      objectId = _user$toJSON.objectId,
      name = _user$toJSON.name,
      mobilePhoneNumber = _user$toJSON.mobilePhoneNumber,
      badges = _user$toJSON.badges,
      services = _user$toJSON.services;

  var avatar = (0, _file2.default)(user.get('avatar'));
  var roles = user.get('roles');
  return (0, _omitBy3.default)({ objectId: objectId, name: name, mobilePhoneNumber: mobilePhoneNumber, badges: badges, services: services, avatar: avatar, roles: roles }, _isUndefined3.default);
};

var embeddedShopToJSON = exports.embeddedShopToJSON = function embeddedShopToJSON(shop) {
  if (!shop) {
    return undefined;
  }

  var _shop$toJSON = shop.toJSON(),
      objectId = _shop$toJSON.objectId,
      areas = _shop$toJSON.areas,
      address = _shop$toJSON.address,
      name = _shop$toJSON.name;

  var thumbnail = (0, _file2.default)(shop.get('thumbnail'));
  var lnglat = (0, _lnglat2.default)(shop.get('lnglat'));
  var owner = embeddedUserToJSON(shop.get('owner'));

  return (0, _omitBy3.default)({ objectId: objectId, thumbnail: thumbnail, name: name, areas: areas, location: { address: address, lnglat: lnglat }, owner: owner }, _isUndefined3.default);
};

var embeddedProductToJSON = exports.embeddedProductToJSON = function embeddedProductToJSON(product) {
  if (!product) {
    return undefined;
  }

  var _product$toJSON = product.toJSON(),
      objectId = _product$toJSON.objectId,
      name = _product$toJSON.name;

  var thumbnail = (0, _file2.default)(product.get('thumbnail'));
  return (0, _omitBy3.default)({ objectId: objectId, name: name, thumbnail: thumbnail }, _isUndefined3.default);
};

var originalProductToJSON = exports.originalProductToJSON = function originalProductToJSON(product) {
  if (!product) {
    return undefined;
  }

  var _product$toJSON2 = product.toJSON(),
      objectId = _product$toJSON2.objectId;

  return (0, _omitBy3.default)({ objectId: objectId }, _isUndefined3.default);
};