import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _groupBy from 'lodash/groupBy';
import _map from 'lodash/map';
import _omit from 'lodash/omit';
import _omitBy from 'lodash/omitBy';
import _orderBy from 'lodash/orderBy';
import _reduce from 'lodash/reduce';
import _isUndefined from 'lodash/isUndefined';
import { statusValues, publishTypes, publishTypesInfo, orderFeeTypes } from '../appConstants';
import { distance } from './mapUtils';

const createOrder = ({ type, items, shop, user, address }) => ({ type, items, shop, user, address, services: [], fees: {} });

const itemsToOrderProducts = (items, type) =>
  items.map((item) => {
    const product = item[`${type}`];
    const info = publishTypesInfo[type];
    return {
      quantity: item.quantity,
      createdAt: item.createdAt,
      product: _omitBy({
        objectId: product.objectId,
        name: product.name,
        price: info.saleType === 2 ? product.price : undefined,
        labels: product.labels,
        spec: info.saleType === 1 ? product.specs[item.specIndex] : undefined,
        thumbnail: product.thumbnail,
        location: product.location,
      }, _isUndefined),
    };
  });

export const createOrdersFromCartItems = (cartItems, address) => {
  const result = [];
  Object.values(_filter(publishTypes, (t) => publishTypesInfo[t].saleType > 0)) // 0 means not for sale
    .forEach((type) => {
      const info = publishTypesInfo[type];
      const itemsOfType = Object.values(_filter(cartItems, (item) => !!item[`${type}`]));
      if (info.shop) {
        const groupedOrderItems = _groupBy(itemsOfType, (item) => item[`${type}`].shop.objectId);
        result.push(..._map(groupedOrderItems, (orderItems) => {
          const shop = orderItems[0][`${type}`].shop;
          const items = itemsToOrderProducts(orderItems, type);
          return createOrder({ type, items, shop, user: undefined, address });
        }));
      } else {
        const groupedOrderItems = _groupBy(itemsOfType, (item) => item[`${type}`].owner.objectId);
        result.push(..._map(groupedOrderItems, (orderItems) => {
          const user = orderItems[0][`${type}`].owner;
          const items = itemsToOrderProducts(orderItems, type);
          return createOrder({ type, items, shop: undefined, user, address });
        }));
      }
      return result;
    }
  );
  return _orderBy(result, (order) => -(_reduce(order.items, (r, item) => r > item.createdAt ? r : item.createdAt, 0)));
};

export const isOwner = (order, user) => {
  if (order.status == null) {
    return true;
  }
  if (order.owner == null || user == null) {
    console.warn(`Insane data: order.status=${order.status}, order.owner=${order.owner}, user=${user}`);
    return false;
  }
  return order.owner.objectId === user.objectId;
};

export const calculateProductFee = ({ type, items }) => publishTypesInfo[type].saleType === 1 ? _reduce(items, (sum, { quantity, product: { spec } }) => sum + (quantity * spec.price), 0) : -1;

export const calculateServiceFee = ({ services }) => {
  const result = { fee: 0 };
  if (_find(services, ({ charge }) => charge)) {
    result.fee = -1;
  }
  return result;
};

export const calculateDeliveryFee = ({ type, items, shop, address }) => {
  const { areas, location } = shop;
  const productAmount = calculateProductFee({ type, items });
  const result = {
    inside: false,
    fee: 0,
    minimum: null,
    raise: null,
  };
  const areasInclude = _filter(areas, (area) => {
    if (area.level !== 'custom') {
      const district = address.address[area.level];
      return area.districts.indexOf(district) > -1;
    }
    // custom area
    return (area.distance * 1000) > distance(address.lnglat, location.lnglat);
  });
  if (areasInclude.length > 0) {
    result.inside = true;
  }
  result.fee = _reduce(areasInclude, (fee, area) => area.minimum <= productAmount ? Math.min(area.deliveryFee, fee) : fee, 99999999);
  result.fee = result.fee === 99999999 ? -1 : result.fee;
  result.minimum = _reduce(areasInclude, (minimum, area) => Math.min(area.minimum, minimum), 99999999);
  result.raise = _filter(areasInclude, (fee, area) => area.deliveryFee < result.fee).map((area) => ({ value: area.minimum - productAmount, fee: area.deliveryFee }));
  return result;
};

export const calculateFees = ({ type, items, shop, address, fees, services }) => {
  const info = publishTypesInfo[type];
  const productAmount = calculateProductFee({ type, items });
  const result = { fees: { [orderFeeTypes.product.key]: productAmount } };
  if (!address) {
    return result;
  }
  if (!info.shop) {
    const service = calculateServiceFee({ services });
    result.service = service;
    if (service.fee !== 0) {
      result.fees[orderFeeTypes.service.key] = fees[orderFeeTypes.service.key] || service.fee;
    } else {
      // result.fees[orderFeeTypes.service.key] = 0;
    }
  } else {
    const delivery = calculateDeliveryFee({ items, shop, address });
    result.delivery = delivery;
    if (delivery && delivery.fee !== 0) {
      result.fees[orderFeeTypes.delivery.key] = fees[orderFeeTypes.delivery.key] || delivery.fee;
    } else {
      result.fees[orderFeeTypes.delivery.key] = 0;
    }
  }
  return result;
};

