'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _productTypes$supply$;

var _productTypes = require('./productTypes');

var _productTypes2 = _interopRequireDefault(_productTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (_productTypes$supply$ = {}, _defineProperty(_productTypes$supply$, _productTypes2.default.supply, 'goat'), _defineProperty(_productTypes$supply$, _productTypes2.default.trip, 'rowing'), _defineProperty(_productTypes$supply$, _productTypes2.default.logistics, 'local_shipping'), _defineProperty(_productTypes$supply$, _productTypes2.default.shop, 'shopping_basket'), _defineProperty(_productTypes$supply$, 'inquiry', 'network_check'), _defineProperty(_productTypes$supply$, 'me', 'person'), _defineProperty(_productTypes$supply$, 'flashSale', 'add_alert'), _productTypes$supply$);