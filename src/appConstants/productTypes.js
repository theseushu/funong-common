import _pick from 'lodash/pick';
import publishTypes from './publishTypes';

export default _pick(publishTypes, ['supply', 'logistics', 'trip', 'product', 'flashSale']);

export const productNames = {
  supply: '供应',
  logistics: '物流',
  trip: '乡村游',
  shop: '商品',
  flashSale: '限时抢购',
};
