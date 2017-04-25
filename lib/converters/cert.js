'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _images = require('./images');

var _images2 = _interopRequireDefault(_images);

var _embedded = require('./embedded');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (cert) {
  if (!cert) {
    return null;
  }

  var _cert$toJSON = cert.toJSON(),
      objectId = _cert$toJSON.objectId,
      type = _cert$toJSON.type,
      fields = _cert$toJSON.fields,
      status = _cert$toJSON.status;

  var images = (0, _images2.default)(cert.get('images'));
  var owner = cert.get('owner');
  var createdAt = cert.get('createdAt').getTime();
  var updatedAt = cert.get('updatedAt').getTime();
  return (0, _omitBy3.default)({ objectId: objectId, type: type, status: status, images: images, fields: fields, owner: (0, _embedded.embeddedUserToJSON)(owner), createdAt: createdAt, updatedAt: updatedAt }, _isUndefined3.default);
};