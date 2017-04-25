'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

var _images = require('./images');

var _images2 = _interopRequireDefault(_images);

var _lnglat = require('./lnglat');

var _lnglat2 = _interopRequireDefault(_lnglat);

var _embedded = require('./embedded');

var _category = require('./category');

var _category2 = _interopRequireDefault(_category);

var _species = require('./species');

var _species2 = _interopRequireDefault(_species);

var _role = require('./role');

var _role2 = _interopRequireDefault(_role);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _cert = require('./cert');

var _cert2 = _interopRequireDefault(_cert);

var _shop = require('./shop');

var _shop2 = _interopRequireDefault(_shop);

var _publish = require('./publish');

var _publish2 = _interopRequireDefault(_publish);

var _cartItem = require('./cartItem');

var _cartItem2 = _interopRequireDefault(_cartItem);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _order = require('./order');

var _order2 = _interopRequireDefault(_order);

var _inquiry = require('./inquiry');

var _inquiry2 = _interopRequireDefault(_inquiry);

var _bid = require('./bid');

var _bid2 = _interopRequireDefault(_bid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (schemas) {
  return {
    fileToJSON: _file2.default,
    imagesToJSON: _images2.default,
    lnglatToJSON: _lnglat2.default,
    embeddedProductToJSON: _embedded.embeddedProductToJSON,
    embeddedShopToJSON: _embedded.embeddedShopToJSON,
    embeddedUserToJSON: _embedded.embeddedUserToJSON,
    categoryToJSON: _category2.default,
    speciesToJSON: _species2.default,
    roleToJSON: _role2.default,
    userToJSON: _user2.default,
    certToJSON: _cert2.default,
    shopToJSON: _shop2.default,
    publishToJSON: _publish2.default,
    cartItemToJSON: (0, _cartItem2.default)(schemas),
    commentToJSON: _comment2.default,
    orderToJSON: _order2.default,
    inquiryToJSON: _inquiry2.default,
    bidToJSON: _bid2.default
  };
};