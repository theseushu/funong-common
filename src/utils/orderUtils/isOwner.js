const debug = require('debug')('funongcommon:orderUtils:isOwner');
export default (order, user) => {
  if (order.status == null) {
    return true;
  }
  if (order.owner == null || user == null) {
    debug(`Inconsistent data: order.status=${order.status}, order.owner=${order.owner}, user=${user}`);
    return false;
  }
  return order.owner.objectId === user.objectId;
};
