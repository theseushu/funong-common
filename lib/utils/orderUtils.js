'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commitButtonName = exports.stripOrder = exports.calculateOrder = exports.calculateAmount = exports.calculateFees = exports.calculateDeliveryFee = exports.calculateServiceFee = exports.calculateProductFee = exports.isOwner = exports.createOrdersFromCartItems = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

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

var _appConstants = require('../appConstants');

var _mapUtils = require('./mapUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var product = item['' + type];
    var info = _appConstants.publishTypesInfo[type];
    return {
      quantity: item.quantity,
      createdAt: item.createdAt,
      product: (0, _omitBy3.default)({
        objectId: product.objectId,
        name: product.name,
        price: info.saleType === 2 ? product.price : undefined,
        labels: product.labels,
        spec: info.saleType === 1 ? product.specs[item.specIndex] : undefined,
        thumbnail: product.thumbnail,
        location: product.location
      }, _isUndefined3.default)
    };
  });
};

var createOrdersFromCartItems = exports.createOrdersFromCartItems = function createOrdersFromCartItems(cartItems, address) {
  var result = [];
  Object.values((0, _filter3.default)(_appConstants.publishTypes, function (t) {
    return _appConstants.publishTypesInfo[t].saleType > 0;
  })) // 0 means not for sale
  .forEach(function (type) {
    var info = _appConstants.publishTypesInfo[type];
    var itemsOfType = Object.values((0, _filter3.default)(cartItems, function (item) {
      return !!item['' + type];
    }));
    if (info.shop) {
      var groupedOrderItems = (0, _groupBy3.default)(itemsOfType, function (item) {
        return item['' + type].shop.objectId;
      });
      result.push.apply(result, _toConsumableArray((0, _map3.default)(groupedOrderItems, function (orderItems) {
        var shop = orderItems[0]['' + type].shop;
        var items = itemsToOrderProducts(orderItems, type);
        return createOrder({ type: type, items: items, shop: shop, user: undefined, address: address });
      })));
    } else {
      var _groupedOrderItems = (0, _groupBy3.default)(itemsOfType, function (item) {
        return item['' + type].owner.objectId;
      });
      result.push.apply(result, _toConsumableArray((0, _map3.default)(_groupedOrderItems, function (orderItems) {
        var user = orderItems[0]['' + type].owner;
        var items = itemsToOrderProducts(orderItems, type);
        return createOrder({ type: type, items: items, shop: undefined, user: user, address: address });
      })));
    }
    return result;
  });
  return (0, _orderBy3.default)(result, function (order) {
    return -(0, _reduce3.default)(order.items, function (r, item) {
      return r > item.createdAt ? r : item.createdAt;
    }, 0);
  });
};

var isOwner = exports.isOwner = function isOwner(order, user) {
  if (order.status == null) {
    return true;
  }
  if (order.owner == null || user == null) {
    console.warn('Insane data: order.status=' + order.status + ', order.owner=' + order.owner + ', user=' + user);
    return false;
  }
  return order.owner.objectId === user.objectId;
};

var calculateProductFee = exports.calculateProductFee = function calculateProductFee(_ref2) {
  var type = _ref2.type,
      items = _ref2.items;
  return _appConstants.publishTypesInfo[type].saleType === 1 ? (0, _reduce3.default)(items, function (sum, _ref3) {
    var quantity = _ref3.quantity,
        spec = _ref3.product.spec;
    return sum + quantity * spec.price;
  }, 0) : -1;
};

var calculateServiceFee = exports.calculateServiceFee = function calculateServiceFee(_ref4) {
  var services = _ref4.services;

  var result = { fee: 0 };
  if ((0, _find3.default)(services, function (_ref5) {
    var charge = _ref5.charge;
    return charge;
  })) {
    result.fee = -1;
  }
  return result;
};

