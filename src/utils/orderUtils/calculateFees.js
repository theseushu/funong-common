import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _reduce from 'lodash/reduce';
import { distance } from '../mapUtils';
import { productTypes, orderFeeTypes } from '../../appConstants';

export const calculateProductFee = ({ type, items }) => {
  switch (type) {
    case productTypes.logistics:
      return { fee: -1 };
    default:
      return { fee: _reduce(items, (sum, { quantity, product: { spec } }) => sum + (quantity * spec.price), 0) };
  }
};

export const calculateServiceFee = ({ services }) => {
  if (_find(services, ({ charge }) => charge)) {
    return { fee: -1 };
  }
  return { fee: 0 };
};

export const calculateDeliveryFee = ({ type, items, shop, address }) => {
  const { areas, location } = shop;
  const productAmount = calculateProductFee({ type, items }).fee;
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


export default ({ type, items, shop, address, fees, services }) => {
  const productAmount = calculateProductFee({ type, items }).fee;
  const result = { fees: { [orderFeeTypes.product.key]: productAmount } };
  if (!address) {
    return result;
  }
  if (type === productTypes.supply) {
    const service = calculateServiceFee({ services });
    result.service = service;
    if (service.fee !== 0) {
      result.fees[orderFeeTypes.service.key] = fees[orderFeeTypes.service.key] || service.fee;
    } else {
      result.fees[orderFeeTypes.service.key] = 0;
    }
  } else if (type === productTypes.shop) {
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