export const calculateAmount = ({ fees }) => {
  if (_filter(fees, (value) => value === -1).length > 0) {
    return -1;
  }
  return _reduce(fees, (sum, value) => sum + value, 0);
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
export const calculateOrder = (order, currentUser) => {
  const isCurrentUserOwner = isOwner(order, currentUser);
  const { status } = order;
  switch (status) {
    case statusValues.finished.value: {
      return { ...order, can: {} };
    }
    case statusValues.shipped.value:
    case statusValues.shipped_trip.value:
    case statusValues.shipped_logistics.value:
      return calculateShippedOrder(order, isCurrentUserOwner);
    case statusValues.shipping.value:
    case statusValues.shipping_trip.value:
    case statusValues.shipping_logistics.value:
      return calculateShippingOrder(order, isCurrentUserOwner);
    case statusValues.payed.value:
      return calculatePayedOrder(order, isCurrentUserOwner);
    case statusValues.billed.value:
      return calculateBilledOrder(order, isCurrentUserOwner);
    case statusValues.unconfirmed.value:
    default:
      return calculateUnconfirmedOrder(order, isCurrentUserOwner);
  }
};

const calculateShippedOrder = (order, isCurrentUserOwner) => {
  const can = isCurrentUserOwner ? {
    commit: { to: statusValues.finished.value, available: true },
  } : {};
  return { ...order, can };
};

const calculateShippingOrder = (order, isCurrentUserOwner) => {
  const { type } = order;
  let nextStatus;
  if (type === publishTypes.trip) {
    nextStatus = statusValues.shipped_trip.value;
  } else if (type === publishTypes.logistics) {
    nextStatus = statusValues.shipped_logistics.value;
  } else {
    nextStatus = statusValues.shipped.value;
  }
  const can = isCurrentUserOwner ? {
    commit: { to: nextStatus, available: true },
  } : {};
  return { ...order, can };
};

const calculatePayedOrder = (order, isCurrentUserOwner) => {
  const { type } = order;
  let nextStatus;
  if (type === publishTypes.trip) {
    nextStatus = statusValues.shipping_trip.value;
  } else if (type === publishTypes.logistics) {
    nextStatus = statusValues.shipping_logistics.value;
  } else {
    nextStatus = statusValues.shipping.value;
  }
  const can = isCurrentUserOwner ? {} : {
    commit: { to: nextStatus, available: true },
    cancel: true,
  };
  return { ...order, can };
};

const calculateBilledOrder = (order, isCurrentUserOwner) => {
  const nextStatus = statusValues.payed.value;
  const can = isCurrentUserOwner ? {
    commit: { to: nextStatus, available: true },
    cancel: true,
  } : {
    discount: true,
    commit: { to: statusValues.billed.value, available: true },
  };
  return { ...order, amount: calculateAmount({ fees: order.fees }), can };
};

const calculateUnconfirmedOrder = (order, isCurrentUserOwner) => {
  const { items, address } = order;
  if (!address) {
    return _omitBy({
      type: order.type,
      items,
      shop: order.shop,
      user: order.user,
      services: [],
      fees: {},
      can: {},
    }, _isUndefined);
  }
  const { fees, service, delivery } = calculateFees(order);
  const amount = calculateAmount({ fees });
  const result = {
    ...order,
    items,
    fees,
    amount,
  };
  const can = isCurrentUserOwner ? {
    requirements: true,
    service,
    delivery,
    commit: { to: amount === -1 ? statusValues.unconfirmed.value : statusValues.billed.value, available: true },
    cancel: true,
  } : {
    service,
    delivery,
    discount: true,
    commit: { to: statusValues.billed.value, available: amount !== -1 },
  };
  return _omitBy({
    ...result,
    can,
  }, _isUndefined);
};

export const stripOrder = (order) => _omit(order, ['can', 'serviceFee', 'deliveryFee']);

export const commitButtonName = (nextStatus) => {
  switch (nextStatus) {
    case statusValues.finished.value:
      return '完成订单';
    case statusValues.shipped.value:
      return '确认收货';
    case statusValues.shipped_trip.value:
      return '确认出行';
    case statusValues.shipped_logistics.value:
      return '确认收货';
    case statusValues.shipping.value:
      return '发货';
    case statusValues.shipping_trip.value:
      return '客户抵达';
    case statusValues.shipping_logistics.value:
      return '开始运送';
    case statusValues.payed.value:
      return '付款';
    case statusValues.billed.value:
      return '确认订单';
    case statusValues.unconfirmed.value:
    default:
      return '保存修改';
  }
};
