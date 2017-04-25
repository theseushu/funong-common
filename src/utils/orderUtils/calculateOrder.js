
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
  let can = {};
  switch (status) {
    case statusValues.finished.value: {
      return { ...order, can: {} };
    }
    case statusValues.shipped.value: {
      can = isCurrentUserOwner ? {
        commit: { to: statusValues.finished.value, available: true },
      } : {};
      return { ...order, can };
    }
    case statusValues.shipping.value: {
      can = isCurrentUserOwner ? {
        commit: { to: statusValues.shipped.value, available: true },
      } : {
      };
      return { ...order, can };
    }
    case statusValues.payed.value: {
      can = isCurrentUserOwner ? {} : {
        commit: { to: statusValues.shipping.value, available: true },
        cancel: true,
      };
      return { ...order, can };
    }
    case statusValues.billed.value: {
      can = isCurrentUserOwner ? {
        commit: { to: statusValues.payed.value, available: true },
        cancel: true,
      } : {
        discount: true,
        commit: { to: statusValues.billed.value, available: true },
      };
      return { ...order, amount: calculateAmount({ fees: order.fees }), can };
    }
    case statusValues.unconfirmed.value:
    default: {
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
      can = isCurrentUserOwner ? {
        requirements: true,
        service,
        delivery,
        commit: { to: ((service && service.fee === -1) || (delivery && delivery.fee === -1)) ? statusValues.unconfirmed.value : statusValues.billed.value, available: true },
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
    }
  }
};
