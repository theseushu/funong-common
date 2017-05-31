'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attributes = undefined;

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

var _images = require('./images');

var _images2 = _interopRequireDefault(_images);

var _lnglat = require('./lnglat');

var _lnglat2 = _interopRequireDefault(_lnglat);

var _category = require('./category');

var _category2 = _interopRequireDefault(_category);

var _species = require('./species');

var _species2 = _interopRequireDefault(_species);

var _embedded = require('./embedded');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createConverter = function createConverter(attrName, converter) {
  return function (product) {
    var value = product.get(attrName);
    return converter ? converter(value) : value;
  };
};

var addressConverter = createConverter('address');
var lnglatConverter = createConverter('lnglat', _lnglat2.default);

var attributes = exports.attributes = {
  objectId: createConverter('objectId'),
  startAt: createConverter('startAt', function (date) {
    return date && date.getTime();
  }),
  endAt: createConverter('endAt', function (date) {
    return date && date.getTime();
  }),
  createdAt: createConverter('createdAt', function (date) {
    return date.getTime();
  }),
  updatedAt: createConverter('updatedAt', function (date) {
    return date.getTime();
  }),
  status: createConverter('status'),
  images: createConverter('images', _images2.default),
  thumbnail: createConverter('thumbnail', _file2.default),
  category: createConverter('category', _category2.default),
  species: createConverter('species', _species2.default),
  name: createConverter('name'),
  specs: createConverter('specs'),
  minPrice: createConverter('minPrice'),
  capacity: createConverter('capacity'),
  count: createConverter('count'),
  price: createConverter('price'),
  quantity: createConverter('quantity'),
  range: createConverter('range'),
  desc: createConverter('desc'),
  labels: createConverter('labels'),
  location: function location(product) {
    var address = addressConverter(product);
    var lnglat = lnglatConverter(product);
    return { address: address, lnglat: lnglat };
  },
  shop: createConverter('shop', _embedded.embeddedShopToJSON),
  owner: createConverter('owner', _embedded.embeddedUserToJSON),
  original: createConverter('original', _embedded.originalProductToJSON)
};

exports.default = function (schema, product) {
  var result = {};
  (0, _forEach3.default)(schema.attributes, function (attr, key) {
    if (attr.converter != null) {
      result[key] = attr.converter(product);
    }
  });
  return result;
};