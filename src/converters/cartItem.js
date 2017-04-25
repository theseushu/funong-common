import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import _find from 'lodash/find';
import { publishTypes } from '../appConstants';
import publishToJSON from './publish';

export default (schemas) => (cartItem) => {
  if (!cartItem) {
    return null;
  }
  const typeProductPairs = Object.values(publishTypes).map((t) => ({ type: t, avProduct: cartItem.get(t) }));
  const { type, avProduct } = _find(typeProductPairs, (typeProductPair) => !!typeProductPair.avProduct);
  const product = publishToJSON(schemas[type], avProduct);

  const avOwner = cartItem.get('owner');
  const owner = avOwner ? avOwner.toJSON() : null;

  const createdAt = cartItem.get('createdAt').getTime();
  const updatedAt = cartItem.get('updatedAt').getTime();

  return _omitBy({ ...cartItem.toJSON(), owner, [type]: product, createdAt, updatedAt }, _isUndefined);
};
