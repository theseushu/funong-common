'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _productTypes$supply$;

var _productTypes = require('./productTypes');

var _productTypes2 = _interopRequireDefault(_productTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (_productTypes$supply$ = {}, _defineProperty(_productTypes$supply$, _productTypes2.default.supply, {
  delivery: {
    title: '送货',
    value: 'delivery'
  },
  refrigeration: {
    title: '货品打冷',
    value: 'refrigeration'
  },
  cleaning: {
    title: '清洗净品',
    value: 'cleaning'
  },
  reports: {
    title: '农残留检测',
    value: 'reports'
  }
}), _defineProperty(_productTypes$supply$, _productTypes2.default.shop, {}), _defineProperty(_productTypes$supply$, _productTypes2.default.logistics, {}), _defineProperty(_productTypes$supply$, _productTypes2.default.trip, {}), _productTypes$supply$);