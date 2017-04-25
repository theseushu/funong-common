'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateDeliveryFee = exports.calculateServiceFee = exports.calculateProductFee = undefined;

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _mapUtils = require('../mapUtils');

var _appConstants = require('../../appConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var calculateProductFee = exports.calculateProductFee = function calculateProductFee(_ref) {
  var type = _ref.type,
      items = _ref.items;

  switch (type) {
    case _appConstants.productTypes.logistics:
      return { fee: -1 };
    default:
      return { fee: (0, _reduce3.default)(items, function (sum, _ref2) {
          var quantity = _ref2.quantity,
              spec = _ref2.product.spec;
          return sum + quantity * spec.price;
        }, 0) };
  }
};

var calculateServiceFee = exports.calculateServiceFee = function calculateServiceFee(_ref3) {
  var services = _ref3.services;

  if ((0, _find3.default)(services, function (_ref4) {
    var charge = _ref4.charge;
    return charge;
  })) {
    return { fee: -1 };
  }
  return { fee: 0 };
};

var calculateDeliveryFee = exports.calculateDeliveryFee = function calculateDeliveryFee(_ref5) {
  var type = _ref5.type,
      items = _ref5.items,
      shop = _ref5.shop,
      address = _ref5.address;
  var areas = shop.areas,
      location = shop.location;

  var productAmount = calculateProductFee({ type: type, items: items }).fee;
  var result = {
    inside: false,
    fee: 0,
    minimum: null,
    raise: null
  };
  var areasInclude = (0, _filter3.default)(areas, function (area) {
    if (area.level !== 'custom') {
      var district = address.address[area.level];
      return area.districts.indexOf(district) > -1;
    }
    // custom area
    return area.distance * 1000 > (0, _mapUtils.distance)(address.lnglat, location.lnglat);
  });
  if (areasInclude.length > 0) {
    result.inside = true;
  }
  result.fee = (0, _reduce3.default)(areasInclude, function (fee, area) {
    return area.minimum <= productAmount ? Math.min(area.deliveryFee, fee) : fee;
  }, 99999999);
  result.fee = result.fee === 99999999 ? -1 : result.fee;
  result.minimum = (0, _reduce3.default)(areasInclude, function (minimum, area) {
    return Math.min(area.minimum, minimum);
  }, 99999999);
  result.raise = (0, _filter3.default)(areasInclude, function (fee, area) {
    return area.deliveryFee < result.fee;
  }).map(function (area) {
    return { value: area.minimum - productAmount, fee: area.deliveryFee };
  });
  return result;
};

exports.default = function (_ref6) {
  var type = _ref6.type,
      items = _ref6.items,
      shop = _ref6.shop,
      address = _ref6.address,
      fees = _ref6.fees,
      services = _ref6.services;

  var productAmount = calculateProductFee({ type: type, items: items }).fee;
  var result = { fees: _defineProperty({}, _appConstants.orderFeeTypes.product.key, productAmount) };
  if (!address) {
    return result;
  }
  if (type === _appConstants.productTypes.supply) {
    var service = calculateServiceFee({ services: services });
    result.service = service;
    if (service.fee !== 0) {
      result.fees[_appConstants.orderFeeTypes.service.key] = fees[_appConstants.orderFeeTypes.service.key] || service.fee;
    } else {
      result.fees[_appConstants.orderFeeTypes.service.key] = 0;
    }
  } else if (type === _appConstants.productTypes.shop) {
    var delivery = calculateDeliveryFee({ items: items, shop: shop, address: address });
    result.delivery = delivery;
    if (delivery && delivery.fee !== 0) {
      result.fees[_appConstants.orderFeeTypes.delivery.key] = fees[_appConstants.orderFeeTypes.delivery.key] || delivery.fee;
    } else {
      result.fees[_appConstants.orderFeeTypes.delivery.key] = 0;
    }
  }
  return result;
};