'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrdersFromCartItems = undefined;

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _groupBy2 = require('lodash/groupBy');

var _groupBy3 = _interopRequireDefault(_groupBy2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _orderBy2 = require('lodash/orderBy');

var _orderBy3 = _interopRequireDefault(_orderBy2);

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _appConstants = require('../../appConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createOrder = function createOrder(_ref) {
  var type = _ref.type,
      items = _ref.items,
      shop = _ref.shop,
      user = _ref.user,
      address = _ref.address;
  return { type: type, items: items, shop: shop, user: user, address: address, services: [], fees: {} };
};

var itemsToOrderProducts = function itemsToOrderProducts(items, type) {
  return items.map(function (item) {
    var product = item[type + 'Product'];
    return {
      quantity: item.quantity,
      createdAt: item.createdAt,
      product: (0, _omitBy3.default)({
        objectId: product.objectId,
        name: product.name,
        price: product.price,
        labels: product.labels,
        spec: product.specs[item.specIndex],
        thumbnail: product.thumbnail,
        location: product.location
      }, _isUndefined3.default)
    };
  });
};

var createOrdersFromCartItems = exports.createOrdersFromCartItems = function createOrdersFromCartItems(cartItems, address) {
  var result = [];
  Object.values(_appConstants.productTypes).forEach(function (type) {
    var itemsOfType = Object.values((0, _filter3.default)(cartItems, function (item) {
      return !!item[type + 'Product'];
    }));
    if (type === _appConstants.productTypes.shop) {
      var groupedOrderItems = (0, _groupBy3.default)(itemsOfType, function (item) {
        return item[type + 'Product'].shop.objectId;
      });
      result.push.apply(result, _toConsumableArray((0, _map3.default)(groupedOrderItems, function (orderItems) {
        var shop = orderItems[0][type + 'Product'].shop;
        var items = itemsToOrderProducts(orderItems, type);
        return createOrder({ type: type, items: items, shop: shop, user: undefined, address: address });
      })));
    } else {
      var _groupedOrderItems = (0, _groupBy3.default)(itemsOfType, function (item) {
        return item[type + 'Product'].owner.objectId;
      });
      result.push.apply(result, _toConsumableArray((0, _map3.default)(_groupedOrderItems, function (orderItems) {
        var user = orderItems[0][type + 'Product'].owner;
        var items = itemsToOrderProducts(orderItems, type);
        return createOrder({ type: type, items: items, shop: undefined, user: user, address: address });
      })));
    }
  });
  return (0, _orderBy3.default)(result, function (order) {
    return -(0, _reduce3.default)(order.items, function (r, item) {
      return r > item.createdAt ? r : item.createdAt;
    }, 0);
  });
};