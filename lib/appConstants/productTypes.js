'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productNames = undefined;

var _pick2 = require('lodash/pick');

var _pick3 = _interopRequireDefault(_pick2);

var _publishTypes = require('./publishTypes');

var _publishTypes2 = _interopRequireDefault(_publishTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _pick3.default)(_publishTypes2.default, ['supply', 'logistics', 'trip', 'product', 'flashSale']);
var productNames = exports.productNames = {
  supply: '供应',
  logistics: '物流',
  trip: '乡村游',
  shop: '商品',
  flashSale: '限时抢购'
};