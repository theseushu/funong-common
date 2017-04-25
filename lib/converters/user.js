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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (user) {
  if (!user) {
    return null;
  }

  var _user$toJSON = user.toJSON(),
      objectId = _user$toJSON.objectId,
      type = _user$toJSON.type,
      name = _user$toJSON.name,
      mobilePhoneNumber = _user$toJSON.mobilePhoneNumber,
      desc = _user$toJSON.desc,
      badges = _user$toJSON.badges,
      addresses = _user$toJSON.addresses,
      services = _user$toJSON.services,
      roles = _user$toJSON.roles;

  var avatar = (0, _file2.default)(user.get('avatar'));
  var images = (0, _images2.default)(user.get('images'));
  var avCreatedAt = user.get('createdAt');
  var avUpdatedAt = user.get('updatedAt');
  var createdAt = avCreatedAt ? avCreatedAt.getTime() : undefined;
  var updatedAt = avUpdatedAt ? avUpdatedAt.getTime() : undefined;
  return (0, _omitBy3.default)({ objectId: objectId, type: type, name: name, mobilePhoneNumber: mobilePhoneNumber, desc: desc, avatar: avatar, images: images, roles: roles, addresses: addresses, badges: badges, services: services, createdAt: createdAt, updatedAt: updatedAt }, _isUndefined3.default);
};