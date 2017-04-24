'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _publishTypes = require('./publishTypes');

var _publishTypes2 = _interopRequireDefault(_publishTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = _extends({
  page_login: '/login',
  page_signup: '/signup',
  page_welcome: '/welcome',
  page_me: '/me',
  page_my_certs: '/me/certs',
  page_my_cert_personal: '/me/certs?type=personal',
  page_my_cert_company: '/me/certs?type=company',
  page_my_cert_expert: '/me/certs?type=expert',
  page_my_shop: '/me/shop'
}, (0, _reduce3.default)(_publishTypes2.default, function (result, info, key) {
  if ([_publishTypes.types.product, _publishTypes.types.flashSale].indexOf(key) > -1) {
    return _extends({}, result, _defineProperty({}, 'page_my_' + info.plural, '/me/shop/' + info.plural));
  }
  return result;
}, {}), (0, _reduce3.default)(_publishTypes2.default, function (result, info, key) {
  if ([_publishTypes.types.supply, _publishTypes.types.logistics, _publishTypes.types.trip, _publishTypes.types.inquiry].indexOf(key) > -1) {
    return _extends({}, result, _defineProperty({}, 'page_my_' + info.plural, '/me/published/' + info.plural));
  }
  return result;
}, {}), {
  page_my_bids: '/me/published/bids',
  page_my_cart: '/me/cart',
  page_my_orders: '/me/orders',
  page_my_bookmarks: '/me/bookmarks'
}, (0, _reduce3.default)(_publishTypes2.default, function (result, info) {
  return _extends({}, result, _defineProperty({}, 'page_' + info.plural, '/' + info.plural));
}, {}), (0, _reduce3.default)(_publishTypes2.default, function (result, info) {
  return _extends({}, result, _defineProperty({}, 'page_' + info.route, '/' + info.route + '/:id'));
}, {}), {
  page_order: '/order',
  page_user: '/user/:id',
  page_shop: '/shop/:id'
});