var calculateDeliveryFee = exports.calculateDeliveryFee = function calculateDeliveryFee(_ref6) {
  var type = _ref6.type,
      items = _ref6.items,
      shop = _ref6.shop,
      address = _ref6.address;
  var areas = shop.areas,
      location = shop.location;

  var productAmount = calculateProductFee({ type: type, items: items });
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

var calculateFees = exports.calculateFees = function calculateFees(_ref7) {
  var type = _ref7.type,
      items = _ref7.items,
      shop = _ref7.shop,
      address = _ref7.address,
      fees = _ref7.fees,
      services = _ref7.services;

  var info = _appConstants.publishTypesInfo[type];
  var productAmount = calculateProductFee({ type: type, items: items });
  var result = { fees: _defineProperty({}, _appConstants.orderFeeTypes.product.key, productAmount) };
  if (!address) {
    return result;
  }
  if (!info.shop) {
    var service = calculateServiceFee({ services: services });
    result.service = service;
    if (service.fee !== 0) {
      result.fees[_appConstants.orderFeeTypes.service.key] = fees[_appConstants.orderFeeTypes.service.key] || service.fee;
    } else {
      // result.fees[orderFeeTypes.service.key] = 0;
    }
  } else {
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

var calculateAmount = exports.calculateAmount = function calculateAmount(_ref8) {
  var fees = _ref8.fees;

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

  switch (status) {
    case _appConstants.statusValues.finished.value:
      {
        return _extends({}, order, { can: {} });
      }
    case _appConstants.statusValues.shipped.value:
    case _appConstants.statusValues.shipped_trip.value:
    case _appConstants.statusValues.shipped_logistics.value:
      return calculateShippedOrder(order, isCurrentUserOwner);
    case _appConstants.statusValues.shipping.value:
    case _appConstants.statusValues.shipping_trip.value:
    case _appConstants.statusValues.shipping_logistics.value:
      return calculateShippingOrder(order, isCurrentUserOwner);
    case _appConstants.statusValues.payed.value:
    case _appConstants.statusValues.payed_trip.value:
    case _appConstants.statusValues.payed_logistics.value:
      return calculatePayedOrder(order, isCurrentUserOwner);
    case _appConstants.statusValues.billed.value:
      return calculateBilledOrder(order, isCurrentUserOwner);
    case _appConstants.statusValues.unconfirmed.value:
    default:
      return calculateUnconfirmedOrder(order, isCurrentUserOwner);
  }
};

var calculateShippedOrder = function calculateShippedOrder(order, isCurrentUserOwner) {
  var can = isCurrentUserOwner ? {
    commit: { to: _appConstants.statusValues.finished.value, available: true }
  } : {};
  return _extends({}, order, { can: can });
};

var calculateShippingOrder = function calculateShippingOrder(order, isCurrentUserOwner) {
  var type = order.type;

  var nextStatus = void 0;
  if (type === _appConstants.publishTypes.trip) {
    nextStatus = _appConstants.statusValues.shipped_trip.value;
  } else if (type === _appConstants.publishTypes.logistics) {
    nextStatus = _appConstants.statusValues.shipped_logistics.value;
  } else {
    nextStatus = _appConstants.statusValues.shipped.value;
  }
  var can = isCurrentUserOwner ? {
    commit: { to: nextStatus, available: true }
  } : {};
  return _extends({}, order, { can: can });
};

var calculatePayedOrder = function calculatePayedOrder(order, isCurrentUserOwner) {
  var type = order.type;

  var nextStatus = void 0;
  if (type === _appConstants.publishTypes.trip) {
    nextStatus = _appConstants.statusValues.shipping_trip.value;
  } else if (type === _appConstants.publishTypes.logistics) {
    nextStatus = _appConstants.statusValues.shipping_logistics.value;
  } else {
    nextStatus = _appConstants.statusValues.shipping.value;
  }
  var can = isCurrentUserOwner ? {} : {
    commit: { to: nextStatus, available: true },
    cancel: true
  };
  return _extends({}, order, { can: can });
};

var calculateBilledOrder = function calculateBilledOrder(order, isCurrentUserOwner) {
  var type = order.type;

  var nextStatus = void 0;
  if (type === _appConstants.publishTypes.trip) {
    nextStatus = _appConstants.statusValues.payed_trip.value;
  } else if (type === _appConstants.publishTypes.logistics) {
    nextStatus = _appConstants.statusValues.payed_logistics.value;
  } else {
    nextStatus = _appConstants.statusValues.payed.value;
  }
  var can = isCurrentUserOwner ? {
    commit: { to: nextStatus, available: true },
    cancel: true
  } : {
    discount: true,
    commit: { to: _appConstants.statusValues.billed.value, available: true }
  };
  return _extends({}, order, { amount: calculateAmount({ fees: order.fees }), can: can });
};

var calculateUnconfirmedOrder = function calculateUnconfirmedOrder(order, isCurrentUserOwner) {
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

  var _calculateFees = calculateFees(order),
      fees = _calculateFees.fees,
      service = _calculateFees.service,
      delivery = _calculateFees.delivery;

  var amount = calculateAmount({ fees: fees });
  var result = _extends({}, order, {
    items: items,
    fees: fees,
    amount: amount
  });
  var can = isCurrentUserOwner ? {
    requirements: true,
    service: service,
    delivery: delivery,
    commit: { to: amount === -1 ? _appConstants.statusValues.unconfirmed.value : _appConstants.statusValues.billed.value, available: true },
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
};

var stripOrder = exports.stripOrder = function stripOrder(order) {
  return (0, _omit3.default)(order, ['can', 'serviceFee', 'deliveryFee']);
};

var commitButtonName = exports.commitButtonName = function commitButtonName(nextStatus) {
  switch (nextStatus) {
    case _appConstants.statusValues.finished.value:
      return '完成订单';
    case _appConstants.statusValues.shipped.value:
      return '确认收货';
    case _appConstants.statusValues.shipped_trip.value:
      return '确认出行';
    case _appConstants.statusValues.shipped_logistics.value:
      return '确认收货';
    case _appConstants.statusValues.shipping.value:
      return '发货';
    case _appConstants.statusValues.shipping_trip.value:
      return '客户抵达';
    case _appConstants.statusValues.shipping_logistics.value:
      return '开始运送';
    case _appConstants.statusValues.payed.value:
    case _appConstants.statusValues.payed_trip.value:
    case _appConstants.statusValues.payed_logistics.value:
      return '付款';
    case _appConstants.statusValues.billed.value:
      return '确认订单';
    case _appConstants.statusValues.unconfirmed.value:
    default:
      return '保存修改';
  }
};