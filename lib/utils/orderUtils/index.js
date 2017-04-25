'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commitButtonName = exports.createOrdersFromCartItems = exports.stripOrder = exports.calculateOrder = exports.calculateAmount = exports.isOwner = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _groupBy2 = require('lodash/groupBy');

var _groupBy3 = _interopRequireDefault(_groupBy2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _orderBy2 = require('lodash/orderBy');

var _orderBy3 = _interopRequireDefault(_orderBy2);

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _appConstants = require('../../appConstants');

var _isOwner = require('./isOwner');

var _isOwner2 = _interopRequireDefault(_isOwner);

var _calculateFees2 = require('./calculateFees');

var _calculateFees3 = _interopRequireDefault(_calculateFees2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isOwner = exports.isOwner = _isOwner2.default;

var calculateAmount = exports.calculateAmount = function calculateAmount(_ref) {
  var fees = _ref.fees;

  if ((0, _filter3.default)(fees, function (value) {
    return value === -1;
  }).length > 0) {
    return -1;
  }
  return (0, _reduce3.default)(fees, function (sum, value) {
    return sum + value;
  }, 0);
};

/**
 ** order is just like the one in database. after calculation, it gets 1 more attributes:
 *  can: {
 *    amount: (true|false|nil) whether the user can edit amount of the order
 *    commit: {
 *      to: (statusValues.value) the next status if user commit the order
 *      available: (boolean or nill) whether the user can commit the order now
 *    } or nil whether the order can be commited
 *    cancel: (true|false) whether the user can cancel the order (NOT cancel editing)
 *  }
 *
 *  if the order is new or unconfirmed or billed, this 'can' object may get more attributes:
 *  requirements: (true|false|nil) whether the user can edit services&message of the order
 *  serviceFee: {
 *    fee: (-1|number) whether the service fee can be calculated automatically
 *  }
 *  deliveryFee: {
 *    inside: (true|false) whether the target address is inside one of shop's areas
 *    fee: (-1|number) whether the service fee can be calculated automatically
 *    minimum: (null|number) the lowest amount to match shop's delivery policy
 *    raise: (array) lower delivery fee
 *  }
 *  discount: (true|false|nil) whether the user can add discount to the order
 *
 *  of course, fees & amount will be re-calculated according to services & address & fees user set
 **/
var calculateOrder = exports.calculateOrder = function calculateOrder(order, currentUser) {
  var isCurrentUserOwner = isOwner(order, currentUser);
  var status = order.status;

  var can = {};
  switch (status) {
    case _appConstants.statusValues.finished.value:
      {
        return _extends({}, order, { can: {} });
      }
    case _appConstants.statusValues.shipped.value:
      {
        can = isCurrentUserOwner ? {
          commit: { to: _appConstants.statusValues.finished.value, available: true }
        } : {};
        return _extends({}, order, { can: can });
      }
    case _appConstants.statusValues.shipping.value:
      {
        can = isCurrentUserOwner ? {
          commit: { to: _appConstants.statusValues.shipped.value, available: true }
        } : {};
        return _extends({}, order, { can: can });
      }
    case _appConstants.statusValues.payed.value:
      {
        can = isCurrentUserOwner ? {} : {
          commit: { to: _appConstants.statusValues.shipping.value, available: true },
          cancel: true
        };
        return _extends({}, order, { can: can });
      }
    case _appConstants.statusValues.billed.value:
      {
        can = isCurrentUserOwner ? {
          commit: { to: _appConstants.statusValues.payed.value, available: true },
          cancel: true
        } : {
          discount: true,
          commit: { to: _appConstants.statusValues.billed.value, available: true }
        };
        return _extends({}, order, { amount: calculateAmount({ fees: order.fees }), can: can });
      }
    case _appConstants.statusValues.unconfirmed.value:
    default:
      {
        var items = order.items,
            address = order.address;

        if (!address) {
          return (0, _omitBy3.default)({
            type: order.type,
            items: items,
            shop: order.shop,
            user: order.user,
            services: [],
            fees: {},
            can: {}
          }, _isUndefined3.default);
        }

        var _calculateFees = (0, _calculateFees3.default)(order),
            fees = _calculateFees.fees,
            service = _calculateFees.service,
            delivery = _calculateFees.delivery;

        var amount = calculateAmount({ fees: fees });
        var result = _extends({}, order, {
          items: items,
          fees: fees,
          amount: amount
        });
        can = isCurrentUserOwner ? {
          requirements: true,
          service: service,
          delivery: delivery,
          commit: { to: service && service.fee === -1 || delivery && delivery.fee === -1 ? _appConstants.statusValues.unconfirmed.value : _appConstants.statusValues.billed.value, available: true },
          cancel: true
        } : {
          service: service,
          delivery: delivery,
          discount: true,
          commit: { to: _appConstants.statusValues.billed.value, available: amount !== -1 }
        };
        return (0, _omitBy3.default)(_extends({}, result, {
          can: can
        }), _isUndefined3.default);
      }
  }
};

var stripOrder = exports.stripOrder = function stripOrder(order) {
  return (0, _omit3.default)(order, ['can']);
};

var createOrder = function createOrder(_ref2) {
  var type = _ref2.type,
      items = _ref2.items,
      shop = _ref2.shop,
      user = _ref2.user,
      address = _ref2.address;
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

var commitButtonName = exports.commitButtonName = function commitButtonName(nextStatus) {
  switch (nextStatus) {
    case _appConstants.statusValues.finished.value:
      return '完成订单';
    case _appConstants.statusValues.shipped.value:
      return '确认收货';
    case _appConstants.statusValues.shipping.value:
      return '发货';
    case _appConstants.statusValues.payed.value:
      return '付款';
    case _appConstants.statusValues.billed.value:
      return '确认订单';
    case _appConstants.statusValues.unconfirmed.value:
    default:
      return '保存修改';
  }
};