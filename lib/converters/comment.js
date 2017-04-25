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

exports.default = function (comment) {
  if (!comment) {
    return null;
  }

  var _comment$toJSON = comment.toJSON(),
      objectId = _comment$toJSON.objectId,
      desc = _comment$toJSON.desc;

  var images = (0, _images2.default)(comment.get('images'));
  var owner = (0, _embedded.embeddedUserToJSON)(comment.get('owner'));
  var shopProduct = (0, _embedded.embeddedProductToJSON)(comment.get('shopProduct'));
  var supplyProduct = (0, _embedded.embeddedProductToJSON)(comment.get('supplyProduct'));
  var logisticsProduct = (0, _embedded.embeddedProductToJSON)(comment.get('logisticsProduct'));
  var createdAt = comment.get('createdAt').getTime();
  var updatedAt = comment.get('updatedAt').getTime();

  return (0, _omitBy3.default)({ objectId: objectId, owner: owner, desc: desc, images: images, shopProduct: shopProduct, supplyProduct: supplyProduct, logisticsProduct: logisticsProduct, createdAt: createdAt, updatedAt: updatedAt }, _isUndefined3.default);
};